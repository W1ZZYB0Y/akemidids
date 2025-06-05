import React from 'react';
import { NavLink } from 'react-router-dom';
import { BsHouseFill, BsGiftFill, BsPeopleFill, BsClipboardCheckFill } from 'react-icons/bs';
import './BottomNav.css';

const BottomNav = () => {
  return (
    <div className="bottom-nav">
      <NavLink to="/home" activeclassname="active"><BsHouseFill /></NavLink>
      <NavLink to="/tasks" activeclassname="active"><BsClipboardCheckFill /></NavLink>
      <NavLink to="/airdrop" activeclassname="active"><BsGiftFill /></NavLink>
      <NavLink to="/friends" activeclassname="active"><BsPeopleFill /></NavLink>
    </div>
  );
};

export default BottomNav;