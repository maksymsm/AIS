import React, { useState, useEffect } from 'react';
import { Layout } from 'antd';
import ProductTable from './components/ProductTable';
import UploadBarcode from './components/UploadBarcode';
import AddProduct from './components/AddProduct';
import { getProducts } from './api/apiService';
import NewsSearchPage from "./components/Search";

const { Content } = Layout;

const App = () => {
    const [products, setProducts] = useState([]);
    const fetchProducts = async () => {
        try {
            const data = await getProducts();
            setProducts(data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <Layout className="layout">
            <Content style={{ padding: '0 50px', height: '100vh' }}>
                <div className="site-layout-content" style={{ padding: 24, minHeight: 280 }}>
                    <AddProduct updateList={fetchProducts} />
                    <UploadBarcode products={products} />
                    <ProductTable products={products} updateList={fetchProducts} />
                </div>
            </Content>
        </Layout>
    );
};

const SearchApp = () => {
    return (
        <Layout className="layout">
            <Content style={{ padding: '0 50px', height: '100vh' }}>
                <div className="site-layout-content" style={{ padding: 24, minHeight: 280 }}>
                    <NewsSearchPage />
                </div>
            </Content>
        </Layout>
    );
};

export default SearchApp;