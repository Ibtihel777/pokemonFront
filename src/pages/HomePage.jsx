import React from 'react';
import { Container, Typography, Button, Grid, Box } from '@mui/material';

const HomePage = () => {
  return (
    <Box sx={{ position: 'relative', height: '100vh', overflow: 'hidden' }}>
      {/* 🌟 Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          top: 0,
          left: 0,
          zIndex: -1,
        }}
      >
        <source
          src="https://static.videezy.com/system/resources/previews/000/045/538/original/Pokemon-Go-Battle.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>

      {/* 🌟 Overlay content */}
      <Box
        sx={{
          position: 'relative',
          color: 'white',
          textAlign: 'center',
          py: 10,
          px: 2,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <Container maxWidth="md">
          <Typography
            variant="h2"
            gutterBottom
            sx={{ fontWeight: 'bold', textShadow: '3px 3px 6px #000' }}
          >
            Welcome to Pokémon Review App
          </Typography>

          <Typography
            variant="h5"
            gutterBottom
            sx={{ mb: 4, textShadow: '2px 2px 4px #000' }}
          >
            Discover your favorite Pokémon, read reviews, and explore their world!
          </Typography>

          <Button
            variant="contained"
            color="secondary"
            size="large"
            href="/pokemon"
            sx={{ fontWeight: 'bold', px: 4, py: 1.5 }}
          >
            Explore Pokémons
          </Button>

          <Grid container spacing={4} justifyContent="center" sx={{ mt: 5 }}>
            {[
              'https://media.giphy.com/media/DRfu7BT8ZK1uo/giphy.gif',
              'https://media.giphy.com/media/10LKovKon8DENq/giphy.gif',
              'https://media.giphy.com/media/ARSp9T7wwxNcs/giphy.gif',
            ].map((gif, index) => (
              <Grid item key={index}>
                <img src={gif} alt="pokemon" width="100" height="100" />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default HomePage;
