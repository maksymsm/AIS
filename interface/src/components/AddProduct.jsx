import React, { useState } from 'react';
import { Modal, Input, Button } from 'antd';
import { addProduct } from '../api/apiService';

const AddProduct = ({ updateList }) => {
    const [visible, setVisible] = useState(false);
    const [name, setName] = useState('');
    const [code, setCode] = useState('');
    const [price, setPrice] = useState('');
    const [codeError, setCodeError] = useState('');

    const handleAddProduct = async () => {
        if (code.length !== 4) {
            setCodeError('Product code must be exactly 4 characters long.');
            return;
        }

        const newProduct = { name, code, price };

        try {
            await addProduct(newProduct);
            setVisible(false);
            setName('');
            setCode('');
            setPrice('');
            setCodeError('');
            await updateList();
        } catch (error) {
            console.error('Error adding product:', error);
        }
    };

    const handleCodeChange = (e) => {
        const value = e.target.value.toUpperCase();
        const regex = /^[0-9KLMO]*$/;
        if (regex.test(value)) {
            setCode(value);
            if (value.length === 4) {
                setCodeError('');
            }
        }
    };

    return (
        <>
            <Button type="primary" onClick={() => setVisible(true)}>Add new product</Button>
            <Modal
                visible={visible}
                title="Add new item"
                onOk={handleAddProduct}
                onCancel={() => setVisible(false)}
                okText="Add"
                cancelText="Cancel"
            >
                <Input
                    placeholder="Product name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    style={{ margin: '10px 0' }}
                />
                <Input
                    placeholder="Product code"
                    value={code}
                    onChange={handleCodeChange}
                    required
                    style={{ margin: '10px 0', borderColor: codeError ? 'red' : undefined }}
                />
                {codeError && <div style={{ color: 'red', marginBottom: '10px' }}>{codeError}</div>}
                <Input
                    placeholder="Product price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                    style={{ margin: '10px 0' }}
                />
            </Modal>
        </>
    );
};

export default AddProduct;