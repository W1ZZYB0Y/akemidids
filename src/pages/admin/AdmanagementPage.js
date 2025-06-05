import React, { useEffect, useState } from 'react';
import { Container, Form, Button, Alert } from 'react';
import axios from 'axios';

const AdManagementPage = () => {
  const [ads, setAds] = useState([]);
  const [newSlot, setNewSlot] = useState('');
  const [newCode, setNewCode] = useState('');
  const [message, setMessage] = useState('');

  const fetchAds = async () => {
    try {
      const res = await axios.get('/api/admin/ads');
      setAds(res.data);
    } catch (err) {
      console.error('Failed to fetch ads', err);
    }
  };

  const handleSave = async () => {
    try {
      await axios.post('/api/admin/ads', {
        slot: newSlot,
        code: newCode,
      });
      setMessage('Ad saved successfully');
      setNewSlot('');
      setNewCode('');
      fetchAds();
    } catch (err) {
      console.error('Error saving ad', err);
    }
  };

  useEffect(() => {
    fetchAds();
  }, []);

  return (
    <Container className="mt-4">
      <h3>Ad Management</h3>
      {message && <Alert variant="success">{message}</Alert>}

      <Form className="mb-4">
        <Form.Group className="mb-3">
          <Form.Label>Ad Slot Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="e.g., clicker, task-top"
            value={newSlot}
            onChange={(e) => setNewSlot(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Ad Code</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            value={newCode}
            onChange={(e) => setNewCode(e.target.value)}
          />
        </Form.Group>
        <Button onClick={handleSave}>Save Ad</Button>
      </Form>

      <h5>Current Ads</h5>
      <ul>
        {ads.map((ad) => (
          <li key={ad.slot}>
            <strong>{ad.slot}</strong>
            <div dangerouslySetInnerHTML={{ __html: ad.code }} />
          </li>
        ))}
      </ul>
    </Container>
  );
};

export default AdManagementPage;