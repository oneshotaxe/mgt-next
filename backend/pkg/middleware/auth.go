package middleware

import (
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/session"
)

func Auth(store *session.Store) func(*fiber.Ctx) error {
	return func(c *fiber.Ctx) error {
		s, err := store.Get(c)
		if err != nil {
			return c.Status(fiber.StatusInternalServerError).JSON(err.Error())
		}

		userID := s.Get("id")
		if userID == nil {
			return c.SendStatus(fiber.StatusUnauthorized)
		}

		return c.Next()
	}
}
