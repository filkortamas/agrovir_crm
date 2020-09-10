import React, { useState, useEffect } from 'react';
import entitiesService from '../services/entities';
import settlementsService from '../services/settlements';

const SmallModal = ({name, label, onSubmit, onClose}) => {
  const [input, setInput] = useState('');

  const handleInputChange = e => {
    e.preventDefault();

    setInput(e.target.value);
  }

  const handleSubmit = e => {
    e.preventDefault();

    onSubmit(input ? { input } : {});
  }

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg w-full" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="mt-3 text-center sm:mt-0 sm:text-left">
                <div className="flex items-center">
                <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-4 w-4 text-blue-600">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                  </svg>
                </div>
                  <h3 className="text-lg leading-6 font-medium text-gray-900 ml-3"
                  id="modal-headline">
                    Add new { name }
                  </h3>
                </div>
                <form className="mt-4" onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="name">
                      { label }
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      value={input}
                      onChange={handleInputChange}
                      type="text"
                      placeholder={ label }
                    />
                  </div>
                  <div className="flex items-center justify-end">
                    <button
                      onClick={onClose}
                      type="button"
                      className="bg-white border border-gray-300 py-2 px-4 rounded focus:outline-none text-gray-700 shadow-sm hover:text-gray-500 focus:border-blue-300 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                    >
                      Cancel
                    </button>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white shadow-sm transition ease-in-out duration-150 sm:text-sm sm:leading-5 py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-2"
                    type="submit">
                      Create
                    </button>
                  </div>
                </form>
              </div>
          </div>
          <span onClick={onClose} className="absolute top-0 bottom-0 right-0 px-3 py-3 cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="fill-current h-6 w-6 text-gray-500 hover:text-gray-700">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
            </svg>
          </span>
        </div>
      </div>
    </div>
  );
};

