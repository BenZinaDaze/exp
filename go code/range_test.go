package main

import (
	"fmt"
	"testing"
)

func TestHello(t *testing.T) {
	fmt.Println("Hello world")
}

func TestRange(t *testing.T) {

	var s string = "abc"

	for i, j := range s {
		fmt.Printf("%d, %v\n", i, j)
	}
}
