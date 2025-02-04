import React from 'react';

const Info = () => {
  return (
    <div style={{
        position: 'absolute',
        top: '22px',
        right: '22px',
        cursor: 'pointer',
      }}>
        <img 
          src="https://dashboard.codeparrot.ai/api/image/Z6Fd8g58MnUDluWU/info.png" 
          alt="Info"
          style={{ width: '24px', height: '24px' }}
        />
    </div>
  );
};

export default Info;