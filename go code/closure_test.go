package main

import (
	"fmt"
	"testing"
)

func TestClosure(t *testing.T) {
	i := 1
	str := "hello"

	func() {
		i = 2
		str = "world"

		fmt.Printf("内部 i =  %d , str = %s\n", i, str)
	}()

	fmt.Printf("外部 i =  %d , str = %s\n", i, str)
}
