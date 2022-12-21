package controllers

import (
	"mgt/app/models"

	"github.com/gofiber/fiber/v2"
	"gorm.io/gorm"
)

type DriversController struct {
	db *gorm.DB
}

func NewDriversController(db *gorm.DB) *DriversController {
	return &DriversController{
		db: db,
	}
}

func (dc *DriversController) GetAll(c *fiber.Ctx) error {
	var dto struct {
		Limit    int    `query:"limit"`
		Offset   int    `query:"offset"`
		Order    string `query:"order"`
		Search   string `query:"search"`
		ColumnID *uint  `query:"columnId"`
		BusID    *uint  `query:"busId"`
	}
	if err := c.QueryParser(&dto); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(err.Error())
	}

	userID := c.Locals("id").(uint)
	isAdmin := c.Locals("isAdmin").(bool)
	if !isAdmin && !models.UserHasColumn(dc.db, userID, *dto.ColumnID) {
		return c.SendStatus(fiber.StatusForbidden)
	}

	var count int64
	var rows []models.Driver
	tx := dc.db.Model(&models.Driver{})
	if dto.ColumnID != nil {
		tx.Where("drivers.column_id = ?", dto.ColumnID)
	}
	if dto.BusID != nil {
		tx.Where("drivers.bus_id = ?", dto.BusID)
	}
	if len(dto.Search) != 0 {
		tx.Where("drivers.num LIKE ?", "%"+dto.Search+"%")
		tx.Or("drivers.full_name LIKE ?", "%"+dto.Search+"%")
		tx.Or("buses.num LIKE ?", "%"+dto.Search+"%")
	}
	err := tx.
		Joins("left join buses on drivers.bus_id = buses.id").
		Count(&count).
		Preload("Column").
		Preload("Bus").
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

func (dc *DriversController) Get(c *fiber.Ctx) error {
	id, err := c.ParamsInt("id")
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(err.Error())
	}

	userID := c.Locals("id").(uint)
	isAdmin := c.Locals("isAdmin").(bool)
	if !isAdmin && !models.UserHasDriver(dc.db, userID, uint(id)) {
		return c.SendStatus(fiber.StatusForbidden)
	}

	var row models.Driver
	result := dc.db.
		Preload("Column").
		Preload("Bus").
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

func (dc *DriversController) Delete(c *fiber.Ctx) error {
	id, err := c.ParamsInt("id")
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(err.Error())
	}

	userID := c.Locals("id").(uint)
	isAdmin := c.Locals("isAdmin").(bool)
	if !isAdmin && !models.UserHasDriver(dc.db, userID, uint(id)) {
		return c.SendStatus(fiber.StatusForbidden)
	}

	err = dc.db.Where("id = ?", id).Delete(&models.Driver{}).Error
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(err.Error())
	}

	return c.SendStatus(fiber.StatusOK)
}

func (dc *DriversController) Update(c *fiber.Ctx) error {
	var dto struct {
		ID       uint           `query:"id"`
		ColumnID *uint          `json:"columnId"`
		BusID    *uint          `json:"busId"`
		Num      string         `json:"num"`
		FullName string         `json:"fullName"`
		Graphic  models.Graphic `json:"graphic"`
	}
	if err := c.BodyParser(&dto); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(err.Error())
	}
	if err := c.QueryParser(&dto); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(err.Error())
	}

	userID := c.Locals("id").(uint)
	isAdmin := c.Locals("isAdmin").(bool)
	if !isAdmin && !models.UserHasDriver(dc.db, userID, dto.ID) {
		return c.SendStatus(fiber.StatusForbidden)
	}
	if !isAdmin && dto.BusID != nil && !models.UserHasBus(dc.db, userID, *dto.BusID) {
		return c.SendStatus(fiber.StatusForbidden)
	}

	err := dc.db.
		Model(&models.Driver{}).
		Where("id = ?", dto.ID).
		Updates(map[string]interface{}{
			"ColumnID": dto.ColumnID,
			"BusID":    dto.BusID,
			"Num":      dto.Num,
			"FullName": dto.FullName,
			"Graphic":  dto.Graphic,
		}).
		Error
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(err.Error())
	}

	return c.SendStatus(fiber.StatusOK)
}

func (dc *DriversController) Create(c *fiber.Ctx) error {
	var dto struct {
		ColumnID *uint          `json:"columnId"`
		BusID    *uint          `json:"busId"`
		Num      string         `json:"num"`
		FullName string         `json:"fullName"`
		Graphic  models.Graphic `json:"graphic"`
	}
	if err := c.BodyParser(&dto); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(err.Error())
	}

	userID := c.Locals("id").(uint)
	isAdmin := c.Locals("isAdmin").(bool)
	if !isAdmin && !models.UserHasColumn(dc.db, userID, *dto.ColumnID) {
		return c.SendStatus(fiber.StatusForbidden)
	}
	if !isAdmin && dto.BusID != nil && !models.UserHasBus(dc.db, userID, *dto.BusID) {
		return c.SendStatus(fiber.StatusForbidden)
	}

	row := models.Driver{
		ColumnID: dto.ColumnID,
		BusID:    dto.BusID,
		Num:      dto.Num,
		FullName: dto.FullName,
		Graphic:  dto.Graphic,
	}
	err := dc.db.Create(&row).Error
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(err.Error())
	}

	return c.Status(fiber.StatusCreated).JSON(fiber.Map{
		"id": row.ID,
	})
}
