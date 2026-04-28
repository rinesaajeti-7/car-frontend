import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './SearchBar.module.css';

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
        <form className={styles.searchForm} onSubmit={handleSubmit}>
            <div className={styles.inputWrapper}>
                <input
                    type="text"
                    className={styles.searchInput}
                    placeholder="Search by make or model..."
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                />
                <button type="submit" className={styles.searchButton}>
                    🔍 Search
                </button>
            </div>
        </form>
    );
};

export default SearchBar;