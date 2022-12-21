package models

import (
	"mgt/pkg/repository"
	"mgt/pkg/utils"
	"time"

	"gorm.io/gorm"
)

type User struct {
	ID           uint       `json:"id" gorm:"primaryKey"`
	Role         []UserRole `json:"roles" gorm:"foreignKey:UserID;constraint:OnDelete:CASCADE;"`
	Nick         string     `json:"nick" gorm:"unique" validate:"required,lte=255"`
	PasswordHash string     `json:"password" validate:"required,lte=255"`
	CreatedAt    time.Time  `json:"createdAt"`
	UpdatedAt    time.Time  `json:"updatedAt"`
}

type UserRole struct {
	ID     uint `json:"id" gorm:"primaryKey"`
	UserID uint `json:"userId" gorm:"foreignKey:ID"`
	Key    repository.Role
}

func (u *User) ToPublic() *PublicUser {
	return &PublicUser{
		ID:        u.ID,
		Nick:      u.Nick,
		Role:      u.PublicRoles(),
		CreatedAt: u.CreatedAt,
		UpdatedAt: u.UpdatedAt,
	}
}

func (u *User) PublicRoles() []repository.Role {
	return utils.Map(func(ur *UserRole) repository.Role { return ur.Key }, u.Role)
}

type PublicUser struct {
	ID        uint              `json:"id"`
	Nick      string            `json:"nick"`
	Role      []repository.Role `json:"roles"`
	CreatedAt time.Time         `json:"createdAt"`
	UpdatedAt time.Time         `json:"updatedAt"`
}

func UserHasColumn(db *gorm.DB, userID uint, columnID uint) bool {
	var count int64
	db.Model(&Column{}).Where("user_id = ?", userID).Where("id = ?", columnID).Count(&count)
	return count > 0
}

func UserHasBus(db *gorm.DB, userID uint, busID uint) bool {
	var row Bus
	db.Where("id = ?", busID).First(&row)
	return UserHasColumn(db, userID, *row.ColumnID)
}

func UserHasDriver(db *gorm.DB, userID uint, driverID uint) bool {
	var row Driver
	db.Where("id = ?", driverID).First(&row)
	return UserHasColumn(db, userID, *row.ColumnID)
}

func UserHasGate(db *gorm.DB, userID uint, gateID uint) bool {
	var row Gate
	db.Where("id = ?", gateID).First(&row)
	return UserHasColumn(db, userID, *row.ColumnID)
}

func UserHasRoute(db *gorm.DB, userID uint, routeID uint) bool {
	var row Route
	db.Where("id = ?", routeID).First(&row)
	return UserHasColumn(db, userID, *row.ColumnID)
}
