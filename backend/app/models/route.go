package models

import "time"

type Route struct {
	ID        uint      `json:"id" gorm:"primaryKey"`
	LastID    string    `json:"-"`
	Column    *Column   `json:"column"`
	ColumnID  *uint     `json:"columnId"`
	Num       string    `json:"num"`
	CreatedAt time.Time `json:"createdAt"`
	UpdatedAt time.Time `json:"updatedAt"`
}
