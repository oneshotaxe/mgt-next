package controllers

import (
	"mgt/app/models"

	"github.com/gofiber/fiber/v2"
	"gorm.io/gorm"
)

type GatesController struct {
	db *gorm.DB
}

func NewGatesController(db *gorm.DB) *GatesController {
	return &GatesController{
		db: db,
	}
}

func (gc *GatesController) GetAll(c *fiber.Ctx) error {
	var dto struct {
		Limit    int    `query:"limit"`
		Offset   int    `query:"offset"`
		Order    string `query:"order"`
		Search   string `query:"search"`
		ColumnID *uint  `query:"columnId"`
		RouteID  *uint  `query:"routeId"`
	}
	if err := c.QueryParser(&dto); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(err.Error())
	}

	userID := c.Locals("id").(uint)
	isAdmin := c.Locals("isAdmin").(bool)
	if !isAdmin && !models.UserHasColumn(gc.db, userID, *dto.ColumnID) {
		return c.SendStatus(fiber.StatusForbidden)
	}

	var count int64
	var rows []models.Gate
	tx := gc.db.Model(&models.Gate{})
	if dto.ColumnID != nil {
		tx.Where("column_id = ?", dto.ColumnID)
	}
	if dto.RouteID != nil {
		tx.Where("bus_id = ?", dto.RouteID)
	}
	if len(dto.Search) != 0 {
		tx.Where("Num LIKE ?", "%"+dto.Search+"%")
	}
	err := tx.
		Count(&count).
		Preload("Column").
		Preload("Route").
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

func (gc *GatesController) Get(c *fiber.Ctx) error {
	id, err := c.ParamsInt("id")
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(err.Error())
	}

	userID := c.Locals("id").(uint)
	isAdmin := c.Locals("isAdmin").(bool)
	if !isAdmin && !models.UserHasGate(gc.db, userID, uint(id)) {
		return c.SendStatus(fiber.StatusForbidden)
	}

	var row models.Gate
	result := gc.db.
		Preload("Column").
		Preload("Route").
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

func (gc *GatesController) Delete(c *fiber.Ctx) error {
	id, err := c.ParamsInt("id")
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(err.Error())
	}

	userID := c.Locals("id").(uint)
	isAdmin := c.Locals("isAdmin").(bool)
	if !isAdmin && !models.UserHasGate(gc.db, userID, uint(id)) {
		return c.SendStatus(fiber.StatusForbidden)
	}

	err = gc.db.Where("id = ?", id).Delete(&models.Gate{}).Error
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(err.Error())
	}

	return c.SendStatus(fiber.StatusOK)
}

func (gc *GatesController) Update(c *fiber.Ctx) error {
	var dto struct {
		ID                  uint   `query:"id"`
		ColumnID            *uint  `json:"columnId"`
		RouteID             *uint  `json:"routeId"`
		Num                 string `json:"num"`
		DurationFirstSmene  string `json:"durationFirstSmene"`
		DurationSecondSmene string `json:"durationSecondSmene"`
		EndWork             string `json:"endWork"`
		Change              string `json:"change"`
		LunchFirstSmene     string `json:"lunchFirstSmene"`
		LunchSecondSmene    string `json:"lunchSecondSmene"`
		OutPark             string `json:"outPark"`
	}
	if err := c.BodyParser(&dto); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(err.Error())
	}
	if err := c.QueryParser(&dto); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(err.Error())
	}

	userID := c.Locals("id").(uint)
	isAdmin := c.Locals("isAdmin").(bool)
	if !isAdmin && !models.UserHasGate(gc.db, userID, dto.ID) {
		return c.SendStatus(fiber.StatusForbidden)
	}
	if !isAdmin && dto.RouteID != nil && !models.UserHasRoute(gc.db, userID, *dto.RouteID) {
		return c.SendStatus(fiber.StatusForbidden)
	}

	err := gc.db.
		Model(&models.Gate{}).
		Where("id = ?", dto.ID).
		Updates(map[string]interface{}{
			"ColumnID":            dto.ColumnID,
			"RouteID":             dto.RouteID,
			"Num":                 dto.Num,
			"DurationFirstSmene":  dto.DurationFirstSmene,
			"DurationSecondSmene": dto.DurationSecondSmene,
			"EndWork":             dto.EndWork,
			"Change":              dto.Change,
			"LunchFirstSmene":     dto.LunchFirstSmene,
			"LunchSecondSmene":    dto.LunchSecondSmene,
			"OutPark":             dto.OutPark,
		}).
		Error
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(err.Error())
	}

	return c.SendStatus(fiber.StatusOK)
}

func (gc *GatesController) Create(c *fiber.Ctx) error {
	var dto struct {
		ColumnID            *uint  `json:"columnId"`
		RouteID             *uint  `json:"routeId"`
		Num                 string `json:"num"`
		DurationFirstSmene  string `json:"durationFirstSmene"`
		DurationSecondSmene string `json:"durationSecondSmene"`
		EndWork             string `json:"endWork"`
		Change              string `json:"change"`
		LunchFirstSmene     string `json:"lunchFirstSmene"`
		LunchSecondSmene    string `json:"lunchSecondSmene"`
		OutPark             string `json:"outPark"`
	}
	if err := c.BodyParser(&dto); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(err.Error())
	}

	userID := c.Locals("id").(uint)
	isAdmin := c.Locals("isAdmin").(bool)
	if !isAdmin && !models.UserHasColumn(gc.db, userID, *dto.ColumnID) {
		return c.SendStatus(fiber.StatusForbidden)
	}
	if !isAdmin && dto.RouteID != nil && !models.UserHasRoute(gc.db, userID, *dto.RouteID) {
		return c.SendStatus(fiber.StatusForbidden)
	}

	row := models.Gate{
		ColumnID:            dto.ColumnID,
		RouteID:             dto.RouteID,
		Num:                 dto.Num,
		DurationFirstSmene:  dto.DurationFirstSmene,
		DurationSecondSmene: dto.DurationSecondSmene,
		EndWork:             dto.EndWork,
		Change:              dto.Change,
		LunchFirstSmene:     dto.LunchFirstSmene,
		LunchSecondSmene:    dto.LunchSecondSmene,
		OutPark:             dto.OutPark,
	}
	err := gc.db.Create(&row).Error
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(err.Error())
	}

	return c.Status(fiber.StatusCreated).JSON(fiber.Map{
		"id": row.ID,
	})
}
