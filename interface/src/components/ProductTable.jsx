import React, { useState } from 'react';
import { Table as AntdTable, Modal, Button, Input } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { getImage, updateProduct, deleteProduct } from '../api/apiService';

const ProductTable = ({ products, updateList }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [barcodeImage, setBarcodeImage] = useState(null);
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');

    const handleEdit = async (product) => {
        setSelectedProduct(product);
        setName(product.name);
        setPrice(product.price);
        setIsModalVisible(true);
        try {
            const imageBlob = await getImage(product.barcode);
            const imageObjectURL = URL.createObjectURL(imageBlob);
            setBarcodeImage(imageObjectURL);
        } catch (error) {
            console.error('Error fetching barcode image:', error);
        }
    };

    const handleSave = async () => {
        try {
            await updateProduct(selectedProduct.id, { name, price });
            setIsModalVisible(false);
            await updateList();
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };

    const handleDelete = async (productId) => {
        try {
            await deleteProduct(productId);
            await updateList();
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    const columns = [
        { title: 'Name', dataIndex: 'name', key: 'name' },
        { title: 'Code', dataIndex: 'code', key: 'code' },
        { title: 'Price', dataIndex: 'price', key: 'price' },
        {
            title: 'Edit',
            width: 100,
            key: 'edit',
            render: (text, record) => (
                <EditOutlined onClick={() => handleEdit(record)} style={{ cursor: 'pointer' }} />
            ),
        },
        {
            title: 'Delete',
            width: 100,
            key: 'delete',
            render: (text, record) => (
                <DeleteOutlined onClick={() => handleDelete(record.id)} style={{ cursor: 'pointer' }} />
            ),
        },
    ];

    return (
        <>
            <AntdTable columns={columns} dataSource={products} style={{ marginTop: 20 }} />
            <Modal
                title="Edit Product"
                visible={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                footer={[
                    <Button key="cancel" onClick={() => setIsModalVisible(false)}>Cancel</Button>,
                    <Button key="save" type="primary" onClick={handleSave}>Save</Button>,
                ]}
            >
                {selectedProduct && (
                    <div>
                        <Input
                            placeholder="Product name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            style={{ margin: '10px 0' }}
                        />
                        <Input
                            placeholder="Product code"
                            value={selectedProduct.code}
                            disabled
                            style={{ margin: '10px 0' }}
                        />
                        <Input
                            placeholder="Product price"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            style={{ margin: '10px 0' }}
                        />
                        {barcodeImage && <img src={barcodeImage} alt="Barcode" style={{ width: 400 }} />}
                    </div>
                )}
            </Modal>
        </>
    );
};

export default ProductTable;