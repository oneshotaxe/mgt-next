package models

import "time"

type Gate struct {
	ID                  uint      `json:"id" gorm:"primaryKey"`
	LastID              string    `json:"-"`
	Column              *Column   `json:"column"`
	ColumnID            *uint     `json:"columnId"`
	Route               *Route    `json:"route"`
	RouteID             *uint     `json:"routeId"`
	Num                 string    `json:"num"`
	DurationFirstSmene  string    `json:"durationFirstSmene"`
	DurationSecondSmene string    `json:"durationSecondSmene"`
	EndWork             string    `json:"endWork"`
	Change              string    `json:"change"`
	LunchFirstSmene     string    `json:"lunchFirstSmene"`
	LunchSecondSmene    string    `json:"lunchSecondSmene"`
	OutPark             string    `json:"outPark"`
	CreatedAt           time.Time `json:"createdAt"`
	UpdatedAt           time.Time `json:"updatedAt"`
}
