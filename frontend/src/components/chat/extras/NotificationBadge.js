import React from 'react';

const NotificationBadge = ({ count, effect }) => {
  return (
    <div className={`notification-badge ${effect}`}>
      {count}
    </div>
  );
};

export default NotificationBadge;
