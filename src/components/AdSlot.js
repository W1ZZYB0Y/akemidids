import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdSlot = ({ slot }) => {
  const [code, setCode] = useState('');

  useEffect(() => {
    const fetchAd = async () => {
      try {
        const res = await axios.get('/api/admin/ads');
        const foundAd = res.data.find((a) => a.slot === slot);
        if (foundAd) setCode(foundAd.code);
      } catch (err) {
        console.error('Failed to load ad:', err);
      }
    };
    fetchAd();
  }, [slot]);

  return (
    <div dangerouslySetInnerHTML={{ __html: code }} />
  );
};

export default AdSlot;