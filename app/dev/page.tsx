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
            <h3 className="text-xl font-medium mb-2">Weather MCP</h3>
            <p className="text-gray-600">A weather monitoring and control panel for tracking and analyzing weather data.</p>
          </Link>
          <Link href="/dev/linktwo" className="p-6 border rounded-lg hover:bg-gray-50 transition-colors">
            <h3 className="text-xl font-medium mb-2">Link two</h3>
            <p className="text-gray-600">text description</p>
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
