export default function ReferenceDocument() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-yellow-500 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center bg-gray-900 text-white py-2 mb-4">PARTS OF CIRCLES DICTIONARY</h2>

        <div className="space-y-4">
          <div className="grid grid-cols-3 border-b-2 border-black pb-2">
            <div className="font-bold text-lg">Term</div>
            <div className="font-bold text-lg">Definition</div>
            <div className="font-bold text-lg text-center">Example or Visual</div>
          </div>

          {/* Circle */}
          <div className="grid grid-cols-3 border-b border-black pb-4">
            <div className="font-bold text-xl">CIRCLE</div>
            <div>The set of points equidistant from a given point (the center).</div>
            <div className="flex justify-center items-center">
              <div className="relative w-20 h-20"></div>
            </div>
          </div>

          {/* Radius */}
          <div className="grid grid-cols-3 border-b border-black pb-4">
            <div className="font-bold text-xl">RADIUS</div>
            <div>A segment with endpoints at the center and on the circle.</div>
            <div className="flex justify-center items-center">
              <div className="relative w-20 h-20"></div>
            </div>
          </div>

          {/* Chord */}
          <div className="grid grid-cols-3 border-b border-black pb-4">
            <div className="font-bold text-xl">CHORD</div>
            <div>A segment with endpoints on the circle.</div>
            <div className="flex justify-center items-center">
              <div className="relative w-20 h-20"></div>
            </div>
          </div>

          {/* Diameter */}
          <div className="grid grid-cols-3 border-b border-black pb-4">
            <div className="font-bold text-xl">DIAMETER</div>
            <div>
              A chord that passes through the center.
              <br />
              (Diameter = 2·radius)
            </div>
            <div className="flex justify-center items-center">
              <div className="relative w-20 h-20"></div>
            </div>
          </div>

          {/* Secant */}
          <div className="grid grid-cols-3 border-b border-black pb-4">
            <div className="font-bold text-xl">SECANT</div>
            <div>A line that intersects the circle in two places.</div>
            <div className="flex justify-center items-center">
              <div className="relative w-20 h-20"></div>
            </div>
          </div>

          {/* Tangent */}
          <div className="grid grid-cols-3 border-b border-black pb-4">
            <div className="font-bold text-xl">TANGENT</div>
            <div>A line that intersects the circle at exactly one place.</div>
            <div className="flex justify-center items-center">
              <div className="relative w-20 h-20"></div>
            </div>
          </div>

          {/* Point of Tangency */}
          <div className="grid grid-cols-3 border-b border-black pb-4">
            <div className="font-bold text-xl">POINT OF TANGENCY</div>
            <div>The point at which the tangent line intersects the circle.</div>
            <div className="flex justify-center items-center">
              <div className="relative w-20 h-20"></div>
            </div>
          </div>

          {/* Central Angle */}
          <div className="grid grid-cols-3 border-b border-black pb-4">
            <div className="font-bold text-xl">CENTRAL ANGLE</div>
            <div>An angle with a vertex at the center, and two sides that are radii.</div>
            <div className="flex justify-center items-center">
              <div className="relative w-20 h-20"></div>
            </div>
          </div>

          {/* Inscribed Angle */}
          <div className="grid grid-cols-3 border-b border-black pb-4">
            <div className="font-bold text-xl">INSCRIBED ANGLE</div>
            <div>An angle with a vertex on the circle, and two sides that are chords.</div>
            <div className="flex justify-center items-center">
              <div className="relative w-20 h-20"></div>
            </div>
          </div>

          {/* Arc */}
          <div className="grid grid-cols-3 border-b border-black pb-4">
            <div className="font-bold text-xl">ARC</div>
            <div>
              A portion of the edge of the circle defined by two endpoints.
              <br />
              Symbol: ⌒
            </div>
            <div className="flex justify-center items-center">
              <div className="relative w-20 h-20"></div>
            </div>
          </div>

          {/* Minor Arc */}
          <div className="grid grid-cols-3 border-b border-black pb-4">
            <div className="font-bold text-xl">MINOR ARC</div>
            <div>
              An arc with a measure less than 180°.
              <br />
              *use 2 letters to name it!
            </div>
            <div className="flex justify-center items-center">
              <div className="relative w-20 h-20"></div>
            </div>
          </div>

          {/* Major Arc */}
          <div className="grid grid-cols-3 border-b border-black pb-4">
            <div className="font-bold text-xl">MAJOR ARC</div>
            <div>
              An arc with a measure greater than 180°.
              <br />
              *use 3 letters to name it!
            </div>
            <div className="flex justify-center items-center">
              <div className="relative w-20 h-20"></div>
            </div>
          </div>

          {/* Semicircle */}
          <div className="grid grid-cols-3 border-b border-black pb-4">
            <div className="font-bold text-xl">SEMICIRCLE</div>
            <div>
              An arc with endpoints on the diameter.
              <br />
              *Always equal to 180°!
            </div>
            <div className="flex justify-center items-center">
              <div className="relative w-20 h-20"></div>
            </div>
          </div>
        </div>

        {/* Formulas Section */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-center bg-gray-900 text-white py-2 mb-4">FORMULAS</h2>

          <div className="grid grid-cols-3 border-2 border-black">
            <div className="p-4 border-r-2 border-black">
              <h3 className="text-xl font-bold text-center mb-2">AREA</h3>
              <p className="text-center">A = πr²</p>
              <p className="text-center text-sm mt-2">(where r = radius)</p>
            </div>

            <div className="p-4 border-r-2 border-black">
              <h3 className="text-xl font-bold text-center mb-2">CIRCUMFERENCE</h3>
              <p className="text-center">C = 2πr</p>
              <p className="text-center text-sm">(where r = radius)</p>
              <p className="text-center mt-2">C = πd</p>
              <p className="text-center text-sm">(where d = diameter)</p>
            </div>

            <div className="p-4">
              <h3 className="text-xl font-bold text-center mb-2">ARC LENGTH</h3>
              <p className="text-center">l = (x·C)/360</p>
              <p className="text-center text-sm mt-2">
                (where C = circumference
                <br />
                and x = degree of arc)
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
