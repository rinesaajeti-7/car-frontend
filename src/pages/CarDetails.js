import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../api/axiosConfig';

const CarDetails = () => {
    const { id } = useParams();
    const [car, setCar] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCar = async () => {
            try {
                const response = await axios.get(`/cars/${id}`);
                setCar(response.data);
            } catch (error) {
                console.error('Error fetching car details:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchCar();
    }, [id]);

    if (loading) return <div>Loading...</div>;
    if (!car) return <div>Car not found</div>;

    return (
        <div style={{ padding: '20px' }}>
            <h1>{car.make} {car.model}</h1>
            <img src={car.imageUrl || 'https://via.placeholder.com/800x400'} alt={car.model} style={{ width: '100%', maxWidth: '600px' }} />
            <p><strong>Year:</strong> {car.year}</p>
            <p><strong>Price:</strong> ${car.price.toLocaleString()}</p>
            <p><strong>Mileage:</strong> {car.mileage} km</p>
            <p><strong>Fuel Type:</strong> {car.fuelType}</p>
            <p><strong>Description:</strong> {car.description}</p>
        </div>
    );
};

export default CarDetails;