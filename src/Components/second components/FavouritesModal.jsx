const FavoritesModal = ({ isOpen, onClose, favorites, removeFavorite, clearFavorites }) => {
  // State to manage sorting type
  const [sortType, setSortType] = useState('titleAtoZ');

  // If modal is not open, return null (modal is not rendered)
  if (!isOpen) return null;

  // Group episodes by show and season
  const groupedFavorites = favorites.reduce((acc, episode) => {
    const { showTitle, seasonNumber } = episode;
    if (!acc[showTitle]) acc[showTitle] = {};
    if (!acc[showTitle][seasonNumber]) acc[showTitle][seasonNumber] = [];
    acc[showTitle][seasonNumber].push(episode);
    return acc;
  }, {});

  // Sorting functions for episodes
  const sortEpisodes = (episodes, type) => {
    switch (type) {
      case 'titleAtoZ':
        return episodes.sort((a, b) => a.title.localeCompare(b.title));
      case 'titleZtoA':
        return episodes.sort((a, b) => b.title.localeCompare(a.title));
      case 'recentFirst':
        return episodes.sort((a, b) => b.updatedAt - a.updatedAt);
      case 'oldestFirst':
        return episodes.sort((a, b) => a.updatedAt - b.updatedAt);
      default:
        return episodes;
    }
  };

  // Handle sorting change from the dropdown
  const handleSortChange = (e) => {
    setSortType(e.target.value);
  };

  // Render the modal content
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        {/* Close button */}
        <button className="close-button" onClick={onClose}>Close</button>
        
        {/* Modal header */}
        <h2>Favorite Episodes</h2>
        
        {/* Sorting options dropdown */}
        <div className="sort-options">
          <label>Sort by: </label>
          <select value={sortType} onChange={handleSortChange}>
            <option value="titleAtoZ">Title A-Z</option>
            <option value="titleZtoA">Title Z-A</option>
            <option value="recentFirst">Most Recently Updated</option>
            <option value="oldestFirst">Least Recently Updated</option>
          </select>
        </div>
        
        {/* Container for grouped and sorted episodes */}
        <div className="favorites-list-container">
          {/* Iterate through grouped favorites */}
          {Object.entries(groupedFavorites).map(([showTitle, seasons]) => (
            <div key={showTitle} className="show-group">
              <h3>{showTitle}</h3>
              {/* Iterate through seasons of each show */}
              {Object.entries(seasons).map(([seasonNumber, episodes]) => (
                <div key={seasonNumber} className="season-group">
                  <h4>Season {seasonNumber}</h4>
                  {/* List of episodes for each season */}
                  <ul className="favorites-list">
                    {/* Map and render sorted episodes */}
                    {sortEpisodes(episodes, sortType).map(episode => (
                      <li key={episode.id} className="favorite-item">
                        {/* Episode title and details */}
                        <div>
                          <h5>{episode.title}</h5>
                          <p>{episode.time}</p>
                        </div>
                        {/* Remove button for each episode */}
                        <button onClick={() => removeFavorite(episode.episode)}>Remove</button>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ))}
        </div>
        
        {/* Clear all favorites button */}
        <button className="clear-all" onClick={clearFavorites}>Clear All</button>
      </div>
    </div>
  );
};

export default FavoritesModal;
