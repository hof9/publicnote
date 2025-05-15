import CircleExplorer from "./circle-explorer"
import ReferenceDocument from "./reference-document"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function Home() {
  return (
    <main className="container mx-auto p-4 max-w-6xl">
      <h1 className="text-3xl font-bold text-center my-6">Circle Geometry Explorer</h1>

      <Tabs defaultValue="explorer" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="explorer">Interactive Explorer</TabsTrigger>
          <TabsTrigger value="reference">Reference Document</TabsTrigger>
        </TabsList>
        <TabsContent value="explorer" className="p-4 border-yellow-500 border rounded-md mt-2">
          <CircleExplorer />
        </TabsContent>
        <TabsContent value="reference" className="p-4 border-yellow-500 border rounded-md mt-2">
          <ReferenceDocument />
        </TabsContent>
      </Tabs>
    </main>
  )
}
