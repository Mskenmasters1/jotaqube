import { useState } from 'react';
import { SalasForm } from './SalasForm';
import { SalasList } from './SalasList';

export const SalasPage = () => {
  const [refreshSalas, setRefreshSalas] = useState<boolean>(true);
  return (
    <>
      <div className="row">
        <div className="col">
          <SalasForm setRefreshSalas={setRefreshSalas} />
        </div>
        <div className="col">
          <SalasList refreshSalas={refreshSalas} setRefreshSalas={setRefreshSalas} />
        </div>
      </div>
    </>
  );
};