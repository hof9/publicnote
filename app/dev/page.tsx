import Link from 'next/link';

export default function DevPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Developer Resources</h1>
      
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Experiments</h2>
        {/* <p className="mb-4">
            Welcome to the Public Note development portal. Here you'll find resources to help you understand, contribute to, and build upon our platform.
        </p> */}

        {/* Add some link placeholders here. */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link href="/dev/weather-mcp" className="p-6 border rounded-lg hover:bg-gray-50 transition-colors">
            <div className="flex items-center gap-4 mb-2">
              <div className="w-10 h-10 rounded-full border-2 border-black bg-yellow-500 flex items-center justify-center">
                <img 
                  src="data:image/svg+xml,%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22utf-8%22%3F%3E%3C!--%20License%3A%20MIT.%20Made%20by%20artcoholic%3A%20https%3A%2F%2Fgithub.com%2Fartcoholic%2Fakar-icons%20--%3E%3Csvg%20width%3D%22800px%22%20height%3D%22800px%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M5.03426%2011.1174C3.29168%2011.5494%202%2013.1238%202%2015C2%2017.2091%203.79086%2019%206%2019H17C19.7614%2019%2022%2016.7614%2022%2014C22%2011.2386%2019.7614%209%2017%209C16.5971%209%2016.2053%209.04766%2015.83%209.13765L14.5%209.5%22%20stroke%3D%22%23000000%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%2F%3E%3Cpath%20d%3D%22M15.83%209.13765C15.2238%206.75905%2013.0673%205%2010.5%205C7.46243%205%205%207.46243%205%2010.5C5%2010.7087%205.01163%2010.9147%205.03426%2011.1174C5.03426%2011.1174%205.1875%2012%205.5%2012.5%22%20stroke%3D%22%23000000%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%2F%3E%3C%2Fsvg%3E"
                  alt="Weather Icon"
                  className="w-6 h-6"
                />
              </div>

              <h3 className="text-xl font-medium">Weather MCP</h3>
            </div>
            <p className="text-gray-600">A weather monitoring and control panel for tracking and analyzing weather data.</p>
          </Link>
          <Link href="/dev/experiment" className="p-6 border rounded-lg hover:bg-gray-50 transition-colors">
            <div className="flex items-center gap-4 mb-2">
              <div className="w-10 h-10 rounded-full border-2 border-black bg-yellow-500 flex items-center justify-center">
                <img 
                  src="data:image/svg+xml,%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22utf-8%22%3F%3E%3C!--%20License%3A%20MIT.%20Made%20by%20artcoholic%3A%20https%3A%2F%2Fgithub.com%2Fartcoholic%2Fakar-icons%20--%3E%3Csvg%20width%3D%22800px%22%20height%3D%22800px%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M12%2022C17.5228%2022%2022%2017.5228%2022%2012C22%206.47715%2017.5228%202%2012%202C6.47715%202%202%206.47715%202%2012C2%2017.5228%206.47715%2022%2012%2022Z%22%20stroke%3D%22%23000000%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%2F%3E%3Cpath%20d%3D%22M12%208V16%22%20stroke%3D%22%23000000%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%2F%3E%3Cpath%20d%3D%22M8%2012H16%22%20stroke%3D%22%23000000%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%2F%3E%3C%2Fsvg%3E"
                  alt="Experiment Icon"
                  className="w-6 h-6"
                />
              </div>
              <h3 className="text-xl font-medium">Experiment</h3>
            </div>
            <p className="text-gray-600">A space for testing new features and ideas.</p>
          </Link>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Development Stack</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 border rounded-lg">
            <h3 className="font-medium mb-2">Frontend</h3>
            <ul className="list-disc list-inside text-gray-600">
              <li>Next.js 14</li>
              <li>React</li>
              <li>TypeScript</li>
              <li>Tailwind CSS</li>
            </ul>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="font-medium mb-2">Backend</h3>
            <ul className="list-disc list-inside text-gray-600">
              <li>Node.js</li>
              <li>Express</li>
              <li>PostgreSQL</li>
            </ul>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="font-medium mb-2">Tools</h3>
            <ul className="list-disc list-inside text-gray-600">
              <li>Git</li>
              <li>Docker</li>
              <li>Vercel</li>
            </ul>
          </div>
        </div>
      </section>

      {/* <section>
        <h2 className="text-2xl font-semibold mb-4">Quick Links</h2>
        <div className="space-y-2">
          <Link href="https://github.com/yourusername/publicnote" className="block text-blue-600 hover:underline">
            GitHub Repository
          </Link>
          <Link href="/dev/roadmap" className="block text-blue-600 hover:underline">
            Project Roadmap
          </Link>
          <Link href="/dev/faq" className="block text-blue-600 hover:underline">
            Developer FAQ
          </Link>
        </div>
      </section> */}
    </div>
  );
}
