import axios from 'axios';

const API_SEARCH_URL = 'http://127.0.0.1:5000/api/search';

export const search_news = async (query) => {
    try {
        const response = await axios.post(API_SEARCH_URL, query);
        return response.data;
    } catch (error) {
        console.error('Error adding product:', error);
        throw error;
    }
};