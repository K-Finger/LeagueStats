import React from 'react';
import Info from './components/Info';
import TitleCard from './components/TitleCard';
import Search from './components/Search';

const App = () => {
  return (
    <div style={{
      width: '100%',
      minHeight: '100vh',
      backgroundColor: '#1c1c1f',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      position: 'relative',
    }}>
      <TitleCard />
      <Info />
      <Search />
    </div>
  );
};

export default App;