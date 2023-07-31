import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { LogoutButton } from '../components/LogoutButton';
import { IUsuarioInfoContext } from '../interfaces/context.interface';
import { AppContext } from '../context/AppContext';
import { useContext, useEffect } from 'react';
import { ILocalStorageInfo } from '../interfaces/localStorageInfo.interface';

export const PagesLayout = () => {
  const { setUsuarioInfo } = useContext<IUsuarioInfoContext>(AppContext);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const info = localStorage.getItem('usuarioInfo');
    if (info) {
      const infoUsuario = JSON.parse(info) as ILocalStorageInfo;
      setUsuarioInfo({ email: infoUsuario.email });
      if (!infoUsuario.email && !location.pathname.includes('login')) {
        navigate('/', {
          replace: true
        });
      }
    }
  }, [location.pathname]);

  return (
    <>
      <header className="container">
        <div className="row">
          <div className="col-8">
            <h1>Chat</h1>
          </div>
          <div className="col mt-2">
            <LogoutButton />
          </div>
        </div>
      </header>
      <hr />
      <main className="container">
        <Outlet />
      </main>
    </>
  );
};
