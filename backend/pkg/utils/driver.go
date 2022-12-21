package utils

import "strings"

func ShortifyName(fullName string) string {
	parts := strings.Split(fullName, " ")
	shortName := ""
	for i, p := range parts {
		if i == 0 {
			shortName += p
		} else {
			runes := []rune(p)
			if len(runes) > 0 {
				shortName += " " + string(runes[0]) + "."
			}
		}
	}
	return shortName
}
