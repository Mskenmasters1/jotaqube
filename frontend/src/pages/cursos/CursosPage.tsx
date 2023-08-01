import { useState } from 'react';
import { CursosForm } from './CursosForm';
import { CursosList } from './CursosList';

export const CursosPage = () => {
  const [refreshCursos, setRefreshCursos] = useState<boolean>(true);
  return (
    <>
      <div className="row">
        <div className="col">
          <CursosForm setRefreshCursos={setRefreshCursos} />
        </div>
        <div className="col">
          <CursosList refreshCursos={refreshCursos} setRefreshCursos={setRefreshCursos} />
        </div>
      </div>
    </>
  );
};