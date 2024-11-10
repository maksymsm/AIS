import React, { useState } from 'react';
import { Upload, Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';

const UploadBarcode = ({ setProducts }) => {
    const [loading, setLoading] = useState(false);

    const handleUpload = async (file) => {
        const formData = new FormData();
        formData.append('file', file);

        try {
            setLoading(true);
            const response = await axios.post('/api/upload', formData);
            setProducts(response.data);
            message.success('File uploaded successfully');
        } catch (error) {
            message.error('Failed to upload file');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Upload beforeUpload={handleUpload} showUploadList={false}>
            <Button icon={<UploadOutlined />} loading={loading}>Upload Barcode</Button>
        </Upload>
    );
};

export default UploadBarcode;