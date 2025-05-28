export default function ExperimentPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">German Language Learning Guide</h1>
      
      {/* Basic Vocabulary Section */}
      <div className="p-6 border rounded-lg bg-gray-100 mb-6">
        <h2 className="text-2xl font-semibold mb-4">Basic Vocabulary</h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-medium">Common Greetings</h3>
            <ul className="list-disc pl-6">
              <li>Hallo - Hello</li>
              <li>Guten Morgen - Good morning</li>
              <li>Guten Tag - Good day</li>
              <li>Auf Wiedersehen - Goodbye</li>
              <li>Danke - Thank you</li>
              <li>Bitte - Please/You're welcome</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Grammar Basics Section */}
      <div className="p-6 border rounded-lg bg-gray-100 mb-6">
        <h2 className="text-2xl font-semibold mb-4">Grammar Basics</h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-medium">Basic Sentence Structure</h3>
            <p className="text-gray-600">German follows a Subject-Verb-Object (SVO) structure, but word order can change based on emphasis and context.</p>
            <ul className="list-disc pl-6 mt-2">
              <li>Ich esse einen Apfel. (I eat an apple)</li>
              <li>Der Hund schläft. (The dog sleeps)</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Cases Section */}
      <div className="p-6 border rounded-lg bg-gray-100 mb-6">
        <h2 className="text-2xl font-semibold mb-4">Cases</h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-medium">The Four Cases</h3>
            <ul className="list-disc pl-6">
              <li>Nominative: Subject of the sentence</li>
              <li>Accusative: Direct object</li>
              <li>Dative: Indirect object</li>
              <li>Genitive: Possession</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Articles Section */}
      <div className="p-6 border rounded-lg bg-gray-100 mb-6">
        <h2 className="text-2xl font-semibold mb-4">Articles</h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-medium">Definite Articles</h3>
            <p className="text-gray-600">der (masculine), die (feminine), das (neuter), die (plural)</p>
            <h3 className="font-medium mt-4">Indefinite Articles</h3>
            <p className="text-gray-600">ein (masculine/neuter), eine (feminine)</p>
          </div>
        </div>
      </div>

      {/* Numbers Section */}
      <div className="p-6 border rounded-lg bg-gray-100 mb-6">
        <h2 className="text-2xl font-semibold mb-4">Numbers</h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-medium">Basic Numbers</h3>
            <ul className="list-disc pl-6">
              <li>eins (1), zwei (2), drei (3)</li>
              <li>zehn (10), zwanzig (20), dreißig (30)</li>
              <li>hundert (100), tausend (1000)</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Time and Calendar Section */}
      <div className="p-6 border rounded-lg bg-gray-100 mb-6">
        <h2 className="text-2xl font-semibold mb-4">Time and Calendar</h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-medium">Days of the Week</h3>
            <p className="text-gray-600">Montag, Dienstag, Mittwoch, Donnerstag, Freitag, Samstag, Sonntag</p>
            <h3 className="font-medium mt-4">Months</h3>
            <p className="text-gray-600">Januar, Februar, März, April, Mai, Juni, Juli, August, September, Oktober, November, Dezember</p>
          </div>
        </div>
      </div>

      {/* Colors Section */}
      <div className="p-6 border rounded-lg bg-gray-100 mb-6">
        <h2 className="text-2xl font-semibold mb-4">Colors</h2>
        <div className="space-y-4">
          <div>
            <ul className="list-disc pl-6">
              <li>rot (red)</li>
              <li>blau (blue)</li>
              <li>gelb (yellow)</li>
              <li>grün (green)</li>
              <li>schwarz (black)</li>
              <li>weiß (white)</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Family Members Section */}
      <div className="p-6 border rounded-lg bg-gray-100 mb-6">
        <h2 className="text-2xl font-semibold mb-4">Family Members</h2>
        <div className="space-y-4">
          <div>
            <ul className="list-disc pl-6">
              <li>die Mutter (mother)</li>
              <li>der Vater (father)</li>
              <li>die Schwester (sister)</li>
              <li>der Bruder (brother)</li>
              <li>die Großmutter (grandmother)</li>
              <li>der Großvater (grandfather)</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Food and Drink Section */}
      <div className="p-6 border rounded-lg bg-gray-100 mb-6">
        <h2 className="text-2xl font-semibold mb-4">Food and Drink</h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-medium">Common Foods</h3>
            <ul className="list-disc pl-6">
              <li>das Brot (bread)</li>
              <li>der Käse (cheese)</li>
              <li>das Wasser (water)</li>
              <li>der Kaffee (coffee)</li>
              <li>das Bier (beer)</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Weather Section */}
      <div className="p-6 border rounded-lg bg-gray-100 mb-6">
        <h2 className="text-2xl font-semibold mb-4">Weather</h2>
        <div className="space-y-4">
          <div>
            <ul className="list-disc pl-6">
              <li>Es regnet. (It's raining)</li>
              <li>Es schneit. (It's snowing)</li>
              <li>Es ist sonnig. (It's sunny)</li>
              <li>Es ist bewölkt. (It's cloudy)</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Emergency Phrases Section */}
      <div className="p-6 border rounded-lg bg-gray-100 mb-6">
        <h2 className="text-2xl font-semibold mb-4">Emergency Phrases</h2>
        <div className="space-y-4">
          <div>
            <ul className="list-disc pl-6">
              <li>Hilfe! (Help!)</li>
              <li>Rufen Sie einen Arzt! (Call a doctor!)</li>
              <li>Rufen Sie die Polizei! (Call the police!)</li>
              <li>Wo ist das nächste Krankenhaus? (Where is the nearest hospital?)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
