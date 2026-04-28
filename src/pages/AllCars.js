import React, { useState, useEffect } from 'react';
import axios from '../api/axiosConfig';
import CarCard from '../components/CarCard';
import styles from './AllCars.module.css';

const AllCars = () => {
    const [allCars, setAllCars] = useState([]);
    const [filteredCars, setFilteredCars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedFuel, setSelectedFuel] = useState('');
    const [minYear, setMinYear] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [uniqueFuelTypes, setUniqueFuelTypes] = useState([]);

    useEffect(() => {
        fetchAllCars();
    }, []);

    const fetchAllCars = async () => {
        try {
            setError(null);
            const response = await axios.get('/cars');
            setAllCars(response.data);
            setFilteredCars(response.data);
            // Extract unique fuel types for filter
            const fuels = [...new Set(response.data.map(car => car.fuelType).filter(Boolean))];
            setUniqueFuelTypes(fuels);
        } catch (err) {
            console.error('Error fetching cars:', err);
            setError('Failed to load cars. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    // Apply filters whenever searchTerm, selectedFuel, minYear, maxPrice changes
    useEffect(() => {
        let filtered = [...allCars];

        if (searchTerm.trim() !== '') {
            const term = searchTerm.toLowerCase();
            filtered = filtered.filter(car =>
                car.make?.toLowerCase().includes(term) ||
                car.model?.toLowerCase().includes(term)
            );
        }

        if (selectedFuel) {
            filtered = filtered.filter(car => car.fuelType === selectedFuel);
        }

        if (minYear) {
            filtered = filtered.filter(car => car.year >= parseInt(minYear));
        }

        if (maxPrice) {
            filtered = filtered.filter(car => car.price <= parseFloat(maxPrice));
        }

        setFilteredCars(filtered);
    }, [searchTerm, selectedFuel, minYear, maxPrice, allCars]);

    const clearFilters = () => {
        setSearchTerm('');
        setSelectedFuel('');
        setMinYear('');
        setMaxPrice('');
    };

    if (loading) {
        return (
            <div className={styles.loadingContainer}>
                <div className={styles.spinner}></div>
                <p>Loading all cars...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className={styles.errorContainer}>
                <p>{error}</p>
                <button onClick={fetchAllCars} className={styles.retryButton}>Retry</button>
            </div>
        );
    }

    return (
        <div className={styles.allCarsPage}>
            <div className={styles.header}>
                <h1>All Cars</h1>
                <p>Browse our complete collection of premium vehicles</p>
            </div>

            <div className={styles.filterBar}>
                <div className={styles.searchInput}>
                    <input
                        type="text"
                        placeholder="Search by make or model..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className={styles.filters}>
                    <select value={selectedFuel} onChange={(e) => setSelectedFuel(e.target.value)}>
                        <option value="">All Fuel Types</option>
                        {uniqueFuelTypes.map(fuel => (
                            <option key={fuel} value={fuel}>{fuel}</option>
                        ))}
                    </select>
                    <input
                        type="number"
                        placeholder="Min Year"
                        value={minYear}
                        onChange={(e) => setMinYear(e.target.value)}
                    />
                    <input
                        type="number"
                        placeholder="Max Price (€)"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value)}
                    />
                    <button onClick={clearFilters} className={styles.clearBtn}>Clear Filters</button>
                </div>
            </div>

            <div className={styles.resultsInfo}>
                <p>Found {filteredCars.length} car{filteredCars.length !== 1 ? 's' : ''}</p>
            </div>

            <div className={styles.carsGrid}>
                {filteredCars.length > 0 ? (
                    filteredCars.map(car => <CarCard key={car.id} car={car} />)
                ) : (
                    <div className={styles.noResults}>
                        <p>No cars match your filters. Try adjusting your search.</p>
                        <button onClick={clearFilters} className={styles.resetBtn}>Clear all filters</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AllCars;