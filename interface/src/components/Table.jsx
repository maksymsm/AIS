import React from 'react';
import { Image, Table as AntdTable } from 'antd';

const Table = () => {
    const data = [
        {
            key: '26',
            name: 'Iphone 16',
            image: <Image src="./barcode.png" />,
            code: '26',
            price: '$999.00',
        },
        {
            key: 'KM1',
            name: 'Samsung 10',
            code: 'KM1',
            image: <Image src="../../../barcode.png" />,
            price: '$799.00',
        },
    ];
    const columns = [
        { title: 'Name', render: (row) => row.name },
        { title: 'Code', render: (row) => row.code },
        { title: 'Price', render: (row) => row.price },
        { title: 'Barcode', render: (row) => row.image },
    ];


    return (
        <AntdTable columns={columns} dataSource={data} />
    );
}

export default Table;