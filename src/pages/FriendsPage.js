import React, { useState, useEffect, useRef } from 'react';
import { Modal, Button, Form, Table } from 'react-bootstrap';
import { getUserProfile, updateUsername } from '../api/userApi';
import './FriendsPage.css';

function FriendsPage() {
  const [user, setUser] = useState(null);
  const [showUsernameModal, setShowUsernameModal] = useState(false);
  const [usernameInput, setUsernameInput] = useState('');
  const [error, setError] = useState('');
  const [referrals, setReferrals] = useState([]);
  const [copied, setCopied] = useState(false);
  const inputRef = useRef();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const tgId = window.Telegram?.WebApp?.initDataUnsafe?.user?.id;
        if (!tgId) return console.error('Telegram ID not found');
        const profile = await getUserProfile(tgId);
        setUser(profile);
        setUsernameInput(profile.username || '');
        if (!profile.username) setShowUsernameModal(true);
        if (profile.referralDetails) setReferrals(profile.referralDetails);
      } catch (err) {
        console.error('Fetch profile failed:', err.message);
      }
    };
    fetchProfile();
  }, []);

  useEffect(() => {
    if (showUsernameModal && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showUsernameModal]);

  const handleUsernameSubmit = async () => {
    if (!usernameInput.trim()) return setError("Username is required");

    try {
      const res = await updateUsername(user.telegramId, usernameInput.trim());
      setUser({ ...user, username: usernameInput.trim() });
      setShowUsernameModal(false);
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || "Username not available");
    }
  };

  const referralLink = user?.username
    ? `${window.location.origin}?ref=${user.username}`
    : '';

  const handleCopy = () => {
    if (!referralLink) return;
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="friends-page-container p-3">
      <h4>Invite Friends</h4>

      {user?.username && (
        <>
          <p>Share your referral link:</p>
          <div className="referral-box d-flex align-items-center mb-2">
            <input
              type="text"
              value={referralLink}
              readOnly
              className="form-control me-2"
            />
            <Button onClick={handleCopy} variant="secondary">
              {copied ? "Copied!" : "Copy"}
            </Button>
          </div>
        </>
      )}

      <hr />

      <h5>Your Referrals</h5>
      {referrals.length === 0 ? (
        <p>No referrals yet.</p>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Username</th>
              <th>Reward</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {referrals.map((ref, index) => (
              <tr key={index}>
                <td>{ref.referredUser?.username || "Unknown"}</td>
                <td>{ref.reward?.toLocaleString()} 🪙</td>
                <td>{new Date(ref.date).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      <Modal show={showUsernameModal} backdrop="static" centered>
        <Modal.Header>
          <Modal.Title>Set Your Username</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Username</Form.Label>
            <Form.Control
              ref={inputRef}
              type="text"
              value={usernameInput}
              onChange={(e) => setUsernameInput(e.target.value)}
              placeholder="Enter a unique username"
            />
          </Form.Group>
          {error && <p className="text-danger mt-2">{error}</p>}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleUsernameSubmit}>Confirm</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default FriendsPage;
