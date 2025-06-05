import React, { useState } from 'react';
import { BsContainer, BsCard, BsButton, BsSpinner } from 'react-icons/bs';

const AdTaskPage = () => {
  const [watching, setWatching] = useState(false);
  const [watched, setWatched] = useState(false);

  const handleWatchAd = () => {
    setWatching(true);
    setTimeout(() => {
      setWatching(false);
      setWatched(true);
      localStorage.setItem('jaws-balance', currentBal + 50);
    }, 5000); // simulate 5 sec ad
  };

  return (
    <BsContainer className="mt-5">
      <BsCard className="p-4 text-center">
        <h3>Watch an Ad</h3>
        <p>Watch a short ad to earn 50 JAWS</p>

        {watching ? (
          <>
            <BsSpinner animation="border" variant="primary" />
            <p className="mt-3">Ad playing... Please wait</p>
          </>
        ) : watched ? (
          <p className="text-success fw-bold">Ad watched! You earned 50 JAWS</p>
        ) : (
          <BsButton onClick={handleWatchAd}>Watch Ad</BSButton>
        )}
      </BsCard>
    </BsContainer>
  );
};

export default AdTaskPage;