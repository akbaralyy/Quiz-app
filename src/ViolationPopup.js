import React from 'react';
import './ViolationPopup.css';

const ViolationPopup = ({ count }) => {
  return (
    <div className="violation-popup">
      <p>You switched to another tab {count} times!</p>
    </div>
  );
};

export default ViolationPopup;
