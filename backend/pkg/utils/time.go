package utils

import (
	"strconv"
	"time"

	"golang.org/x/exp/slices"
)

func GetWeekendDays(date string, count int) []string {
	ret := []string{}

	currDate, _ := time.Parse("2006-01-02", date)
	for range make([]int, count) {

		if slices.Contains([]time.Weekday{time.Sunday, time.Saturday}, currDate.Weekday()) {
			ret = append(ret, strconv.Itoa(currDate.Day()))
		}

		currDate = currDate.Add(time.Hour * 24)
	}

	return ret
}
