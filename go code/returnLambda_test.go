package main

import (
	"fmt"
	"testing"
)

func squ() func() int {
	var x int
	//int 默认值为 0
	return func() int {
		x++
		return x * x
	}
}

func TestSqu(t *testing.T) {
	// f := squ()
	// fmt.Println(f()) //1
	// fmt.Println(f()) //4
	// fmt.Println(f()) //9
	// fmt.Println(f()) //16

	//每次调用squ()的时候都会重新给x赋值，所以每次执行结果都是1
	fmt.Println(squ()()) //1
	fmt.Println(squ()()) //1
	fmt.Println(squ()()) //1
	fmt.Println(squ()()) //1

}
