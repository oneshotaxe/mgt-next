package controllers

import (
	"mgt/app/models"
	"mgt/pkg/utils"

	"github.com/gofiber/fiber/v2"
	"gorm.io/gorm"
)

type ColumnsController struct {
	db *gorm.DB
}

func NewColumnsController(db *gorm.DB) *ColumnsController {
	return &ColumnsController{
		db: db,
	}
}

func (cc *ColumnsController) GetAll(c *fiber.Ctx) error {
	var dto struct {
		Limit  int    `query:"limit"`
		Offset int    `query:"offset"`
		Order  string `query:"order"`
		Search string `query:"search"`
		UserID *uint  `query:"userId"`
	}
	if err := c.QueryParser(&dto); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(err.Error())
	}

	userID := c.Locals("id").(uint)
	isAdmin := c.Locals("isAdmin").(bool)
	if !isAdmin && userID != *dto.UserID {
		return c.SendStatus(fiber.StatusForbidden)
	}

	var count int64
	var rows []models.Column

	tx := cc.db.Model(&models.Column{})
	if dto.UserID != nil {
		tx.Where("user_id = ?", dto.UserID)
	}
	if len(dto.Search) != 0 {
		tx.Where("Title LIKE ?", "%"+dto.Search+"%")
	}
	err := tx.
		Count(&count).
		Preload("User").
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

func (cc *ColumnsController) Get(c *fiber.Ctx) error {
	id, err := c.ParamsInt("id")
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(err.Error())
	}

	userID := c.Locals("id").(uint)
	isAdmin := c.Locals("isAdmin").(bool)
	if !isAdmin && !models.UserHasColumn(cc.db, userID, uint(id)) {
		return c.SendStatus(fiber.StatusForbidden)
	}

	var row models.Column
	result := cc.db.
		Preload("User").
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

func (cc *ColumnsController) Delete(c *fiber.Ctx) error {
	id, err := c.ParamsInt("id")
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(err.Error())
	}

	userID := c.Locals("id").(uint)
	isAdmin := c.Locals("isAdmin").(bool)
	if !isAdmin && !models.UserHasColumn(cc.db, userID, uint(id)) {
		return c.SendStatus(fiber.StatusForbidden)
	}

	err = cc.db.Where("id = ?", id).Delete(&models.Column{}).Error
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(err.Error())
	}

	return c.SendStatus(fiber.StatusOK)
}

func (cc *ColumnsController) Update(c *fiber.Ctx) error {
	var dto struct {
		ID     uint   `params:"id" validate:"required"`
		UserID *uint  `json:"userId"`
		Title  string `json:"title"`
	}
	if err := c.BodyParser(&dto); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(err.Error())
	}
	if err := c.ParamsParser(&dto); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(err.Error())
	}

	userID := c.Locals("id").(uint)
	isAdmin := c.Locals("isAdmin").(bool)
	if !isAdmin && !models.UserHasColumn(cc.db, userID, dto.ID) {
		return c.SendStatus(fiber.StatusForbidden)
	}

	err := cc.db.
		Model(&models.Column{}).
		Where("id = ?", dto.ID).
		Updates(map[string]interface{}{
			"UserID": dto.UserID,
			"Title":  dto.Title,
		}).
		Error
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(err.Error())
	}

	return c.SendStatus(fiber.StatusOK)
}

func (cc *ColumnsController) Create(c *fiber.Ctx) error {
	var dto struct {
		UserID *uint  `json:"userId"`
		Title  string `json:"title"`
	}

	if err := c.BodyParser(&dto); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(err.Error())
	}

	isAdmin := c.Locals("isAdmin").(bool)
	if !isAdmin {
		return c.SendStatus(fiber.StatusForbidden)
	}

	row := models.Column{
		UserID: dto.UserID,
		Title:  dto.Title,
	}
	err := cc.db.Create(&row).Error
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(err.Error())
	}

	return c.Status(fiber.StatusCreated).JSON(fiber.Map{
		"id": row.ID,
	})
}

func (cc *ColumnsController) Agreement(c *fiber.Ctx) error {
	id, err := c.ParamsInt("id")
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(err.Error())
	}

	userID := c.Locals("id").(uint)
	isAdmin := c.Locals("isAdmin").(bool)
	if !isAdmin && !models.UserHasColumn(cc.db, userID, uint(id)) {
		return c.SendStatus(fiber.StatusForbidden)
	}

	var drivers []models.Driver
	if err := cc.db.Where("column_id = ?", id).Order("num asc").Find(&drivers).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(err.Error())
	}

	agreementDrivers := make([]models.AgreementDriver, len(drivers))
	for i, d := range drivers {
		agreementDrivers[i] = models.AgreementDriver{
			Num:       d.Num,
			ShortName: utils.ShortifyName(d.FullName),
		}
	}

	return c.JSON(agreementDrivers)
}

