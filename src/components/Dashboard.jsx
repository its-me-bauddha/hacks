import React, { useState, useEffect } from 'react';
import { Container, Box, Typography, Button, Grid } from '@mui/material';
import Profile from './Profile';
import axios from 'axios';

const Dashboard = () => {
  const [user, setUser] = useState({ name: '', profilePhoto: '', points: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:8000/users/1')
      .then(response => {
        setUser(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("There was an error fetching the user data!", error);
      });
  }, []);

  const handleRedeem = () => {
    if (user.points >= 10) {
      axios.patch('http://localhost:8000/users/1', { points: user.points - 10 })
        .then(response => {
          setUser(prevUser => ({ ...prevUser, points: prevUser.points - 10 }));
        })
        .catch(error => {
          console.error("There was an error redeeming the points!", error);
        });
    } else {
      alert("Not enough points to redeem!");
    }
  };

  if (loading) {
    return <Typography variant="h4" sx={{ textAlign: 'center', marginTop: 5 }}>Loading...</Typography>;
  }

  return (
    <Container>
      <Box sx={{ flexGrow: 1, padding: 5 }}>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} md={4}>
            <Profile name={user.name} profilePhoto={user.profilePhoto} />
         
          </Grid>
          <Grid item xs={12} md={8}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h4">Total Coins: {user.points}</Typography>
              <Button 
                variant="contained" 
                color="primary" 
                onClick={handleRedeem}
                sx={{ marginTop: 2, marginRight: 2 }}
              >
                Redeem Coins
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Dashboard;
