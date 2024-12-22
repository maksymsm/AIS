import React, { useState, useEffect } from 'react';
import { Input, List, Card, DatePicker } from 'antd';
import axios from 'axios';

const API_SEARCH_URL = 'http://127.0.0.1:5000/api/search';

// The search function provided
export const search_news = async (query) => {
    try {
        const response = await axios.post(API_SEARCH_URL, query);
        return response.data;
    } catch (error) {
        console.error('Error fetching news:', error);
        throw error;
    }
};

// Custom debounce function
const debounce = (func, delay) => {
    let timer;
    return (...args) => {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
            func(...args);
        }, delay);
    };
};

const NewsSearchPage = () => {
    const [query, setQuery] = useState('');
    const [location, handleLocation] = useState('');
    const [newsList, setNewsList] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchNews = async (searchQuery) => {
        if (!searchQuery) {
            setNewsList([]);
            return;
        }
        setLoading(true);
        try {
            const data = await search_news({ query: searchQuery, location, date });
            setNewsList(data);
        } catch (error) {
            console.error('Error fetching news:', error);
        } finally {
            setLoading(false);
        }
    };

    // Debounced version of the fetchNews function
    const debouncedFetchNews = debounce(fetchNews, 500);

    useEffect(() => {
        return () => {
            // Cleanup debounce on unmount
            debouncedFetchNews.cancel?.();
        };
    }, [debouncedFetchNews]);

    const handleSearch = (e) => {
        const value = e.target.value;
        setQuery(value);
        debouncedFetchNews(value);
    };

    const [date, setDate] = useState(null);

    const handleChange = (value) => {
        setDate(value);
    };
    return (
        <div style={{padding: '20px'}}>
            <div style={{ display: "flex", flexDirection: "row"}}>
                <div style={{ marginRight: '30px'}}>
                    <h2>Location</h2>
                    <Input
                        placeholder="Enter location"
                        value={location}
                        onChange={(e) => handleLocation(e.target.value)}
                        style={{marginBottom: '20px', width: '200px'}}
                    />
                </div>
                <div>
                    <h2>Time</h2>
                    <DatePicker onChange={handleChange} value={date} style={{marginBottom: '20px', width: '200px'}}/>
                </div>
            </div>
            <h1>Search News</h1>
            <Input
                placeholder="Enter search query..."
                value={query}
                onChange={handleSearch}
                style={{marginBottom: '20px', width: '100%'}}
            />
            <List
                loading={loading}
                dataSource={newsList}
                renderItem={(newsItem) => (
                    <List.Item>
                        <Card
                            title={newsItem.title}
                            extra={<span>{newsItem.date}</span>}
                            style={{width: '100%'}}
                        >
                            <p><strong>Category:</strong> {newsItem.category}</p>
                            <p><strong>Location:</strong> {newsItem.location}</p>
                            <p><strong>Summary:</strong> {newsItem.summary}</p>
                        </Card>
                    </List.Item>
                )}
            />
        </div>
    );
};

export default NewsSearchPage;
