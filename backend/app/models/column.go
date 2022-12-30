package models

import (
	"mgt/pkg/utils"
	"time"
)

type Column struct {
	ID        uint      `json:"id" gorm:"primaryKey"`
	User      *User     `json:"user"`
	UserID    *uint     `json:"userId"`
	Title     string    `json:"title"`
	CreatedAt time.Time `json:"createdAt"`
	UpdatedAt time.Time `json:"updatedAt"`
}

type AgreementDriver struct {
	ShortName string `json:"shortName"`
	Num       string `json:"num"`
}

type Journal struct {
	Pages    []JournalPage `json:"pages"`
	PageSize int           `json:"-"`
	Weekdays []string      `json:"-"`
}

func (j *Journal) PushBus(bus *Bus, date string, count int) {
	if j.IsEmpty() {
		j.PushPage()
	}

	lastPage := j.LastPage()
	if lastPage.IsFull() {
		j.PushPage()
	}
	lastPage = j.LastPage()

	jDrivers := []JournalDriver{}
	for _, d := range bus.Drivers {
		jDrivers = append(jDrivers, JournalDriver{
			Graphic:   d.Graphic,
			ShortName: utils.ShortifyName(d.FullName),
			FullName:  d.FullName,
			Num:       d.Num,
			Statuses:  d.StatusesByDate(date, count),
		})
	}

	var jRoute *JournalRoute
	if bus.Gate != nil && bus.Gate.Route != nil {
		jRoute = &JournalRoute{
			Num: bus.Gate.Route.Num,
		}
	}

	var jGate *JournalGate
	if bus.Gate != nil {
		jGate = &JournalGate{
			Route: jRoute,
			Num:   bus.Gate.Num,
			Times: JournalGateTimes{
				DurationFirstSmene:  bus.Gate.DurationFirstSmene,
				DurationSecondSmene: bus.Gate.DurationSecondSmene,
				EndWork:             bus.Gate.EndWork,
				Change:              bus.Gate.Change,
				LunchFirstSmene:     bus.Gate.LunchFirstSmene,
				LunchSecondSmene:    bus.Gate.LunchSecondSmene,
				OutPark:             bus.Gate.OutPark,
			},
		}
	}

	jBus := JournalBus{
		Drivers: jDrivers,
		Num:     bus.Num,
		Gate:    jGate,
	}

	lastPage.Buses = append(lastPage.Buses, jBus)
}

func (j *Journal) PushPage() {
	j.Pages = append(j.Pages, JournalPage{
		Number:   len(j.Pages),
		PageSize: j.PageSize,
		Weekdays: j.Weekdays,
	})
}

func (j *Journal) IsEmpty() bool {
	return len(j.Pages) == 0
}

func (j *Journal) LastPage() *JournalPage {
	return &j.Pages[len(j.Pages)-1]
}

type JournalPage struct {
	Buses    []JournalBus `json:"buses"`
	Number   int          `json:"number"`
	Weekdays []string     `json:"weekdays"`
	PageSize int          `json:"-"`
}

func (p *JournalPage) IsFull() bool {
	return len(p.Buses) == p.PageSize
}

type JournalBus struct {
	Drivers []JournalDriver `json:"drivers"`
	Num     string          `json:"num"`
	Gate    *JournalGate    `json:"gate"`
}

type JournalDriver struct {
	Graphic   Graphic  `json:"graphic"`
	ShortName string   `json:"shortName"`
	FullName  string   `json:"fullName"`
	Num       string   `json:"num"`
	Statuses  []Status `json:"statuses"`
}

type JournalGate struct {
	Route *JournalRoute    `json:"route"`
	Times JournalGateTimes `json:"times"`
	Num   string           `json:"num"`
}

type JournalGateTimes struct {
	DurationFirstSmene  string `json:"durationFirstSmene"`
	DurationSecondSmene string `json:"durationSecondSmene"`
	EndWork             string `json:"endWork"`
	Change              string `json:"change"`
	LunchFirstSmene     string `json:"lunchFirstSmene"`
	LunchSecondSmene    string `json:"lunchSecondSmene"`
	OutPark             string `json:"outPark"`
}

type JournalRoute struct {
	Num string `json:"num"`
}
