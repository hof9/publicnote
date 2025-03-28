import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 p-4 md:p-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-primary md:text-5xl">Count to 100!</h1>
          <p className="mt-2 text-lg text-muted-foreground">Learn to count by 1s, 2s, 5s, and 10s</p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <Link href="/annele/count-100/count/1" className="block">
            <Card className="h-full transition-all hover:shadow-lg">
              <CardHeader className="bg-blue-100 rounded-t-lg">
                <CardTitle className="text-2xl text-center">Count by 1s</CardTitle>
                <CardDescription className="text-center">1, 2, 3, 4, 5...</CardDescription>
              </CardHeader>
              <CardContent className="flex items-center justify-center p-6">
                <div className="grid grid-cols-5 gap-2">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <div
                      key={num}
                      className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-500 text-xl font-bold text-white"
                    >
                      {num}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/annele/count-100/count/2" className="block">
            <Card className="h-full transition-all hover:shadow-lg">
              <CardHeader className="bg-green-100 rounded-t-lg">
                <CardTitle className="text-2xl text-center">Count by 2s</CardTitle>
                <CardDescription className="text-center">2, 4, 6, 8, 10...</CardDescription>
              </CardHeader>
              <CardContent className="flex items-center justify-center p-6">
                <div className="grid grid-cols-5 gap-2">
                  {[2, 4, 6, 8, 10].map((num) => (
                    <div
                      key={num}
                      className="flex h-12 w-12 items-center justify-center rounded-full bg-green-500 text-xl font-bold text-white"
                    >
                      {num}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/annele/count-100/count/5" className="block">
            <Card className="h-full transition-all hover:shadow-lg">
              <CardHeader className="bg-yellow-100 rounded-t-lg">
                <CardTitle className="text-2xl text-center">Count by 5s</CardTitle>
                <CardDescription className="text-center">5, 10, 15, 20, 25...</CardDescription>
              </CardHeader>
              <CardContent className="flex items-center justify-center p-6">
                <div className="grid grid-cols-5 gap-2">
                  {[5, 10, 15, 20, 25].map((num) => (
                    <div
                      key={num}
                      className="flex h-12 w-12 items-center justify-center rounded-full bg-yellow-500 text-xl font-bold text-white"
                    >
                      {num}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/annele/count-100/count/10" className="block">
            <Card className="h-full transition-all hover:shadow-lg">
              <CardHeader className="bg-red-100 rounded-t-lg">
                <CardTitle className="text-2xl text-center">Count by 10s</CardTitle>
                <CardDescription className="text-center">10, 20, 30, 40, 50...</CardDescription>
              </CardHeader>
              <CardContent className="flex items-center justify-center p-6">
                <div className="grid grid-cols-5 gap-2">
                  {[10, 20, 30, 40, 50].map((num) => (
                    <div
                      key={num}
                      className="flex h-12 w-12 items-center justify-center rounded-full bg-red-500 text-xl font-bold text-white"
                    >
                      {num}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>

        <div className="mt-8 text-center">
          <p className="mb-4 text-lg">Ready to start counting?</p>
          <Link href="/annele/count-100/count/1">
            <Button size="lg" className="text-lg">
              Let&apos;s Begin!
            </Button>
          </Link>
        </div>
      </div>
    </main>
  )
}

