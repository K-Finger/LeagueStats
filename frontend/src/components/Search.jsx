import React, { useCallback } from 'react';
import axios from 'axios';

const Search = ({ onSearch = () => {} }) => {
  
  const fetchStats = useCallback(async () => {
    const inputValue = document.querySelector("#search-input")?.value.trim();
    if (!inputValue || !inputValue.includes('#')) {
      console.error("Invalid search input format. Use 'SummonerName#Tag'.");
      return;
    }

    const [gameName, tagLine] = inputValue.split('#');

    if (!gameName || !tagLine) {
      console.error("Invalid search input. Missing game name or tag line.");
      return;
    }

    try {
      const response = await axios.get(`http://localhost:5000/api/search`, {
        params: { game_name: gameName.trim(), tag_line: tagLine.trim() }
      });

      if (!response.data || typeof response.data !== 'object') {
        console.error("Invalid data format from API:", response.data);
        return;
      }
      onSearch(response.data);
    } catch (error) {
      console.error('Error fetching data:', error.message || error);
    }
  }, [onSearch]);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      fetchStats();
    }
  };

  return (
    <div style={styles.container}>
      <input
        id="search-input"
        type="text"
        placeholder="SummonerName#Tag"
        onKeyDown={handleKeyPress}
        style={styles.input}
      />
      <img
        src="https://dashboard.codeparrot.ai/api/image/Z6Fd8g58MnUDluWU/search.png"
        alt="Search"
        onClick={fetchStats}
        style={styles.searchIcon}
      />
    </div>
  );
};

const styles = {
  container: {
    position: 'relative',
    width: '556px',
    padding: '12px 48px',
    backgroundColor: '#31313c',
    borderRadius: '1000px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  input: {
    width: '100%',
    background: 'transparent',
    border: 'none',
    color: '#b3b3b3',
    fontSize: '16px',
    fontFamily: 'Inter, sans-serif',
    fontWeight: 400,
    lineHeight: '100%',
    outline: 'none',
  },
  searchIcon: {
    width: '16px',
    height: '16px',
    cursor: 'pointer',
  },
};

export default Search;
