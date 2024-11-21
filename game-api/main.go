package main

import (
	"fmt"
	"math"
)

func main() {

	a := 5;
	b := 7;

	math.Abs(float64(a - b));

	fmt.Println("Hello, 世界", math.Abs(float64(a - b)))
}