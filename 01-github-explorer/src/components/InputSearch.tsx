import React from 'react';
import './styles/InputSearch.scss';
import search from '../assets/Search_Icon.svg';

interface InputProps{
  handleChange:Function;
  value:string;
}


const SearcInput:React.FC<InputProps> = ({ handleChange, value }) => {
  return (
    <div className="search-container">
      <img src={search} alt="buscar" />
      <input
        value={value}
        onChange={(event) => handleChange(event.target.value)}
        placeholder="Busque um repositório no gitHub pelo nome do usuário"
      />
    </div>
  );
};

export default SearcInput;
