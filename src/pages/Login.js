import React, { useState } from 'react';
import axios from '../api/axiosConfig';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await axios.post('/auth/login', { email, password });
            const { token } = response.data;

            // Ruaj token-in në localStorage
            localStorage.setItem('token', token);

            // Dekodo token-in për të marrë rolin
            const decoded = jwtDecode(token);
            const userRole = decoded.role; // sigurohu që backend-i e dërgon 'role' në token

            // Ridrejto bazuar në rolin e përdoruesit
            if (userRole === 'ADMIN') {
                navigate('/admin');
            } else {
                navigate('/dashboard'); // ose ndonjë rrugë tjetër për përdoruesit e zakonshëm
            }
        } catch (err) {
            if (err.response && err.response.status === 401) {
                setError('Email ose fjalëkalimi është i gabuar.');
            } else if (err.response && err.response.data && err.response.data.message) {
                setError(err.response.data.message);
            } else {
                setError('Ndodhi një gabim. Ju lutemi provoni përsëri.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
            <h2 style={{ textAlign: 'center' }}>Login</h2>
            {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    style={{ width: '100%', padding: '8px', margin: '5px 0', borderRadius: '4px', border: '1px solid #ccc' }}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    style={{ width: '100%', padding: '8px', margin: '5px 0', borderRadius: '4px', border: '1px solid #ccc' }}
                />
                <button
                    type="submit"
                    disabled={loading}
                    style={{
                        width: '100%',
                        padding: '10px',
                        marginTop: '10px',
                        backgroundColor: loading ? '#ccc' : '#007bff',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: loading ? 'not-allowed' : 'pointer'
                    }}
                >
                    {loading ? 'Duke u identifikuar...' : 'Login'}
                </button>
            </form>
            <p style={{ textAlign: 'center', marginTop: '15px' }}>
                Nuk ke llogari? <a href="/register">Regjistrohu këtu</a>
            </p>
        </div>
    );
};

export default Login;