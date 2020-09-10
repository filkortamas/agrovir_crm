import React, { useEffect, useState } from 'react';
import partnersService from './services/partners';
import Partner from './components/Partner';
import PartnerModal from './components/PartnerModal';
import useModal from './hooks/useModal';

const App = () => {
  const [partners, setPartners] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isModalShowing, toggleModal } = useModal();

  useEffect(() => {
    async function fetchData() {
      const data = await partnersService.getAll();
      setPartners(data);
      setIsLoading(false);
    }

    fetchData().catch(() => {
      setError('There was an error fetching the partner datas');
      setIsLoading(false);
    });

  }, []);

  const removePartner = async id => {
    try {
      await partnersService.remove(id);
      setPartners(p => p.filter(partner => partner.partner_id !== id));
    } catch (error) {
      setError(`There was an error deleting the partner with name '${
        partners.find(partner => partner.partner_id === id)['name']
      }'`);
    }
  };

  const createPartner = async newPartnerObject => {
    try {
      const newPartner = await partnersService.create(newPartnerObject);
      setPartners(p => p.concat(newPartner));
      toggleModal();
    } catch (error) {
      setError(`There was an error creating new partner`);
    }
  };

  const editPartner = async (id, updatedPartnerObject) => {
    try {
      const updatedPartner = await partnersService.update(id, updatedPartnerObject);
      setPartners(partners.map(partner => partner.partner_id !== id ? partner : updatedPartner));
    } catch (error) {
      setError(`There was an error editing partner with name '${
        partners.find(partner => partner.partner_id === id)['name']
      }'`);
    }
  };

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>{error}</h1>;
  }

  return (
    <div className="container px-4 py-4">
      <div className="w-full overflow-x-auto p-1">
        <table className="table-auto w-full text-sm">
          <thead>
            <tr>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Business entity</th>
              <th className="px-4 py-2">VAT</th>
              <th className="px-4 py-2">Company registration number</th>
              <th className="px-4 py-2">Settlement</th>
              <th className="px-4 py-2">Address</th>
              <th className="px-4 py-2">Phone</th>
              <th className="px-4 py-2">Bank account number</th>
              <th className="px-4 py-2">Note</th>
              <th className="px-4 py-2"></th>
              <th className="px-4 py-2"></th>
            </tr>
          </thead>
          <tbody>
            {partners.map((partner, index) => (
              <Partner
                key={partner.partner_id}
                index={index}
                onRemove={removePartner}
                editPartner={editPartner}
                {...partner}
              />
            ))}
          </tbody>
        </table>
      </div>
      <button onClick={toggleModal} className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded inline-flex items-center mt-3 ml-1">
        <svg className="w-6 h-6 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
        <span>Add new partner</span>
      </button>
      { isModalShowing && <PartnerModal onToggle={toggleModal} onSubmit={createPartner}/> }
    </div>
  );
};

export default App;