func (cc *ColumnsController) Journal(c *fiber.Ctx) error {
	month := c.Query("month")
	if len(month) == 0 {
		return c.SendStatus(fiber.StatusBadRequest)
	}
	id, err := c.ParamsInt("id")
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(err.Error())
	}

	userID := c.Locals("id").(uint)
	isAdmin := c.Locals("isAdmin").(bool)
	if !isAdmin && !models.UserHasColumn(cc.db, userID, uint(id)) {
		return c.SendStatus(fiber.StatusForbidden)
	}

	var buses []models.Bus
	if err := cc.db.Where("column_id = ?", id).Preload("Drivers").Preload("Gate").Preload("Gate.Route").Order("num asc").Find(&buses).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(err.Error())
	}

	journal := models.Journal{PageSize: 5, Weekdays: []string{}}
	for _, bus := range buses {
		journal.PushBus(&bus, month)
	}

	return c.JSON(journal)
}

func (cc *ColumnsController) Upload(c *fiber.Ctx) error {
	var dto struct {
		ID     uint `params:"id"`
		Routes []struct {
			ID  string `json:"_id"`
			Num string `json:"num"`
		} `json:"routes"`
		Ways []struct {
			ID    string `json:"_id"`
			Route string `json:"route"`
			Num   string `json:"num"`
			Times struct {
				Change              string `json:"change"`
				DurationFirstSmene  string `json:"durationFirstSmene"`
				DurationSecondSmene string `json:"durationSecondSmene"`
				EndWork             string `json:"endWork"`
				LunchFirstSmene     string `json:"lunchFirstSmene"`
				LunchSecondSmene    string `json:"lunchSecondSmene"`
				OutPark             string `json:"outPark"`
			} `json:"times"`
		} `json:"ways"`
		Buses []struct {
			ID  string `json:"_id"`
			Num string `json:"num"`
			Way string `json:"way"`
		} `json:"buses"`
		Drivers []struct {
			ID      string `json:"_id"`
			Bus     string `json:"bus"`
			Num     string `json:"num"`
			Name    string `json:"name"`
			Graphic struct {
				Name   string   `json:"name"`
				Date   string   `json:"date"`
				Format string   `json:"format"`
				Items  []string `json:"items"`
			} `json:"graphic"`
		} `json:"drivers"`
	}
	if err := c.BodyParser(&dto); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(err.Error())
	}
	if err := c.ParamsParser(&dto); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(err.Error())
	}

	userID := c.Locals("id").(uint)
	isAdmin := c.Locals("isAdmin").(bool)
	if !isAdmin && !models.UserHasColumn(cc.db, userID, dto.ID) {
		return c.SendStatus(fiber.StatusForbidden)
	}

	for _, r := range dto.Routes {
		cc.db.Create(&models.Route{
			ColumnID: &dto.ID,
			LastID:   r.ID,
			Num:      r.Num,
		})
	}

	for _, w := range dto.Ways {
		var r *models.Route
		if len(w.Route) > 0 {
			cc.db.Where("last_id = ?", w.Route).First(&r)
		}
		g := &models.Gate{
			ColumnID:            &dto.ID,
			LastID:              w.ID,
			Num:                 w.Num,
			Change:              w.Times.Change,
			DurationFirstSmene:  w.Times.DurationFirstSmene,
			DurationSecondSmene: w.Times.DurationSecondSmene,
			EndWork:             w.Times.EndWork,
			LunchFirstSmene:     w.Times.LunchFirstSmene,
			LunchSecondSmene:    w.Times.LunchSecondSmene,
			OutPark:             w.Times.OutPark,
		}
		if r != nil {
			g.RouteID = &r.ID
		}
		cc.db.Create(g)
	}

	for _, b := range dto.Buses {
		var g *models.Gate
		if len(b.Way) > 0 {
			cc.db.Where("last_id = ?", b.Way).First(&g)
		}
		b := &models.Bus{
			ColumnID: &dto.ID,
			LastID:   b.ID,
			Num:      b.Num,
		}
		if g != nil {
			b.GateID = &g.ID
		}
		cc.db.Create(b)
	}

	for _, d := range dto.Drivers {
		var b *models.Bus
		if len(d.Bus) > 0 {
			cc.db.Where("last_id = ?", d.Bus).First(&b)
		}
		d := &models.Driver{
			ColumnID: &dto.ID,
			LastID:   d.ID,
			Num:      d.Num,
			FullName: d.Name,
			Graphic: models.Graphic{
				Date:   d.Graphic.Date,
				Format: d.Graphic.Format,
				Items:  d.Graphic.Items,
				Name:   d.Graphic.Name,
			},
		}
		if b != nil {
			d.BusID = &b.ID
		}
		cc.db.Create(d)
	}

	return c.SendStatus(fiber.StatusOK)
}
