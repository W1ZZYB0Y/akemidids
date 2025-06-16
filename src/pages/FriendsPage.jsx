import React, { useEffect, useState } from 'react';
import axios from 'axios';

const FriendsPage = () => {
  const [username, setUsername] = useState('');
  const [referrals, setReferrals] = useState([]);
  const [userId, setUserId] = useState('');
  const [referralLink, setReferralLink] = useState('');
  const [inputUsername, setInputUsername] = useState('');

  const fetchReferrals = async () => {
    if (!username) return;
    try {
      const res = await axios.get(`/api/users/referrals/${username}`);
      setReferrals(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchUserId = async () => {
    try {
      const res = await axios.get(`/api/users/telegram/${window.Telegram.WebApp.initDataUnsafe?.user?.id}`);
      setUserId(res.data._id);
      setUsername(res.data.username);
      setReferralLink(`${window.location.origin}?ref=${res.data.username}`);
    } catch (err) {
      console.error(err);
    }
  };

  const handleUsernameSubmit = async () => {
    try {
      await axios.post(`/api/users/update-username`, {
        telegramId: window.Telegram.WebApp.initDataUnsafe?.user?.id,
        username: inputUsername
      });
      setUsername(inputUsername);
      setReferralLink(`${window.location.origin}?ref=${inputUsername}`);
      fetchReferrals();
    } catch (err) {
      alert('Username is taken or invalid.');
    }
  };

  useEffect(() => {
    fetchUserId();
  }, []);

  useEffect(() => {
    if (username) fetchReferrals();
  }, [username]);

  return (
    <div className="container">
      {!username ? (
        <div>
          <p>Enter your Telegram username:</p>
          <input value={inputUsername} onChange={(e) => setInputUsername(e.target.value)} />
          <button onClick={handleUsernameSubmit}>Save Username</button>
        </div>
      ) : (
        <>
          <h3>Your Referral Link</h3>
          <input value={referralLink} readOnly />
          <button onClick={() => navigator.clipboard.writeText(referralLink)}>Copy</button>

          <h4>Referrals</h4>
          {referrals.length === 0 ? (
            <p>No referrals yet.</p>
          ) : (
            <ul>
              {referrals.map((ref, index) => (
                <li key={index}>
                  @{ref.referredUser?.username || 'N/A'} – Reward: {ref.reward} coins
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
};

export default FriendsPage;
