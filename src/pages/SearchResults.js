import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from '../api/axiosConfig';
import CarCard from '../components/CarCard';

const SearchResults = () => {
    const [searchParams] = useSearchParams();
    const keyword = searchParams.get('keyword');
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (keyword) {
            const fetchResults = async () => {
                try {
                    const response = await axios.get(`/cars/search?keyword=${keyword}`);
                    setCars(response.data);
                } catch (error) {
                    console.error('Search error:', error);
                } finally {
                    setLoading(false);
                }
            };
            fetchResults();
        } else {
            setLoading(false);
        }
    }, [keyword]);

    if (loading) return <div>Searching...</div>;

    return (
        <div>
            <h2>Results for "{keyword}"</h2>
            {cars.length === 0 ? (
                <p>No cars found.</p>
            ) : (
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                    {cars.map(car => <CarCard key={car.id} car={car} />)}
                </div>
            )}
        </div>
    );
};

export default SearchResults;