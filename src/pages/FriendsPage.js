import React, { useEffect, useState } from 'react';
import { getUserProfile, updateUsername } from '../utils/UserApi';

const FriendsPage = () => {
  const [telegramId, setTelegramId] = useState('');
  const [username, setUsername] = useState('');
  const [referralLink, setReferralLink] = useState('');
  const [referrals, setReferrals] = useState([]);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const telegramUser = window.Telegram?.WebApp?.initDataUnsafe?.user;
    if (telegramUser) {
      const id = telegramUser.id;
      const uname = telegramUser.username;

      setTelegramId(id);
      setUsername(uname);
      setReferralLink(`https://t.me/YOUR_BOT_USERNAME?start=${uname}`);

      // Update backend with Telegram username
      updateUsername(id, uname)
        .then(() => {
          getUserProfile(id).then((data) => {
            setReferrals(data.referrals || []);
          });
        })
        .catch((err) => console.error('Username update error:', err));
    } else {
      console.warn('Telegram WebApp not available. Please open from Telegram.');
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
      <p>Share your referral link and earn rewards when your friends join and start clicking!</p>

      {referralLink ? (
        <div>
          <input
            type="text"
            value={referralLink}
            readOnly
            style={{ width: '80%', padding: '10px', marginTop: '10px', borderRadius: '5px' }}
          />
          <button onClick={handleCopy} style={{ marginLeft: '10px', padding: '10px 20px' }}>
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
      ) : (
        <p style={{ marginTop: '20px' }}>Loading referral link... Make sure you're opening this app from Telegram.</p>
      )}

      <h3 style={{ marginTop: '30px' }}>Your Referrals</h3>
      {referrals.length === 0 ? (
        <p>No referrals yet.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {referrals.map((ref, index) => (
            <li key={index} style={{ margin: '10px 0' }}>
              @{ref.username} - Earned: {ref.reward} clicks
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FriendsPage;
