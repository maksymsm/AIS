import React, { useState } from 'react';
import axios from 'axios';
import { Flex, Layout } from 'antd';
import Table from "./components/Table";
import AddProduct from "./components/AddProduct";

const {Sider, Content } = Layout;

const siderStyle = {
  textAlign: 'center',
  lineHeight: '120px',
  color: '#fff',
  backgroundColor: '#1677ff',
  margin: '20px',
};

const layoutStyle = {
  borderRadius: 8,
  overflow: 'hidden',
  width: 'calc(100% - 50px)',
  maxWidth: 'calc(100% - 50px)',
  margin: '100px 200px',
};

function App() {
  const [response, setResponse] = useState(null);

  const handleGenerateBarcode = async () => {
    try {
        // Make a POST request to the server to generate a
      // const res = await axios.post('/api/generate', { data: '26' });
      // const data = await res.json();

      // Update the state with the response data
      // setResponse(data);
    } catch (error) {
      console.error('Error generating barcode:', error);
      setResponse({ error: 'Failed to generate barcode' });
    }
  };

  return (
      // <div>
      //   <h1>Barcode Generator</h1>
      //   <button onClick={handleGenerateBarcode}>Generate Barcode</button>
      //
      //   {/* Section to display the response */}
      //   <section>
      //     <h2>Response:</h2>
      //     {response ? (
      //         <pre>{JSON.stringify(response, null, 2)}</pre>
      //     ) : (
      //         <p>No response yet. Click the button to generate a barcode.</p>
      //     )}
      //   </section>
      //   <Table />
      // </div>
      <Flex gap="middle" wrap margin='50px'>
        <Layout style={layoutStyle}>
          <Sider width="25%" style={siderStyle}>
            Search by barcode
          </Sider>
          <Content>
            <AddProduct />
            <Table />
          </Content>
        </Layout>
      </Flex>
  );
}

export default App;
