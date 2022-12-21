package platform

import (
	"log"
	"mgt/app/models"
	"mgt/pkg/repository"
	"mgt/pkg/utils"

	"github.com/go-gormigrate/gormigrate/v2"
	_ "github.com/jinzhu/gorm/dialects/sqlite"
	"gorm.io/gorm"
)

func Migrate(db *gorm.DB) {
	m := gormigrate.New(db, gormigrate.DefaultOptions, []*gormigrate.Migration{
		{
			ID: "1",
			Migrate: func(tx *gorm.DB) error {
				return tx.AutoMigrate(
					&models.User{},
					&models.UserRole{},
					&models.Column{},
					&models.Bus{},
					&models.Driver{},
					&models.Route{},
					&models.Gate{},
				)
			},
			Rollback: func(tx *gorm.DB) error {
				return tx.Migrator().DropTable(
					"users",
					"user_roles",
					"columns",
					"buses",
					"drivers",
					"routes",
					"gates",
				)
			},
		},
		{
			ID: "2",
			Migrate: func(tx *gorm.DB) error {
				user := models.User{
					PasswordHash: utils.GeneratePassword("admin"),
					Nick:         "admin",
				}

				tx.Create(&user)

				tx.
					Create(&models.UserRole{Key: repository.Admin, UserID: user.ID}).
					Create(&models.UserRole{Key: repository.Employee, UserID: user.ID})

				return nil
			},
			Rollback: func(tx *gorm.DB) error {
				var user models.User
				tx.Where("nick = ?", "admin").Find(&user)
				tx.Delete(&user)

				return nil
			},
		},
	})

	if err := m.Migrate(); err != nil {
		log.Fatalf("Could not migrate: %v", err)
	}
	log.Printf("Migration did run successfully")
}
