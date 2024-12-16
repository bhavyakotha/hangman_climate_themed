import React from 'react';

function Sapling({ wrongGuesses }) {
  const maxWrong = 6; 
  const imageIndex = Math.min(wrongGuesses, maxWrong);
  const saplingImage = `./assets/Sapling${maxWrong - imageIndex}.svg`; 

  return (
    <div>
      <img
        src={saplingImage}
        alt={`Sapling with ${maxWrong - imageIndex} leaves`}
        style={{ width: '200px', height: '300px', align: 'center' }}
      />
    </div>
  );
}

export default Sapling;
