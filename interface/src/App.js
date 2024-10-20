import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [response, setResponse] = useState(null);

  const handleGenerateBarcode = async () => {
    try {
        // Make a POST request to the server to generate a
      const res = await axios.post('/api/generate', { data: '26' });
      const data = await res.json();

      // Update the state with the response data
      setResponse(data);
    } catch (error) {
      console.error('Error generating barcode:', error);
      setResponse({ error: 'Failed to generate barcode' });
    }
  };

  return (
      <div>
        <h1>Barcode Generator</h1>
        <button onClick={handleGenerateBarcode}>Generate Barcode</button>

        {/* Section to display the response */}
        <section>
          <h2>Response:</h2>
          {response ? (
              <pre>{JSON.stringify(response, null, 2)}</pre>
          ) : (
              <p>No response yet. Click the button to generate a barcode.</p>
          )}
        </section>
      </div>
  );
}

export default App;
