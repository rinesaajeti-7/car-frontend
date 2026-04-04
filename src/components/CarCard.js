import React from 'react';
import { Link } from 'react-router-dom';

const CarCard = ({ car }) => {
    return (
        <div style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '10px', margin: '10px', width: '300px' }}>
            <img src={car.imageUrl || 'https://via.placeholder.com/300x200'} alt={car.model} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
            <h3>{car.make} {car.model}</h3>
            <p>Year: {car.year}</p>
            <p>Price: ${car.price.toLocaleString()}</p>
            <Link to={`/cars/${car.id}`}>View Details</Link>
        </div>
    );
};

export default CarCard;