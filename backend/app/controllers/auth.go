package controllers

import (
	"mgt/app/models"
	"mgt/pkg/utils"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/session"
	"gorm.io/gorm"
)

type AuthController struct {
	db    *gorm.DB
	store *session.Store
}

func NewAuthController(db *gorm.DB, store *session.Store) *AuthController {
	return &AuthController{
		db:    db,
		store: store,
	}
}

func (ac *AuthController) UserInfo(c *fiber.Ctx) error {
	s, err := ac.store.Get(c)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(err.Error())
	}

	userID := s.Get("id")

	var user models.User
	err = ac.db.
		Preload("Role").
		Where("id = ?", userID).
		Find(&user).
		Error
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(err.Error())
	}

	return c.JSON(user.ToPublic())
}

func (ac *AuthController) LogIn(c *fiber.Ctx) error {
	var dto struct {
		Nick     string `json:"nick"`
		Password string `json:"password"`
	}

	if err := c.BodyParser(&dto); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(err.Error())
	}

	var user models.User
	if err := ac.db.Preload("Role").Where("nick = ?", dto.Nick).Find(&user).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(err.Error())
	}

	if !utils.ComparePasswords(user.PasswordHash, dto.Password) {
		return c.Status(fiber.StatusBadRequest).JSON("wrong user nick or password")
	}

	s, err := ac.store.Get(c)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(err.Error())
	}

	s.Set("id", user.ID)

	if err := s.Save(); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(err.Error())
	}

	return c.SendStatus(fiber.StatusOK)
}

func (ac *AuthController) LogOut(c *fiber.Ctx) error {
	s, err := ac.store.Get(c)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(err.Error())
	}

	s.Delete("id")

	if err := s.Save(); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(err.Error())
	}
	return c.SendStatus(fiber.StatusOK)
}
