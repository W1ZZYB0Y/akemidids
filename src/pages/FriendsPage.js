import React, { useState } from 'react';
import BottomNav from '../components/BottomNav';
import './FriendsPage.css';

function FriendsPage() {
  const [username, setUsername] = useState('');
  const [referralLink, setReferralLink] = useState('');
  const generalLink = 'https://t.me/JawsGameBot/Jaws';

  const handleUsernameChange = (e) => {
    const input = e.target.value.trim().replace('@', '');
    setUsername(input);
    if (input) {
      setReferralLink(`https://t.me/JawsGameBot/Jaws?start=${input}`);
    } else {
      setReferralLink('');
    }
  };

  const copyToClipboard = () => {
    if (referralLink) {
      navigator.clipboard.writeText(referralLink);
      alert('Referral link copied!');
    }
  };

  return (
    <div className="friends-page">
      <h2 className="friends-title">Invite Your Friends</h2>
      <p className="friends-text">
        Enter your Telegram username below to generate your referral link.
      </p>

      <input
        type="text"
        placeholder="Enter your Telegram username"
        className="username-input"
        value={username}
        onChange={handleUsernameChange}
      />

      {referralLink && (
        <div className="referral-box">
          <input type="text" value={referralLink} readOnly className="code" />
          <button onClick={copyToClipboard} className="copy-button">Copy</button>
        </div>
      )}

      <div className="general-link-box mt-4">
        <p className="text-white mb-1">General Link</p>
        <input type="text" value={generalLink} readOnly className="code" />
      </div>

      <BottomNav />
    </div>
  );
}

export default FriendsPage;
