// src/pages/AirdropPage.js
import React from 'react';
import BottomNav from '../components/BottomNav';
import './AirdropPage.css';

function AirdropPage() {
  return (
    <div className="airdrop-page">
      
      <h2 className="airdrop-title">Claim Your Airdrop</h2>

      <p className="airdrop-instructions">
        Earn bonus coins by completing tasks and inviting friends. Complete each task to unlock rewards!
      </p>
      <ol className="airdrop-tasks">
        <li>Join our Telegram channel</li>
        <li>Follow us on Twitter</li>
        <li>Share your referral link</li>
        <li>Earn rewards after completing tasks</li>
      </ol>
      <h3>COMING SOON</h3>
      <button className="airdrop-claim-btn">Claim Airdrop</button>

      <BottomNav />
    </div>
  );
}

export default AirdropPage;