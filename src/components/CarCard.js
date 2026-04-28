import React from 'react';
import { Link } from 'react-router-dom';
import styles from './CarCard.module.css';

const CarCard = ({ car }) => {
    return (
        <div className={styles.card}>
            <div className={styles.imageWrapper}>
                <img
                    src={car.imageUrl || 'https://via.placeholder.com/400x250?text=No+Image'}
                    alt={`${car.make} ${car.model}`}
                    className={styles.image}
                />
            </div>
            <div className={styles.content}>
                <h3 className={styles.title}>{car.make} {car.model}</h3>
                <div className={styles.details}>
                    <span className={styles.year}>{car.year}</span>
                    <span className={styles.price}>${car.price?.toLocaleString()}</span>
                </div>
                <Link to={`/cars/${car.id}`} className={styles.button}>
                    View Details →
                </Link>
            </div>
        </div>
    );
};

export default CarCard;