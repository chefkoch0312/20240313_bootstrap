import React, { useState, useEffect } from 'react';
import MyComponent from './MyComponent';

const ApiExample = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mySearch, setMySearch] = useState("");

  const fetchData = async () => {
    try {
      const response = await fetch('https://api.publicapis.org/entries');
      const result = await response.json();
      setData(result);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  let filtered = "";
  if (data.length != 0) {
    filtered = data.entries.filter((entry) => {
      return entry.Description.toLowerCase().includes(mySearch.toLowerCase()) || entry.API.toLowerCase().includes(mySearch.toLowerCase());
    });
  } else {
    filtered = data.entries;
  }

  return (
    <div>
      {loading ? (
        <p>Loading data...</p>
      ) : (
        <div>
          <h3>{data.count} Public APIs</h3>
          <div>
            Suche: <input type="text" value={mySearch} onChange={(e) => setMySearch(e.target.value)} />
          </div><br />
          {filtered.map((entry) => (
            <MyComponent key={entry.API + entry.Description} api={entry} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ApiExample;
