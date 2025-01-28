import React, { useState } from 'react';

const AccountsDashboard = () => {
  const [claims, setClaims] = useState([
    { id: 1, description: 'Claim 1', status: 'Pending Approval', paymentProcessed: false },
    { id: 2, description: 'Claim 2', status: 'Pending Approval', paymentProcessed: false },
    // Add more claims as needed
  ]);

  const approveClaim = (id) => {
    setClaims(claims.map(claim => 
      claim.id === id ? { ...claim, status: 'Approved' } : claim
    ));
  };

  const processPayment = (id) => {
    setClaims(claims.map(claim => 
      claim.id === id ? { ...claim, paymentProcessed: true } : claim
    ));
  };

  const exportData = () => {
    const dataToExport = claims.map(({ id, description, status, paymentProcessed }) => ({
      id, description, status, paymentProcessed
    }));
    const blob = new Blob([JSON.stringify(dataToExport, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'payment_data.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="accounts-dashboard">
      <h1>Accounts Dashboard</h1>
      <div className="claims-list">
        <h2>Claims for Approval and Payment</h2>
        <ul>
          {claims.map(claim => (
            <li key={claim.id}>
              {claim.description} - {claim.status} - Payment Processed: {claim.paymentProcessed ? 'Yes' : 'No'}
              <button onClick={() => approveClaim(claim.id)}>Approve</button>
              <button onClick={() => processPayment(claim.id)}>Process Payment</button>
            </li>
          ))}
        </ul>
      </div>
      <button onClick={exportData}>Export Payment Data</button>
    </div>
  );
};

export default AccountsDashboard;
