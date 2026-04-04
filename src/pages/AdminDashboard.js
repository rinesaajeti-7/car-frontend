import React, { useState, useEffect } from 'react';
import axios from '../api/axiosConfig';

const AdminDashboard = () => {
    const [cars, setCars] = useState([]);
    const [formData, setFormData] = useState({
        make: '',        // ✅ changed from 'brand' to 'make'
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
            // Convert numeric fields to numbers
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
            alert('Error saving car');
        }
    };

    const resetForm = () => {
        setFormData({
            make: '',      // ✅ consistent
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
            make: car.make || car.brand, // fallback in case backend sends "brand"
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

    if (loading) return <div>Loading...</div>;

    return (
        <div style={{ padding: '20px' }}>
            <h1>Admin Dashboard</h1>
            <form onSubmit={handleSubmit} style={{ marginBottom: '20px', border: '1px solid #ccc', padding: '15px', borderRadius: '5px' }}>
                <h3>{editingId ? 'Edit Car' : 'Add New Car'}</h3>
                <input name="make" placeholder="Make" value={formData.make} onChange={handleChange} required />
                <input name="model" placeholder="Model" value={formData.model} onChange={handleChange} required />
                <input name="year" placeholder="Year" type="number" value={formData.year} onChange={handleChange} required />
                <input name="price" placeholder="Price" type="number" step="0.01" value={formData.price} onChange={handleChange} required />
                <input name="mileage" placeholder="Mileage" type="number" value={formData.mileage} onChange={handleChange} required />
                <input name="fuelType" placeholder="Fuel Type" value={formData.fuelType} onChange={handleChange} required />
                <input name="imageUrl" placeholder="Image URL" value={formData.imageUrl} onChange={handleChange} />
                <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} rows="3" />
                <button type="submit">{editingId ? 'Update' : 'Add'}</button>
                {editingId && <button type="button" onClick={resetForm}>Cancel</button>}
            </form>

            <table border="1" cellPadding="8" style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                <tr>
                    <th>ID</th><th>Make</th><th>Model</th><th>Year</th><th>Price</th><th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {cars.map(car => (
                    <tr key={car.id}>
                        <td>{car.id}</td>
                        <td>{car.make}</td>
                        <td>{car.model}</td>
                        <td>{car.year}</td>
                        <td>${car.price}</td>
                        <td>
                            <button onClick={() => handleEdit(car)}>Edit</button>
                            <button onClick={() => handleDelete(car.id)}>Delete</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminDashboard;