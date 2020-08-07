package main

import (
	"fmt"
	"testing"
)

func Myfunc01(args ...int) {
	for _, i := range args {
		fmt.Printf("%d ", i)
	}
	fmt.Printf("\n")
}

func Myfunc02(args ...int) {
	for _, j := range args {
		fmt.Printf("%d ", j)
	}
	fmt.Printf("\n")
}

func Myfunc03(args ...int) {
	Myfunc01(args...)
	Myfunc02(args[1:3]...) //从下角标1开始到3结束,包含1但不包含3
}

func TestFunc(*testing.T) {
	Myfunc03(1, 2, 3, 4)
}
