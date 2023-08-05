package main

import (
	"flag"
	"fmt"
	"os"
)

func main() {
	var port string
	flag.StringVar(&port, "port", "3000", "--port <value>")

	var isDev bool
	flag.BoolVar(&isDev, "dev", false, "--dev")
	flag.Parse()

	fmt.Println("value of port:", port)
	fmt.Println("value of isDev:", isDev)
	v := os.Getenv("X")
	fmt.Println("value of env user", v)
}