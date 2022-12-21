package controllers

import (
	"mgt/app/models"
	"mgt/pkg/repository"
	"mgt/pkg/utils"

	"golang.org/x/exp/slices"
	"gorm.io/gorm"

	"github.com/gofiber/fiber/v2"
)

type UsersController struct {
	db *gorm.DB
}

func NewUsersController(db *gorm.DB) *UsersController {
	return &UsersController{
		db: db,
	}
}

func (uc *UsersController) GetAll(c *fiber.Ctx) error {
	if !c.Locals("isAdmin").(bool) {
		return c.SendStatus(fiber.StatusForbidden)
	}

	var dto struct {
		Limit  int    `query:"limit"`
		Offset int    `query:"offset"`
		Order  string `query:"order"`
		Search string `query:"search"`
	}
	if err := c.QueryParser(&dto); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(err.Error())
	}

	var count int64
	var rows []models.User
	tx := uc.db.Model(&models.User{})
	if len(dto.Search) != 0 {
		tx.Where("nick LIKE ?", "%"+dto.Search+"%")
	}
	err := tx.
		Count(&count).
		Preload("Role").
		Limit(dto.Limit).
		Offset(dto.Offset).
		Order(dto.Order).
		Find(&rows).
		Error
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(err.Error())
	}

	return c.JSON(fiber.Map{
		"rows":  utils.Map(func(u *models.User) models.PublicUser { return *u.ToPublic() }, rows),
		"total": count,
	})
}

func (uc *UsersController) Get(c *fiber.Ctx) error {
	if !c.Locals("isAdmin").(bool) {
		return c.SendStatus(fiber.StatusForbidden)
	}

	id, err := c.ParamsInt("id")
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(err.Error())
	}

	var row models.User
	result := uc.db.
		Preload("Role").
		Where("id = ?", id).
		First(&row)
	if result.Error != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(result.Error.Error())
	}
	if result.RowsAffected == 0 {
		return c.Status(fiber.StatusNotFound).JSON("user with such id was not found")
	}

	return c.JSON(fiber.Map{
		"row": row.ToPublic(),
	})
}

func (uc *UsersController) Delete(c *fiber.Ctx) error {
	if !c.Locals("isAdmin").(bool) {
		return c.SendStatus(fiber.StatusForbidden)
	}

	id, err := c.ParamsInt("id")
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(err.Error())
	}

	err = uc.db.
		Select("Role").
		Where("id = ?", id).
		Delete(&models.User{}).
		Error
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(err.Error())
	}

	err = uc.db.
		Where("user_id = ?", id).
		Unscoped().
		Delete(&models.UserRole{}).
		Error
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(err.Error())
	}

	return c.SendStatus(fiber.StatusOK)
}

func (uc *UsersController) Update(c *fiber.Ctx) error {
	if !c.Locals("isAdmin").(bool) {
		return c.SendStatus(fiber.StatusForbidden)
	}

	var dto struct {
		ID    uint              `params:"id" validate:"required,number"`
		Nick  string            `json:"nick"`
		Roles []repository.Role `json:"roles"`
	}
	if err := c.BodyParser(&dto); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(err.Error())
	}
	if err := c.ParamsParser(&dto); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(err.Error())
	}

	err := uc.db.
		Where("user_id = ?", dto.ID).
		Unscoped().
		Delete(&models.UserRole{}).
		Error
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(err.Error())
	}

	systemRoles := repository.GetRoles()
	for _, role := range dto.Roles {
		if slices.Contains(systemRoles, role) {
			newRole := models.UserRole{
				Key:    role,
				UserID: uint(dto.ID),
			}
			uc.db.Create(&newRole)
		}
	}

	err = uc.db.
		Model(&models.User{}).
		Where("id = ?", dto.ID).
		Updates(map[string]interface{}{
			"Nick": dto.Nick,
		}).
		Error
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(err.Error())
	}

	return c.SendStatus(fiber.StatusOK)
}

func (uc *UsersController) Create(c *fiber.Ctx) error {
	if !c.Locals("isAdmin").(bool) {
		return c.SendStatus(fiber.StatusForbidden)
	}

	var dto struct {
		Nick     string            `json:"nick"`
		Password string            `json:"password"`
		Roles    []repository.Role `json:"roles"`
	}

	if err := c.BodyParser(&dto); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(err.Error())
	}

	row := models.User{
		Nick:         dto.Nick,
		PasswordHash: utils.GeneratePassword(dto.Password),
	}
	err := uc.db.Create(&row).Error
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(err.Error())
	}

	systemRoles := repository.GetRoles()
	for _, role := range dto.Roles {
		if slices.Contains(systemRoles, role) {
			newRole := models.UserRole{
				Key:    role,
				UserID: row.ID,
			}
			uc.db.Model(&models.UserRole{}).Create(&newRole)
		}
	}

	return c.Status(fiber.StatusCreated).JSON(fiber.Map{
		"id": row.ID,
	})
}