const PartnerModal = ({
  partner_id,
  name,
  entity_id,
  vat,
  company_registration_number,
  settlement_id,
  address,
  phone,
  account_number,
  note,
  onToggle,
  onSubmit
}) => {

  const [formValues, setFormValues] = useState({
    name,
    entity_id,
    vat,
    company_registration_number,
    settlement_id,
    address,
    phone,
    account_number,
    note,
  });
  const [entities, setEntities] = useState([]);
  const [settlements, setSettlements] = useState([]);
  const [isEntityModalShowing, setIsEntityModalShowing] = useState(false);
  const [isSettlementModalShowing, setIsSettlementModalShowing] = useState(false);

  useEffect(() => {
    const fetchEntities = async () => {
      const data = await entitiesService.getAll();
      setEntities(data);
    };

    const fetchSettlements = async () => {
      const data = await settlementsService.getAll();
      setSettlements(data);
    };

    fetchEntities();
    fetchSettlements();
  }, [])

  const handleInputChange = e => {
    e.preventDefault();

    setFormValues({
      ...formValues,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();

    onSubmit(formValues);
  }

  const addNewEntity = async ({ input: entity }) => {
    if (entity) {
      const newEntity = await entitiesService.create({ entity });
      setEntities(entities.concat(newEntity));
    }
    setIsEntityModalShowing(false);
  }

  const addNewSettlement = async ({ input: settlement }) => {
    if (settlement) {
      const newSettlement = await settlementsService.create({ settlement });
      setSettlements(settlements.concat(newSettlement));
    }
    setIsSettlementModalShowing(false);
  }

  const toggleEntityModal = () => setIsEntityModalShowing(s => !s);
  const toggleSettlementModal = () => setIsSettlementModalShowing(s => !s);

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg w-full" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="mt-3 text-center sm:mt-0 sm:text-left">
                <div className="flex items-center">
                <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-4 w-4 text-blue-600">
                    { partner_id
                      ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                    }
                  </svg>
                </div>
                  <h3 className="text-lg leading-6 font-medium text-gray-900 ml-3"
                  id="modal-headline">
                    { partner_id ? 'Edit partner' : 'Add new partner' }
                  </h3>
                </div>
                <form className="mt-4" onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="name">
                      Name
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="name"
                      value={formValues.name}
                      onChange={handleInputChange}
                      type="text"
                      placeholder="Name"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="entity_id">
                      Business entity
                    </label>
                    <div className="inline-block relative w-full">
                      <select
                        id="entity_id"
                        value={entity_id}
                        onChange={handleInputChange}
                        className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline text-gray-700">
                        {
                          entities.map(({ entity_id, entity }) => (
                            <option key={entity_id} value={entity_id}>{entity}</option>
                          ))
                        }
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                      </div>
                      <button onClick={toggleEntityModal} className="text-blue-500 hover:text-blue-700 background-transparent font-bold pt-1 text-xs outline-none focus:outline-none" type="button">
                        Can't you find your business entity? Create it!
                      </button>
                    </div>
                    {/* <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="entity_id"
                      value={formValues.entity_id}
                      onChange={handleInputChange}
                      type="text"
                      placeholder="Business entity"
                    /> */}
                  </div>
                  <div className="mb-3">
                    <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="vat">
                      VAT
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="vat"
                      value={formValues.vat}
                      onChange={handleInputChange}
                      type="text"
                      placeholder="VAT"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="company_registration_number">
                      Company registration number
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="company_registration_number"
                      value={formValues.company_registration_number}
                      onChange={handleInputChange}
                      type="text"
                      placeholder="Company registration number"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="settlement_id">
                      Settlement
                    </label>
                    <div className="inline-block relative w-full">
                      <select
                        id="settlement_id"
                        value={settlement_id}
                        onChange={handleInputChange}
                        className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline text-gray-700">
                        {
                          settlements.map(({ settlement_id, settlement }) => (
                            <option key={settlement_id} value={settlement_id}>{settlement}</option>
                          ))
                        }
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                      </div>
                      <button onClick={toggleSettlementModal} className="text-blue-500 hover:text-blue-700 background-transparent font-bold pt-1 text-xs outline-none focus:outline-none" type="button">
                        Can't you find your settlement? Create it!
                      </button>
                    </div>
                  </div>
                  <div className="mb-3">
                    <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="address">
                      Address
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="address"
                      value={formValues.address}
                      onChange={handleInputChange}
                      type="text"
                      placeholder="Address"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="phone">
                      Phone
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="phone"
                      value={formValues.phone}
                      onChange={handleInputChange}
                      type="text"
                      placeholder="Phone"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="account_number">
                      Bank account number
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="account_number"
                      value={formValues.account_number}
                      onChange={handleInputChange}
                      type="text"
                      placeholder="Bank account number"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="note">
                      Note
                    </label>
                    <textarea
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="note"
                      value={formValues.note}
                      onChange={handleInputChange}
                      type="text"
                      placeholder="Note"
                    />
                  </div>
                  <div className="flex items-center justify-end">
                    <button onClick={onToggle}
                    type="button" className="bg-white border border-gray-300 py-2 px-4 rounded focus:outline-none text-gray-700 shadow-sm hover:text-gray-500 focus:border-blue-300 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5">
                      Cancel
                    </button>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white shadow-sm transition ease-in-out duration-150 sm:text-sm sm:leading-5 py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-2"
                    type="submit">
                      { partner_id ? 'Save' : 'Create ' }
                    </button>
                  </div>
                </form>
              </div>
          </div>
          <span onClick={onToggle} className="absolute top-0 bottom-0 right-0 px-3 py-3 cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="fill-current h-6 w-6 text-gray-500 hover:text-gray-700">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
            </svg>
          </span>
        </div>
      </div>
      {
        isEntityModalShowing && (
          <SmallModal
            name="business entity"
            label="Business entity"
            onSubmit={addNewEntity}
            onClose={toggleEntityModal}
          />
        )
      }
      {
        isSettlementModalShowing && (
          <SmallModal
            name="settlement"
            label="Settlement"
            onSubmit={addNewSettlement}
            onClose={toggleSettlementModal}
          />
        )
      }
    </div>
  );
}

export default PartnerModal;