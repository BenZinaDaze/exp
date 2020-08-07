package main

import (
	"fmt"
	"testing"
)

type ft func(int, int) int

func Calc(a, b int, f ft) (result int) {
	return f(a, b)
}

func add(a, b int) (result int) {
	return a + b
}

func minus(a, b int) (result int) {
	return a - b
}

func TestFuncType(*testing.T) {
	// result := add(1, 2)
	result := Calc(1, 2, add)
	fmt.Println(result)

	// result = minus(3, 2)
	var f ft = minus
	fmt.Println(f(3, 2))
}
