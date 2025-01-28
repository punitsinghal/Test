import React, { useState } from 'react';

const EmployeeDashboard = () => {
  const [claims, setClaims] = useState([]);
  const [drafts, setDrafts] = useState([]);
  const [newClaim, setNewClaim] = useState({ description: '', bills: [] });
  const [bill, setBill] = useState('');

  const handleClaimChange = (e) => {
    setNewClaim({ ...newClaim, [e.target.name]: e.target.value });
  };

  const handleBillChange = (e) => {
    setBill(e.target.value);
  };

  const addBill = () => {
    if (bill) {
      setNewClaim({ ...newClaim, bills: [...newClaim.bills, bill] });
      setBill('');
    }
  };

  const saveDraft = () => {
    setDrafts([...drafts, newClaim]);
    setNewClaim({ description: '', bills: [] });
  };

  const submitClaim = () => {
    setClaims([...claims, newClaim]);
    setNewClaim({ description: '', bills: [] });
  };

  const deleteDraft = (index) => {
    const updatedDrafts = drafts.filter((_, i) => i !== index);
    setDrafts(updatedDrafts);
  };

  return (
    <div className="employee-dashboard">
      <h1>Employee Dashboard</h1>
      <div className="claim-form">
        <h2>Submit a New Claim</h2>
        <input
          type="text"
          name="description"
          value={newClaim.description}
          onChange={handleClaimChange}
          placeholder="Claim Description"
        />
        <input
          type="text"
          value={bill}
          onChange={handleBillChange}
          placeholder="Add Bill"
        />
        <button onClick={addBill}>Add Bill</button>
        <button onClick={saveDraft}>Save Draft</button>
        <button onClick={submitClaim}>Submit Claim</button>
      </div>
      <div className="drafts">
        <h2>Drafts</h2>
        <ul>
          {drafts.map((draft, index) => (
            <li key={index}>
              {draft.description} - {draft.bills.join(', ')}
              <button onClick={() => deleteDraft(index)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
      <div className="claims">
        <h2>Submitted Claims</h2>
        <ul>
          {claims.map((claim, index) => (
            <li key={index}>
              {claim.description} - {claim.bills.join(', ')}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
