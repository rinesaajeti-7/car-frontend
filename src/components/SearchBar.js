import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
    const [keyword, setKeyword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (keyword.trim()) {
            navigate(`/search?keyword=${encodeURIComponent(keyword)}`);
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ margin: '20px', display: 'flex', justifyContent: 'center' }}>
            <input
                type="text"
                placeholder="Search by make or model..."
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                style={{ width: '300px', padding: '10px', fontSize: '16px' }}
            />
            <button type="submit" style={{ padding: '10px', marginLeft: '10px' }}>Search</button>
        </form>
    );
};

export default SearchBar;