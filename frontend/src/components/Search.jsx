import React, { useState } from 'react';

//let puuid = ""

const Search = ({ onSearch = () => {} }) => {
  const [searchValue, setSearchValue] = useState('');

  const handleSearch = (e) => {
    console.log(e.target.value);
    setSearchValue(e.target.value);
  };

  const handleKeyPress = async (e) => {
    if (e.key === 'Enter') {
      console.log('Enter key pressed');
      const [gameName, tagLine] = searchValue.split('#');
      await fetchData(gameName, tagLine);
    }
  };

  const handleButtonClick = async () => {
    console.log('Button clicked');
    const [gameName, tagLine] = searchValue.split('#');
    await fetchData(gameName, tagLine);
  };

  const fetchData = async (gameName, tagLine) => {
    try {
      const response = await fetch(`http://localhost:5000/api/get-puuid?game_name=${gameName}&tag_line=${tagLine}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      onSearch(data);
      console.log('Data', data);

      // Handle the combined data (PUUID and match data)
      const { puuid, match_data } = data;
      console.log('PUUID:', puuid);
      console.log('Match data:', match_data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    /*
    try {
      const response = await fetch(`http://localhost:5000/api/get-match-history?puuid=${puuid}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const match_history = await response.json();
      console.log('Match history:', match_history);
    } catch (error) {
      console.error('Error fetching matching history:', error);
    }
    */
  };

  return (
    <div style={{
      position: 'relative',
      width: '556px',
      padding: '12px 48px',
      backgroundColor: '#31313c',
      borderRadius: '1000px',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
    }}>
      <input
        type="text"
        placeholder="SummonerName#Tag"
        value={searchValue}
        onChange={handleSearch}
        onKeyPress={handleKeyPress}
        style={{
          width: '100%',
          background: 'transparent',
          border: 'none',
          color: '#b3b3b3',
          fontSize: '16px',
          fontFamily: 'Inter, sans-serif',
          fontWeight: 400,
          lineHeight: '100%',
          outline: 'none',
        }}
      />
      <img 
        src="https://dashboard.codeparrot.ai/api/image/Z6Fd8g58MnUDluWU/search.png"
        alt="Search"
        onClick={handleButtonClick}
        style={{
          width: '16px',
          height: '16px',
          position: 'absolute',
          right: '48px',
          cursor: 'pointer',
        }}
      />
    </div>
  );
};

export default Search;
