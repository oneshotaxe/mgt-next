package models

import "time"

type Bus struct {
	ID        uint      `json:"id" gorm:"primaryKey"`
	LastID    string    `json:"-"`
	Column    *Column   `json:"column"`
	ColumnID  *uint     `json:"columnId"`
	Num       string    `json:"num"`
	Gate      *Gate     `json:"gate"`
	GateID    *uint     `json:"gateId"`
	Drivers   []Driver  `json:"drivers" gorm:"constraint:OnUpdate:CASCADE,OnDelete:SET NULL;"`
	CreatedAt time.Time `json:"createdAt"`
	UpdatedAt time.Time `json:"updatedAt"`
}
