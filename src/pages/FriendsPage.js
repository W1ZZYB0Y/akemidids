import React, { useEffect, useState } from 'react';
import { getUserProfile, updateUsername } from '../api/userApi';
import BottomNav from '../components/BottomNav';

const FriendsPage = () => {
  const [telegramId, setTelegramId] = useState('');
  const [userId, setUserId] = useState('');
  const [referralLink, setReferralLink] = useState('');
  const [referrals, setReferrals] = useState([]);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const telegramUser = window.Telegram?.WebApp?.initDataUnsafe?.user;

    if (telegramUser) {
      const id = telegramUser.id;
      const uname = telegramUser.username || `user${id}`;

      setTelegramId(id);

      // Update the username in your backend
      updateUsername(id, uname)
        .then(() => getUserProfile(id))
        .then((userData) => {
          if (userData) {
            setUserId(userData._id); // Mongo user id
            setReferralLink(`https://t.me/JawsGameBot/Jaws?start=${userData._id}`);
            setReferrals(userData.referralDetails || []);
          }
        })
        .catch((err) => {
          console.error('Error loading profile:', err);
        })
        .finally(() => setLoading(false));
    } else {
      console.warn('Telegram WebApp not available.');
      setLoading(false);
    }
  }, []);

  const handleCopy = () => {
    if (referralLink) {
      navigator.clipboard.writeText(referralLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  return (
    <div className="friends-container" style={{ padding: '20px', textAlign: 'center', color: '#fff' }}>
      <h2>Invite Your Friends</h2>
      <p>Share your referral link and earn rewards when your friends join and click!</p>

      {referralLink ? (
        <div style={{ marginBottom: '20px' }}>
          <input
            type="text"
            value={referralLink}
            readOnly
            style={{ width: '80%', padding: '10px', marginTop: '10px', borderRadius: '5px', textAlign: 'center' }}
          />
          <button
            onClick={handleCopy}
            style={{
              marginLeft: '10px',
              padding: '10px 20px',
              borderRadius: '5px',
              cursor: 'pointer',
              backgroundColor: '#00aaff',
              color: '#fff',
              border: 'none',
            }}
          >
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
      ) : (
        <p style={{ marginTop: '20px' }}>Loading referral link... Please open this app from Telegram.</p>
      )}

      <h3 style={{ marginTop: '30px' }}>Your Referrals</h3>
      {loading ? (
        <p>Loading...</p>
      ) : referrals.length === 0 ? (
        <p>No referrals yet.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {referrals.map((ref, index) => (
            <li key={index} style={{ margin: '10px 0' }}>
              @{ref.referredUser?.username || 'Unknown'} — Earned: {ref.reward} clicks
            </li>
          ))}
        </ul>
      )}

      <BottomNav />
    </div>
  );
};

export default FriendsPage;
