import React, { useState, useEffect } from 'react';
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

  useEffect(() => {
  const fetchProfile = async () => {
    const tgId = window.Telegram?.WebApp?.initDataUnsafe?.user?.id;
    console.log("Telegram ID:", tgId);

    if (!tgId) {
      console.warn("Telegram ID not found. WebApp might not be initialized.");
      return;
    }

    try {
      const profile = await getUserProfile(tgId);
      console.log("Fetched user profile:", profile);

      setUser(profile);
      setUsernameInput(profile.username || '');

      if (!profile.username) {
        setShowUsernameModal(true);
      }

      if (profile.referralDetails) {
        setReferrals(profile.referralDetails);
      }
    } catch (err) {
      console.error("Error fetching user profile:", err.message);
    }
  };

  fetchProfile();
}, []);

const handleUsernameSubmit = async () => {
  if (!usernameInput.trim()) {
    return setError("Username is required");
  }

  try {
    await updateUsername(user.telegramId, usernameInput.trim());

    // Fetch updated profile with fallback
    const updatedProfile = await getUserProfile(user.telegramId || usernameInput.trim());

    setUser(updatedProfile);
    setUsernameInput(updatedProfile.username || '');
    setShowUsernameModal(false);
    setError('');
  } catch (err) {
    console.error(err);
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
          <div className="referral-box d-flex align-items-center">
            <input type="text" value={referralLink} readOnly className="form-control me-2" />
            <Button onClick={handleCopy} variant="secondary">Copy</Button>
          </div>
          {copied && <div className="text-success mt-2">Link copied!</div>}
        </>
      )}

      <hr />

      <h5>Your Referrals</h5>
      {referrals.length === 0 ? (
        <p>No referrals yet.</p>
      ) : (
        <Table striped bordered hover>
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
                <td>{ref.reward} 🪙</td>
                <td>{new Date(ref.date).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      {/* Username Modal – non-dismissable and single-use */}
      <Modal show={showUsernameModal} backdrop="static" keyboard={false} centered>
        <Modal.Header>
          <Modal.Title>Set Your Username</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Username</Form.Label>
            <Form.Control
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
