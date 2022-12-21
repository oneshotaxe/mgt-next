package models

import (
	"database/sql/driver"
	"encoding/json"
	"errors"
	"fmt"
	"time"
)

type Driver struct {
	ID        uint      `json:"id" gorm:"primaryKey"`
	LastID    string    `json:"-"`
	Column    *Column   `json:"column"`
	ColumnID  *uint     `json:"columnId"`
	Bus       *Bus      `json:"bus"`
	BusID     *uint     `json:"busId"`
	Num       string    `json:"num"`
	FullName  string    `json:"fullName"`
	Graphic   Graphic   `json:"graphic"`
	CreatedAt time.Time `json:"createdAt"`
	UpdatedAt time.Time `json:"updatedAt"`
}

func (d *Driver) StatusesByDate(date string, count int) []Status {
	statuses := []Status{}
	startDate, _ := time.Parse("2006-01-02", d.Graphic.Date)

	currDate, _ := time.Parse("2006-01-02", date)
	for range make([]int, count) {
		diff := int(currDate.Sub(startDate).Hours() / 24)
		itemIndex := (((diff % len(d.Graphic.Items)) + len(d.Graphic.Items)) % len(d.Graphic.Items))
		status := d.Graphic.Items[itemIndex]

		statuses = append(statuses, Status{
			Date:  currDate.Format("2006-01-02"),
			Value: status,
		})

		currDate = currDate.Add(time.Hour * 24)
	}

	return statuses
}

type Graphic struct {
	Date   string   `json:"date"`
	Format string   `json:"format"`
	Items  []string `json:"items"`
	Name   string   `json:"name"`
}

// Сканировать массив в Jsonb, описывает интерфейс sql.Scanner
func (g *Graphic) Scan(value interface{}) error {
	bytes, ok := value.([]byte)
	if !ok {
		return errors.New(fmt.Sprint("Ошибка распаковки значения JSONB:", value))
	}

	var result Graphic
	err := json.Unmarshal(bytes, &result)
	*g = result
	return err
}

// Возвращает значение json, описывает интерфейс driver.Valuer
func (g Graphic) Value() (driver.Value, error) {
	return json.Marshal(g)
}

type Status struct {
	Date  string `json:"date"`
	Value string `json:"value"`
}
