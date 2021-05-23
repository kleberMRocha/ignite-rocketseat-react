import '../public/styles/global.scss';
import Header from './components/Header';
import RepositoryCard from './components/RepositoryCard';
import InputSearch from './components/InputSearch';
import Loader from './components/loader';
import { useEffect, useState } from 'react';


interface reposProps{
  id: string | number;
  owner: {
    avatar_url:string
    login:string;
  };
  name : string;
  html_url : string;
  description : string;
  forks : number;
}

const HeaderProps = {
  img: 'https://github.githubassets.com/images/modules/logos_page/Octocat.png',
  title: 'GitHub Explorer',
};

const avatarDefault =
  'https://tecnologia.prefeitura.sp.gov.br/wp-content/uploads/2020/02/GitHub-Mark.png';

export function App() {
  const [Searchtext, setSearchText] = useState('');
  const [repos, setRepos] = useState<reposProps[]>([] as reposProps[]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSeachRepos = (value:string): void |reposProps[] => {
    if (value.length < 4) return;
    setIsLoading(true);
    const url = `https://api.github.com/users/${value}/repos`;
    fetch(url)
      .then((repos) => {
        setIsLoading(false);
        repos.status === 404 && setError('Não usuário não encontrado');
        repos.status === 403 && setError('Você atingiu a cotas para solicitações de APIs agora só daqui a 1h');
        return repos.ok ? repos.json() : [];
      })
      .then((repos) => {
        setRepos(repos);
        repos.length && setError('');
      });
  };

  useEffect(() => {
    if (Searchtext === '') setError('');
    if (Searchtext === '' || Searchtext.length < 4) return;

    handleSeachRepos(Searchtext);
    
  }, [Searchtext]);
  

  return (
    <>
      <Header figure={HeaderProps.img} title={HeaderProps.title} />
      <InputSearch handleChange={setSearchText} value={Searchtext} />
      {isLoading && <Loader />} 
      <div className="container">
        {error !== '' && <span>{error}</span>}
        {repos.map((repo) => {
          return (
            <RepositoryCard
              key={`${repo.id}_${repo.name}`}
              avatar={repo.owner ? repo.owner.avatar_url : avatarDefault}
              name={repo.name}
              url={repo.html_url}
              description={repo.description}
              forks={repo.forks}
              owner={repo.owner?.login || ''}
            />
          );
        })}
      </div>
    </>
  );
}
