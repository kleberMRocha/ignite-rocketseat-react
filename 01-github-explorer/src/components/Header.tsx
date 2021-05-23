import React from 'react';
import './styles/header.scss';

interface HeaderProps{
  figure:string;
  title:string;
}

const Header:React.FC<HeaderProps> = ({ figure, title }) => {
  return (
    <header className="header-main">
      <h1>{title}</h1>
      <div>
        <img src={figure} />
      </div>
    </header>
  );
};

export default Header;
