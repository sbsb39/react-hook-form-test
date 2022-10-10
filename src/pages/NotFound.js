import React, { memo } from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div>
      Not Found
      <button onClick={() => navigate('/')}>test</button>
    </div>
  );
};

export default memo(NotFound);
