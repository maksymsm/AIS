import React, { useState } from 'react';
import { Layout } from 'antd';
import ProductTable from './components/ProductTable';
import UploadBarcode from './components/UploadBarcode';
import AddProduct from './components/AddProduct';

const { Content } = Layout;

const App = () => {
  const [products, setProducts] = useState([
    { key: '1', name: 'Iphone 16', code: '26', price: '$999.00', image: './barcode.png' },
    { key: '2', name: 'Samsung 10', code: 'KM1', price: '$799.00', image: '../../../barcode.png' },
  ]);

  return (
      <Layout className="layout">
        <Content style={{ padding: '0 50px' }}>
          <div className="site-layout-content" style={{ padding: 24, minHeight: 280 }}>
            <AddProduct setProducts={setProducts}/>
            <UploadBarcode setProducts={setProducts} />
            <ProductTable products={products} />
          </div>
        </Content>
      </Layout>
  );
};

export default App;