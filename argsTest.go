package main

import (
	"fmt"
	"os"
)

func main() {
	args := os.Args
	if args == nil || len(args) < 2 {
		fmt.Println("请输出两个或两个以上参数")
		return
	}

	fmt.Printf("第一个参数是:%s\n", args[0])
	fmt.Printf("第二个参数是:%s\n", args[1])
	fmt.Printf("第三个参数是:%s\n", args[2])

	/* 第一个参数是:argsTest.exe
	第二个参数是:127.0.0.1
	第三个参数是:666 */
}
