import React, {useState} from 'react';
import { Button, Modal, Input } from 'antd';

const AddProduct = () => {
    const [visible, setVisible] = useState(false);
    const [name, setName] = useState('');
    const [code, setCode] = useState('');
    const [price, setPrice] = useState('');

    return (
        <>
            <Button type="primary" onClick={() => setVisible(true)} loading={false}>
                Add new product
            </Button>
            <Modal
                open={visible}
                title="Add new item"
                onOk={() => setVisible(false)}
                onCancel={() => setVisible(false)}
                okText={'Add'}
                cancelText={'Cancel'}
                width={500}
            >
                <Input placeholder="Product name" value={name} onChange={(val) => setName(val.target.value)} required />
                <Input placeholder="Product code" value={code} onChange={(val) => setCode(val.target.value)} required />
                <Input placeholder="Product price" value={price} onChange={(val) => setPrice(val.target.value)} required />
            </Modal>
        </>
    );
}

export default AddProduct;