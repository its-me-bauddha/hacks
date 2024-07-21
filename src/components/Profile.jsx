import React from 'react';
import { Avatar, Typography } from '@mui/material';

const Profile = ({ name, profilePhoto }) => {
  return (
    <div style={{ textAlign: 'center' }}>
      <Avatar 
        alt={name} 
        src={profilePhoto} 
        sx={{ width: 100, height: 100, margin: '0 auto' }} 
      />
      <Typography variant="h6" sx={{ marginTop: 2 }}>
        {name}
      </Typography>
    </div>
  );
};

export default Profile;
