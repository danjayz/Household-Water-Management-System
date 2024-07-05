import React from 'react';
import './monthlybill.css';
import { BiMoney } from 'react-icons/bi';
const Monthlybill = ({ billAmount }) => {
  return (
    <div className="monthly-bill-card">
      <div className="icon-wrapper">
      <BiMoney size={32} color="#4CAF50" />
      </div>
      <h3>Monthly Bill So Far</h3>
      <p>LKR {billAmount.toFixed(2)}</p>
    </div>
  );
};

export default Monthlybill;