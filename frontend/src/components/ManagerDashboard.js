import React, { useState } from 'react';

const ManagerDashboard = () => {
  const [claims, setClaims] = useState([
    { id: 1, description: 'Claim 1', status: 'Pending' },
    { id: 2, description: 'Claim 2', status: 'Pending' },
    // Add more claims as needed
  ]);

  const approveClaim = (id) => {
    setClaims(claims.map(claim => 
      claim.id === id ? { ...claim, status: 'Approved' } : claim
    ));
  };

  const rejectClaim = (id) => {
    setClaims(claims.map(claim => 
      claim.id === id ? { ...claim, status: 'Rejected' } : claim
    ));
  };

  const sendBackForCorrection = (id) => {
    setClaims(claims.map(claim => 
      claim.id === id ? { ...claim, status: 'Needs Correction' } : claim
    ));
  };

  return (
    <div className="manager-dashboard">
      <h1>Manager Dashboard</h1>
      <div className="claims-list">
        <h2>Pending Claims</h2>
        <ul>
          {claims.map(claim => (
            <li key={claim.id}>
              {claim.description} - {claim.status}
              <button onClick={() => approveClaim(claim.id)}>Approve</button>
              <button onClick={() => rejectClaim(claim.id)}>Reject</button>
              <button onClick={() => sendBackForCorrection(claim.id)}>Send Back for Correction</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ManagerDashboard;
