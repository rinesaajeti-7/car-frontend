import React, { useState, useEffect } from 'react';
import axios from '../api/axiosConfig';
import CarCard from '../components/CarCard';
import SearchBar from '../components/SearchBar';

const Home = () => {
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchCars();
    }, []);

    const fetchCars = async () => {
        try {
            const response = await axios.get('/cars');
            setCars(response.data);
        } catch (error) {
            console.error('Error fetching cars:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div>
            <SearchBar />
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                {cars.map(car => (
                    <CarCard key={car.id} car={car} />
                ))}
            </div>
        </div>
    );
};

export default Home;