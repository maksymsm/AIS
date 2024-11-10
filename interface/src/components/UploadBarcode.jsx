import React, { useState } from 'react';
import { Upload, Button, Modal, Input, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { parseBarcode } from '../api/apiService';

const UploadBarcode = ({ products }) => {
    const [loading, setLoading] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const handleUpload = async (file) => {
        try {
            setLoading(true);
            const {decoded_data} = await parseBarcode(file);
            const product = products.find(p => p.code === decoded_data);
            if (product) {
                setSelectedProduct(product);
                setIsModalVisible(true);
            } else {
                message.error('Product not found');
            }
        } catch (error) {
            message.error('Failed to upload and parse file');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Upload customRequest={() => {}}  beforeUpload={handleUpload} showUploadList={false}>
                <Button icon={<UploadOutlined />} loading={loading}>Upload Barcode</Button>
            </Upload>
            <Modal
                title="Product Details"
                visible={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                footer={[
                    <Button key="close" onClick={() => setIsModalVisible(false)}>Close</Button>
                ]}
            >
                {selectedProduct && (
                    <div>
                        <Input
                            placeholder="Product name"
                            value={selectedProduct.name}
                            disabled
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
                            value={selectedProduct.price}
                            disabled
                            style={{ margin: '10px 0' }}
                        />
                    </div>
                )}
            </Modal>
        </>
    );
};

export default UploadBarcode;