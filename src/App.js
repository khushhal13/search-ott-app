// App.js
import React, { useState } from 'react';
import axios from 'axios';
import SearchResults from './SearchResults';
import './App.css';

function App() {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [error, setError] = useState(null);

    const handleSearch = async () => {
        try {
            const options = {
                method: 'GET',
                url: 'https://streaming-availability.p.rapidapi.com/search/title',
                params: {
                    title: searchTerm,
                    country: 'us',
                    show_type: 'all',
                    output_language: 'en'
                },
                headers: {
                    'X-RapidAPI-Key': 'f1c8b787c7msh7cdea8ef19142b3p10dd68jsn83ac75348439',
                    'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com'
                }
            };

            const response = await axios.request(options);
            setSearchResults(response.data.result);
            setError(null);
        } catch (error) {
            console.error('Error fetching search results:', error);
            setSearchResults([]);
            setError('An error occurred while fetching search results.');
        }
    };

    return (
        <div className="search-container">
            <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Enter movie name.."
            />
            <button onClick={handleSearch}>Search</button>
            {error && <p>{error}</p>}
            <SearchResults searchResults={searchResults} />
        </div>
    );
}

export default App;
