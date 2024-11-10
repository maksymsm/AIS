import axios from 'axios';

const API_URL = 'http://127.0.0.1:5000/api/products';
const IMAGE_URL = 'http://127.0.0.1:5000/api/image';
const PARSE_URL = 'http://127.0.0.1:5000/api/parse_barcode';

export const getProducts = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
};

export const addProduct = async (product) => {
    try {
        const response = await axios.post(API_URL, product);
        return response.data;
    } catch (error) {
        console.error('Error adding product:', error);
        throw error;
    }
};

export const getProductById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching product with id ${id}:`, error);
        throw error;
    }
};

export const getImage = async (filename) => {
    try {
        const response = await axios.get(`${IMAGE_URL}/${filename}`, { responseType: 'blob' });
        return response.data;
    } catch (error) {
        console.error(`Error fetching image with filename ${filename}:`, error);
        throw error;
    }
};

export const parseBarcode = async (file) => {
    try {
        const formData = new FormData();
        formData.append('file', file);
        const response = await axios.post(PARSE_URL, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error parsing barcode:', error);
        throw error;
    }
};

export const deleteProduct = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error deleting product with id ${id}:`, error);
        throw error;
    }
};

export const updateProduct = async (id, product) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, product);
        return response.data;
    } catch (error) {
        console.error(`Error updating product with id ${id}:`, error);
        throw error;
    }
};