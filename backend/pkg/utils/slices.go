package utils

func Map[T interface{}, R interface{}](cb func(*T) R, src []T) []R {
	ret := make([]R, len(src))

	for i := range src {
		ret[i] = cb(&src[i])
	}

	return ret
}
