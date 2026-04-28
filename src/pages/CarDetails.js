import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../api/axiosConfig';
import styles from './CarDetails.module.css';

const CarDetails = () => {
    const { id } = useParams();
    const [car, setCar] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCar = async () => {
            try {
                setError(null);
                const response = await axios.get(`/cars/${id}`);
                setCar(response.data);
            } catch (err) {
                console.error('Error fetching car details:', err);
                setError('Failed to load car details. Please try again later.');
            } finally {
                setLoading(false);
            }
        };
        fetchCar();
    }, [id]);

    if (loading) {
        return (
            <div className={styles.loadingContainer}>
                <div className={styles.spinner}></div>
                <p>Loading car details...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className={styles.errorContainer}>
                <p>{error}</p>
                <button onClick={() => window.location.reload()} className={styles.retryButton}>
                    Retry
                </button>
            </div>
        );
    }

    if (!car) {
        return (
            <div className={styles.notFound}>
                <p>Car not found</p>
            </div>
        );
    }

    return (
        <div className={styles.carDetails}>
            <div className={styles.container}>
                <div className={styles.imageSection}>
                    <img
                        src={car.imageUrl || 'https://via.placeholder.com/800x500?text=No+Image'}
                        alt={`${car.make} ${car.model}`}
                        className={styles.carImage}
                    />
                </div>

                <div className={styles.detailsSection}>
                    <h1 className={styles.title}>{car.make} {car.model}</h1>

                    <div className={styles.priceTag}>
                        ${car.price?.toLocaleString()}
                    </div>

                    <div className={styles.specsGrid}>
                        <div className={styles.specCard}>
                            <span className={styles.specLabel}>Year</span>
                            <span className={styles.specValue}>{car.year}</span>
                        </div>
                        <div className={styles.specCard}>
                            <span className={styles.specLabel}>Mileage</span>
                            <span className={styles.specValue}>{car.mileage?.toLocaleString()} km</span>
                        </div>
                        <div className={styles.specCard}>
                            <span className={styles.specLabel}>Fuel Type</span>
                            <span className={styles.specValue}>{car.fuelType}</span>
                        </div>
                    </div>

                    <div className={styles.description}>
                        <h3>Description</h3>
                        <p>{car.description || 'No description available.'}</p>
                    </div>

                    <button
                        className={styles.backButton}
                        onClick={() => window.history.back()}
                    >
                        ← Back to Cars
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CarDetails;