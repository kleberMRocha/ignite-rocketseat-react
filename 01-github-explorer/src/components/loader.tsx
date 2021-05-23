import React from 'react';
import './styles/loader.scss';

const Loader:React.FC = () => {
  return (
    <div className="loader-container">
      <div className="loader">
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Loader;
