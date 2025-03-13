import React, { useState } from 'react';
import Info from './components/Info';
import TitleCard from './components/TitleCard';
import Search from './components/Search';
import Stats from './components/Stats';

const App = () => {
  const [stats, setStats] = useState(null); 

  return (
    <div style={appStyles.container}>
      <TitleCard />
      <Info />
      <Search onSearch={setStats} />
      <Stats stats={stats}/>
    </div>
  );
};

const appStyles = {
  container: {
    width: '100%',
    minHeight: '100vh',
    backgroundColor: '#1c1c1f',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'relative',
  },
};

export default App;
