import React, { useState } from 'react';

const OperationsDashboard = () => {
  const [claims, setClaims] = useState([
    { id: 1, description: 'Claim 1', status: 'Pending', verified: false },
    { id: 2, description: 'Claim 2', status: 'Pending', verified: false },
    // Add more claims as needed
  ]);
  const [filter, setFilter] = useState('');
  const [selectedClaims, setSelectedClaims] = useState([]);

  const verifyClaim = (id) => {
    setClaims(claims.map(claim => 
      claim.id === id ? { ...claim, verified: true } : claim
    ));
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const filteredClaims = claims.filter(claim => 
    claim.description.toLowerCase().includes(filter.toLowerCase())
  );

  const toggleSelectClaim = (id) => {
    setSelectedClaims(prevSelected =>
      prevSelected.includes(id)
        ? prevSelected.filter(claimId => claimId !== id)
        : [...prevSelected, id]
    );
  };

  const processBulkClaims = () => {
    setClaims(claims.map(claim => 
      selectedClaims.includes(claim.id) ? { ...claim, status: 'Processed' } : claim
    ));
    setSelectedClaims([]);
  };

  const exportData = () => {
    const dataToExport = claims.map(({ id, description, status, verified }) => ({
      id, description, status, verified
    }));
    const blob = new Blob([JSON.stringify(dataToExport, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'claims_data.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="operations-dashboard">
      <h1>Operations Dashboard</h1>
      <div className="filter">
        <input
          type="text"
          value={filter}
          onChange={handleFilterChange}
          placeholder="Filter claims"
        />
      </div>
      <div className="claims-list">
        <h2>Claims</h2>
        <ul>
          {filteredClaims.map(claim => (
            <li key={claim.id}>
              <input
                type="checkbox"
                checked={selectedClaims.includes(claim.id)}
                onChange={() => toggleSelectClaim(claim.id)}
              />
              {claim.description} - {claim.status} - Verified: {claim.verified ? 'Yes' : 'No'}
              <button onClick={() => verifyClaim(claim.id)}>Verify</button>
            </li>
          ))}
        </ul>
      </div>
      <button onClick={processBulkClaims}>Process Selected Claims</button>
      <button onClick={exportData}>Export Data</button>
    </div>
  );
};

export default OperationsDashboard;
