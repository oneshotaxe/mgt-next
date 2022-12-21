package middleware

import (
	"mgt/app/models"
	"mgt/pkg/repository"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/session"
	"gorm.io/gorm"
)

func ProvideUserInfo(store *session.Store, db *gorm.DB) func(*fiber.Ctx) error {
	return func(c *fiber.Ctx) error {
		s, err := store.Get(c)
		if err != nil {
			return c.Status(fiber.StatusInternalServerError).JSON(err.Error())
		}
		userID := s.Get("id")
		if userID == nil {
			c.Locals("id", 0)
			c.Locals("isAdmin", false)
			return c.Next()
		}

		localsUserID := userID.(uint)
		c.Locals("id", localsUserID)
		var count int64
		if err := db.Model(&models.UserRole{}).Where("user_id = ?", userID).Where("key = ?", repository.Admin).Count(&count).Error; err != nil {
			return c.Status(fiber.StatusInternalServerError).JSON(err.Error())
		}
		c.Locals("isAdmin", count > 0)
		return c.Next()
	}
}
