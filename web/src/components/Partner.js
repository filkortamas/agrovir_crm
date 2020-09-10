import React from 'react';
import useModal from '../hooks/useModal';
import PartnerModal from './PartnerModal';

const Partner = ({onRemove, index, editPartner, ...partnerProps}) => {
  const {
    partner_id,
    name,
    entity,
    vat,
    company_registration_number,
    settlement,
    address,
    phone,
    account_number,
    note,
  } = partnerProps;
  const { isModalShowing, toggleModal } = useModal();

  const onEditPartner = async (updatedPartnerObject) => {
    await editPartner(partner_id, updatedPartnerObject);
    toggleModal();
  }

  return (
    <tr className={index % 2 === 1 ? 'bg-gray-100' : ''}>
      <td className="border px-4 py-2">{name}</td>
      <td className="border px-4 py-2">{entity}</td>
      <td className="border px-4 py-2">{vat}</td>
      <td className="border px-4 py-2">{company_registration_number}</td>
      <td className="border px-4 py-2">{settlement}</td>
      <td className="border px-4 py-2">{address}</td>
      <td className="border px-4 py-2">{phone}</td>
      <td className="border px-4 py-2">{account_number}</td>
      <td className="border px-4 py-2">{note}</td>
      <td className="border px-4 py-2">
        <button className="text-blue-500 hover:text-blue-700 flex w-full justify-center" onClick={() => onRemove(partner_id)}>
          <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </td>
      <td className="border px-4 py-2">
        <button onClick={toggleModal} className="text-blue-500 hover:text-blue-700 flex w-full justify-center">
          <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
          </svg>
        </button>
        { isModalShowing && <PartnerModal onToggle={toggleModal} {...partnerProps} onSubmit={onEditPartner} />}
      </td>
    </tr>
  );
};

export default Partner;