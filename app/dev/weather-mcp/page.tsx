import WeatherDashboard from "@/components/weather-dashboard"

export default function WeatherMCP() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Weather MCP</h1>
        <p className="text-gray-600">Real-time weather monitoring for Woodstock, Illinois</p>
      </div>
      
      <WeatherDashboard />


    </div>
  )
}
