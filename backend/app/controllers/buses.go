package controllers

import (
	"mgt/app/models"

	"github.com/gofiber/fiber/v2"
	"gorm.io/gorm"
)

type BusesController struct {
	db *gorm.DB
}

func NewBusesController(db *gorm.DB) *BusesController {
	return &BusesController{
		db: db,
	}
}

func (bc *BusesController) GetAll(c *fiber.Ctx) error {
	var dto struct {
		Limit    int    `query:"limit"`
		Offset   int    `query:"offset"`
		Order    string `query:"order"`
		Search   string `query:"search"`
		ColumnID *uint  `query:"columnId"`
	}
	if err := c.QueryParser(&dto); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(err.Error())
	}

	userID := c.Locals("id").(uint)
	isAdmin := c.Locals("isAdmin").(bool)
	if !isAdmin {
		if dto.ColumnID == nil || !models.UserHasColumn(bc.db, userID, *dto.ColumnID) {
			return c.SendStatus(fiber.StatusForbidden)
		}
	}

	var count int64
	var rows []models.Bus
	tx := bc.db.Model(&models.Bus{})
	if dto.ColumnID != nil {
		tx.Where("column_id = ?", dto.ColumnID)
	}
	if len(dto.Search) != 0 {
		tx.Where("Num LIKE ?", "%"+dto.Search+"%")
	}
	err := tx.
		Count(&count).
		Preload("Column").
		Preload("Gate").
		Limit(dto.Limit).
		Offset(dto.Offset).
		Order(dto.Order).
		Find(&rows).
		Error
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(err.Error())
	}

	return c.JSON(fiber.Map{
		"rows":  rows,
		"total": count,
	})
}

func (bc *BusesController) Get(c *fiber.Ctx) error {
	id, err := c.ParamsInt("id")
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(err.Error())
	}

	userID := c.Locals("id").(uint)
	isAdmin := c.Locals("isAdmin").(bool)
	if !isAdmin && !models.UserHasBus(bc.db, userID, uint(id)) {
		return c.SendStatus(fiber.StatusForbidden)
	}

	var row models.Bus
	result := bc.db.
		Preload("Column").
		Preload("Gate").
		Where("id = ?", id).
		First(&row)
	if result.Error != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(result.Error.Error())
	}
	if result.RowsAffected == 0 {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"error": true,
			"msg":   "row with such id was not found",
		})
	}

	return c.JSON(fiber.Map{
		"row": row,
	})
}

func (bc *BusesController) Delete(c *fiber.Ctx) error {
	id, err := c.ParamsInt("id")
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(err.Error())
	}

	userID := c.Locals("id").(uint)
	isAdmin := c.Locals("isAdmin").(bool)
	if !isAdmin && !models.UserHasBus(bc.db, userID, uint(id)) {
		return c.SendStatus(fiber.StatusForbidden)
	}

	err = bc.db.Where("id = ?", id).Delete(&models.Bus{}).Error
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(err.Error())
	}

	return c.SendStatus(fiber.StatusOK)
}

func (bc *BusesController) Update(c *fiber.Ctx) error {
	var dto struct {
		ID       uint   `query:"id"`
		ColumnID *uint  `json:"columnId"`
		Num      string `json:"num"`
	}
	if err := c.BodyParser(&dto); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(err.Error())
	}
	if err := c.QueryParser(&dto); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(err.Error())
	}

	userID := c.Locals("id").(uint)
	isAdmin := c.Locals("isAdmin").(bool)
	if !isAdmin && !models.UserHasBus(bc.db, userID, dto.ID) {
		return c.SendStatus(fiber.StatusForbidden)
	}

	err := bc.db.
		Model(&models.Bus{}).
		Where("id = ?", dto.ID).
		Updates(map[string]interface{}{
			"ColumnID": dto.ColumnID,
			"Num":      dto.Num,
		}).
		Error
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(err.Error())
	}

	return c.SendStatus(fiber.StatusOK)
}

func (bc *BusesController) Create(c *fiber.Ctx) error {
	var dto struct {
		ColumnID *uint  `json:"columnId"`
		Num      string `json:"num"`
	}
	if err := c.BodyParser(&dto); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(err.Error())
	}

	userID := c.Locals("id").(uint)
	isAdmin := c.Locals("isAdmin").(bool)
	if !isAdmin && !models.UserHasColumn(bc.db, userID, *dto.ColumnID) {
		return c.SendStatus(fiber.StatusForbidden)
	}

	row := models.Bus{
		ColumnID: dto.ColumnID,
		Num:      dto.Num,
	}
	err := bc.db.Create(&row).Error
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(err.Error())
	}

	return c.Status(fiber.StatusCreated).JSON(fiber.Map{
		"id": row.ID,
	})
}
