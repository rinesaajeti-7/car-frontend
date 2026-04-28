import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from '../api/axiosConfig';
import CarCard from '../components/CarCard';
import styles from './SearchResults.module.css';

const SearchResults = () => {
    const [searchParams] = useSearchParams();
    const keyword = searchParams.get('keyword');
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (keyword && keyword.trim()) {
            const fetchResults = async () => {
                try {
                    setError(null);
                    const response = await axios.get(`/cars/search?keyword=${encodeURIComponent(keyword)}`);
                    setCars(response.data);
                } catch (err) {
                    console.error('Search error:', err);
                    setError('Failed to load search results. Please try again.');
                } finally {
                    setLoading(false);
                }
            };
            fetchResults();
        } else {
            setLoading(false);
        }
    }, [keyword]);

    if (loading) {
        return (
            <div className={styles.loadingContainer}>
                <div className={styles.spinner}></div>
                <p>Searching for "{keyword}"...</p>
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

    return (
        <div className={styles.searchResults}>
            <div className={styles.header}>
                <h1>Search Results</h1>
                <p>
                    {cars.length === 0
                        ? `No cars found for "${keyword}"`
                        : `Found ${cars.length} car${cars.length !== 1 ? 's' : ''} matching "${keyword}"`}
                </p>
            </div>

            <div className={styles.resultsContainer}>
                {cars.length === 0 ? (
                    <div className={styles.noResults}>
                        <p>😞 No cars match your search.</p>
                        <button
                            className={styles.backButton}
                            onClick={() => window.history.back()}
                        >
                            ← Go Back
                        </button>
                    </div>
                ) : (
                    <div className={styles.carsGrid}>
                        {cars.map(car => (
                            <CarCard key={car.id} car={car} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchResults;