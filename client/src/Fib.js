/* eslint-disable */
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default () => {
  const [seenIndexes, setSeenIndexes] = useState([]);
  const [values, setValues] = useState({});
  const [index, setIndex] = useState('');

  const fetchValues = async () => {
    const values = await axios.get('/api/values/current');
    setValues(values.data);
  };

  const renderValues = () => {
    const entries = [];

    for (let key in values) {
      entries.push(
        <div key={key}>
          For index {key} I calculated {values[key]}
        </div>
      );
    }

    return entries;
  };

  const fetchIndexes = async () => {
    const values = await axios.get('/api/values/all');
    setSeenIndexes(values.data);
  };

  const renderIndexes = () => {
    return seenIndexes.map(({ number }) => number).join(', ');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios.post('/api/values', {
      index,
    });

    setIndex('');
  };

  useEffect(() => {
    fetchValues();
    fetchIndexes();
  }, []);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Enter your index:</label>
        <input value={index} onChange={(e) => setIndex(e.target.value)} />
        <button>Submit</button>
      </form>

      <h3>Indexes I have seen:</h3>
      {renderIndexes()}

      <h3>Calculated Values:</h3>
      {renderValues()}
    </div>
  );
};
