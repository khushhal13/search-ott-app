import React from 'react';
import './SearchResults.css'; // Import CSS file

function SearchResults({ searchResults }) {

    // Function to remove duplicates from an array based on a specific property
    const removeDuplicates = (array, key) => {
        return array.filter((item, index, self) => 
            index === self.findIndex(obj => obj[key] === item[key])
        );
    };

    return (
        <div>
            <h2>Search Results</h2>
            {searchResults && searchResults.length > 0 ? (
                searchResults.map(result => (
                    <div key={result.id} className="search-result-card"> {/* Apply CSS class */}
                        <h3>{result.title}</h3>
                        <p><strong>Overview:</strong> {result.overview}</p>
                        <p><strong>Year:</strong> {result.year}</p>
                        <p><strong>Genres:</strong> {result.genres && result.genres.length > 0 ? result.genres.map(genre => genre.name).join(', ') : 'N/A'}</p>
                        <p><strong>Directors:</strong> {result.directors && result.directors.length > 0 ? result.directors.join(', ') : 'N/A'}</p>                        
                        <p><strong>Cast:</strong> {result.cast && result.cast.length > 0 ? result.cast.join(', ') : 'N/A'}</p>
                        <div className="streaming-services">
                            <h4>Streaming Services</h4>
                            <div className="streaming-services-list">
                                {result.streamingInfo && result.streamingInfo.us && result.streamingInfo.us.length > 0 ? (
                                    removeDuplicates(result.streamingInfo.us, 'link').map(service => (
                                        <div key={service.link} className="service-card"> {/* Apply CSS class */}
                                            <p><strong>Service:</strong> {service.service.toUpperCase()}</p>
                                            <p><strong>Streaming Type:</strong> {service.streamingType.charAt(0).toUpperCase() + service.streamingType.slice(1)}</p>                                            
                                            <p><strong>Quality:</strong> {service.quality ? service.quality.toUpperCase() : 'N/A'}</p>                                            <p><strong>Price:</strong> {service.price && service.price.formatted}</p>
                                            {/* Display audios if available */}
                                            {service.audios && service.audios.length > 0 && (
                                              <p><strong>Audios:</strong> {service.audios.map(audio => audio.language.charAt(0).toUpperCase() + audio.language.slice(1)).join(', ')}</p>                                            )}
                                            {/* Add link */}
                                            <p><strong>Link: </strong><a href={service.link} target="_blank">Streaming Link</a></p>
                                        </div>
                                    ))
                                ) : (
                                    <p>No streaming services available</p>
                                )}
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <p>No search results found</p>
            )}
        </div>
    );
}

export default SearchResults;
