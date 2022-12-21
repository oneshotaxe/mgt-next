package main

import (
	"mgt/app/controllers"
	"mgt/pkg/middleware"
	"mgt/platform"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/session"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func main() {
	dsn := "host=postgres user=mgt password=Ll1FGMU8 dbname=mgt port=5432 sslmode=disable"
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}

	platform.Migrate(db)

	app := fiber.New()
	store := session.New()

	app.Use("/api", middleware.ProvideUserInfo(store, db))

	authController := controllers.NewAuthController(db, store)
	usersController := controllers.NewUsersController(db)
	columnsController := controllers.NewColumnsController(db)
	busesController := controllers.NewBusesController(db)
	driversController := controllers.NewDriversController(db)
	routesController := controllers.NewRoutesController(db)
	gatesController := controllers.NewGatesController(db)

	{
		route := app.Group("/api/v1")
		route.Post("/auth/login", authController.LogIn)
	}

	{
		route := app.Group("/api/v1", middleware.Auth(store))
		route.Get("/user", authController.UserInfo)
		route.Post("/auth/logout", authController.LogOut)

		route.Post("/users", usersController.Create)
		route.Get("/users", usersController.GetAll)
		route.Get("/users/:id<int>", usersController.Get)
		route.Put("/users/:id<int>", usersController.Update)
		route.Delete("/users/:id<int>", usersController.Delete)

		route.Post("/columns", columnsController.Create)
		route.Get("/columns", columnsController.GetAll)
		route.Get("/columns/:id<int>", columnsController.Get)
		route.Put("/columns/:id<int>", columnsController.Update)
		route.Delete("/columns/:id<int>", columnsController.Delete)
		route.Get("/columns/:id<int>/agreement", columnsController.Agreement)
		route.Get("/columns/:id<int>/journal", columnsController.Journal)
		route.Post("/columns/:id<int>/upload", columnsController.Upload)

		route.Post("/buses", busesController.Create)
		route.Get("/buses", busesController.GetAll)
		route.Get("/buses/:id<int>", busesController.Get)
		route.Put("/buses/:id<int>", busesController.Update)
		route.Delete("/buses/:id<int>", busesController.Delete)

		route.Post("/drivers", driversController.Create)
		route.Get("/drivers", driversController.GetAll)
		route.Get("/drivers/:id<int>", driversController.Get)
		route.Put("/drivers/:id<int>", driversController.Update)
		route.Delete("/drivers/:id<int>", driversController.Delete)

		route.Post("/routes", routesController.Create)
		route.Get("/routes", routesController.GetAll)
		route.Get("/routes/:id<int>", routesController.Get)
		route.Put("/routes/:id<int>", routesController.Update)
		route.Delete("/routes/:id<int>", routesController.Delete)

		route.Post("/gates", gatesController.Create)
		route.Get("/gates", gatesController.GetAll)
		route.Get("/gates/:id<int>", gatesController.Get)
		route.Put("/gates/:id<int>", gatesController.Update)
		route.Delete("/gates/:id<int>", gatesController.Delete)
	}

	app.Listen(":8000")
}
