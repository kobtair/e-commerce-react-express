import React from 'react';

const ImageWithText = ({ imageUrl, text }) => {
  return (
    <div style={{ position: 'relative' }}>
      <img src={imageUrl} alt="background" style={{ width: '100%', height: '100%' }} />
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
        <p style={{ textAlign: 'center', color: 'white' }}>{text}</p>
      </div>
    </div>
  );
};

export default ImageWithText;