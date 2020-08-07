package main

import (
	"fmt"
	"testing"
)

func TestLambda(t *testing.T) {
	i := 1
	str := "hello"

	func1 := func() {
		fmt.Printf("匿名方法 %d , %s\n", i, str)
	}
	func1()

	type f2 func()

	var func2 f2 = func() {
		fmt.Printf("匿名方法 %d , %s\n", i+1, str)
	}
	func2()

	func() {
		fmt.Printf("匿名方法 %d , %s\n", i+2, str)
	}()

	v := func(a, b int) (result int) {
		return a + b
	}(1, 2)

	fmt.Printf("匿名函数求和 %d\n", v)

	fmt.Printf("匿名函数求和 %d\n",
		func(a, b int) (result int) {
			return a + b
		}(1, 3))

	v1 := func(a, b int) (result int) {
		return a + b
	}

	fmt.Printf("求和 %d\n", v1(1, 4))

}
