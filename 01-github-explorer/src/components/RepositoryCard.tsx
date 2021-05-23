import React from 'react';
import './styles/repository.scss';


interface cardProps{
  avatar: string;
  name : string;
  url: string;
  description : string;
  owner : string;
  forks: number;
}


const RepositoryCard:React.FC<cardProps> = ({
  avatar = '',
  name = '',
  url = '',
  description = '',
  owner = '-',
  forks = 0,
}) => {
  const nameElipse = (value:string, maxValue:number):string => {
    const subStringValue = Number(value.length - (value.length - maxValue));
    const ellipsis = `${value.substring(0, subStringValue)} ...`;
    return ellipsis;
  };

  return (
    <div>
      <div className="card-container">
        <header>Nome: {name.length > 20 
          ? nameElipse(name, 18) 
          : name }
        </header>
        <section>
          <img src={avatar} />
        </section>
        <section>
          <p className="description">
            {description && description.length > 50
              ? nameElipse(description, 50)
              : description}
          </p>
        </section>
        <section>
          <p>
            <a href={url} target="blank" rel="noopener">
              Acesse o Repositório
            </a>
          </p>
          <div>
            owner: {owner} forks: {forks}{' '}
          </div>
        </section>
      </div>
    </div>
  );
};

export default RepositoryCard;
