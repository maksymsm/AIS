import React, { useState } from 'react';
import { Table as AntdTable } from 'antd';

const ProductTable = ({ products }) => {
    const columns = [
        { title: 'Name', dataIndex: 'name', key: 'name' },
        { title: 'Code', dataIndex: 'code', key: 'code' },
        { title: 'Price', dataIndex: 'price', key: 'price' },
        { title: 'Barcode', dataIndex: 'image', key: 'image', render: (text) => <img src={text} alt="barcode" style={{ width: 50 }} /> },
    ];

    return <AntdTable columns={columns} dataSource={products} style={{ marginTop: 20 }} />;
};

export default ProductTable;