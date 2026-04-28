import React, { useState, useEffect } from 'react';
import axios from '../api/axiosConfig';
import styles from './AdminDashboard.module.css';

const AdminDashboard = () => {
    const [cars, setCars] = useState([]);
    const [formData, setFormData] = useState({
        make: '',        // ✅ use 'make' (backend field name)
        model: '',
        year: '',
        price: '',
        mileage: '',
        fuelType: '',
        imageUrl: '',
        description: ''
    });
    const [editingId, setEditingId] = useState(null);
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

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = {
                ...formData,
                year: Number(formData.year),
                price: Number(formData.price),
                mileage: Number(formData.mileage)
            };

            if (editingId) {
                await axios.put(`/cars/${editingId}`, payload);
                alert('Car updated successfully');
            } else {
                await axios.post('/cars', payload);
                alert('Car added successfully');
            }
            resetForm();
            fetchCars();
        } catch (error) {
            console.error('Error saving car:', error);
            if (error.response) {
                console.error('Response data:', error.response.data);
                alert(`Error: ${JSON.stringify(error.response.data)}`);
            } else {
                alert('Error saving car');
            }
        }
    };

    const resetForm = () => {
        setFormData({
            make: '',
            model: '',
            year: '',
            price: '',
            mileage: '',
            fuelType: '',
            imageUrl: '',
            description: ''
        });
        setEditingId(null);
    };

    const handleEdit = (car) => {
        setEditingId(car.id);
        setFormData({
            make: car.make,
            model: car.model,
            year: car.year,
            price: car.price,
            mileage: car.mileage,
            fuelType: car.fuelType,
            imageUrl: car.imageUrl || '',
            description: car.description || ''
        });
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this car?')) {
            try {
                await axios.delete(`/cars/${id}`);
                fetchCars();
            } catch (error) {
                console.error('Error deleting car:', error);
            }
        }
    };

    if (loading) return <div className={styles.loadingContainer}>Loading...</div>;

    return (
        <div className={styles.adminDashboard}>
            <div className={styles.header}>
                <h1>Admin Dashboard</h1>
                <p>Manage your car inventory</p>
            </div>

            <div className={styles.formContainer}>
                <div className={styles.formCard}>
                    <h3>{editingId ? 'Edit Car' : 'Add New Car'}</h3>
                    <form onSubmit={handleSubmit}>
                        <div className={styles.formGrid}>
                            <input name="make" placeholder="Make *" value={formData.make} onChange={handleChange} required />
                            <input name="model" placeholder="Model *" value={formData.model} onChange={handleChange} required />
                            <input name="year" placeholder="Year *" type="number" value={formData.year} onChange={handleChange} required />
                            <input name="price" placeholder="Price ($) *" type="number" step="0.01" value={formData.price} onChange={handleChange} required />
                            <input name="mileage" placeholder="Mileage (km) *" type="number" value={formData.mileage} onChange={handleChange} required />
                            <input name="fuelType" placeholder="Fuel Type *" value={formData.fuelType} onChange={handleChange} required />
                            <input name="imageUrl" placeholder="Image URL" value={formData.imageUrl} onChange={handleChange} />
                            <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} rows="3" />
                        </div>
                        <div className={styles.formActions}>
                            <button type="submit" className={styles.submitBtn}>{editingId ? 'Update' : 'Add'}</button>
                            {editingId && <button type="button" onClick={resetForm} className={styles.cancelBtn}>Cancel</button>}
                        </div>
                    </form>
                </div>
            </div>

            <div className={styles.tableContainer}>
                <h3>Current Inventory</h3>
                <div className={styles.tableWrapper}>
                    <table className={styles.carTable}>
                        <thead>
                        <tr>
                            <th>ID</th><th>Make</th><th>Model</th><th>Year</th><th>Price</th><th>Fuel</th><th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {cars.map(car => (
                            <tr key={car.id}>
                                <td>{car.id}</td>
                                <td>{car.make}</td>
                                <td>{car.model}</td>
                                <td>{car.year}</td>
                                <td>${Number(car.price).toLocaleString()}</td>
                                <td>{car.fuelType}</td>
                                <td className={styles.actions}>
                                    <button onClick={() => handleEdit(car)} className={styles.editBtn}>Edit</button>
                                    <button onClick={() => handleDelete(car.id)} className={styles.deleteBtn}>Delete</button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;