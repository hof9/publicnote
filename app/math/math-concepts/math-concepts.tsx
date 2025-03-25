"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { EvenOddDemo } from "./demos/even-odd-demo"
import { PrimeNumbersDemo } from "./demos/prime-numbers-demo"
import { SquareNumbersDemo } from "./demos/square-numbers-demo"
import { FractionsDemo } from "./demos/fractions-demo"
import { PercentagesDemo } from "./demos/percentages-demo"

export function MathConcepts() {
  const [activeTab, setActiveTab] = useState("even-odd")

  return (
    <div className="space-y-8">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-5">
          <TabsTrigger value="even-odd">Even & Odd</TabsTrigger>
          <TabsTrigger value="prime">Prime Numbers</TabsTrigger>
          <TabsTrigger value="square">Square Numbers</TabsTrigger>
          <TabsTrigger value="fractions">Fractions</TabsTrigger>
          <TabsTrigger value="percentages">Percentages</TabsTrigger>
        </TabsList>
        <TabsContent value="even-odd" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Even & Odd Numbers</CardTitle>
              <CardDescription>
                Even numbers can be shared equally between two friends. Odd numbers always have one left over!
              </CardDescription>
            </CardHeader>
            <CardContent>
              <EvenOddDemo />
            </CardContent>
            <CardFooter className="text-sm text-muted-foreground">
              Try different numbers to see if they're even or odd!
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="prime" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Prime Numbers</CardTitle>
              <CardDescription>
                Prime numbers are special numbers that can only be divided by 1 and themselves.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <PrimeNumbersDemo />
            </CardContent>
            <CardFooter className="text-sm text-muted-foreground">
              Click on the numbers to see if they're prime!
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="square" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Square Numbers</CardTitle>
              <CardDescription>
                Square numbers are like building blocks arranged in a perfect square shape.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <SquareNumbersDemo />
            </CardContent>
            <CardFooter className="text-sm text-muted-foreground">
              Drag the slider to see different square numbers!
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="fractions" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Fractions</CardTitle>
              <CardDescription>
                Fractions are parts of a whole, like slices of a pizza or pieces of a chocolate bar.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FractionsDemo />
            </CardContent>
            <CardFooter className="text-sm text-muted-foreground">
              Change the numerator and denominator to see different fractions!
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="percentages" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Percentages</CardTitle>
              <CardDescription>
                Percentages tell us how many parts out of 100. Like filling up a jar with 100 spaces!
              </CardDescription>
            </CardHeader>
            <CardContent>
              <PercentagesDemo />
            </CardContent>
            <CardFooter className="text-sm text-muted-foreground">
              Move the slider to see different percentages!
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

