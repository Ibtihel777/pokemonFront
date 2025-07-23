import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Container,
  CircularProgress,
  Alert,
  IconButton,
  Chip
} from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import { getPokemons } from '../services/pokemonServices';

const HomePage = () => {
  // Pokémon carousel state
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Fetch pokemons
  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const data = await getPokemons();
        const enrichedData = data.map((pokemon) => ({
          ...pokemon,
          imageUrl: `https://img.pokemondb.net/artwork/large/${pokemon.name.toLowerCase().replace(/[\s.']/g, '-')}.jpg`,
        }));
        setPokemons(enrichedData);
      } catch (err) {
        setError(err.message || 'Failed to fetch Pokémon');
      } finally {
        setLoading(false);
      }
    };
    fetchPokemons();
  }, []);

  const handleNext = () => {
    setCurrentIndex(prev => (prev === pokemons.length - 1 ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setCurrentIndex(prev => (prev === 0 ? pokemons.length - 1 : prev - 1));
  };

  return (
    <Box sx={{ 
      position: 'relative',
      marginTop: '60px',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Background Section - Extreme Left Alignment */}
      <Box sx={{ 
        position: 'relative', 
        height: '60vh', 
        minHeight: '400px',
        display: 'flex',
        alignItems: 'center',
        pl: { xs: 2, sm: 4, md: 8, lg: 12 }, // Extreme left padding
      }}>
        {/* Background Image */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundImage: 'url(/back.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            zIndex: -1
          }}
        />
        
        {/* Text Content - Extreme Left */}
        <Box sx={{ 
          maxWidth: '600px',
          zIndex: 1,
        }}>
          <Typography
            variant="h3"
            component="h1"
            sx={{ 
              fontWeight: 700,
              color: 'white',
              fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
              mb: 2,
              textShadow: '2px 2px 4px rgba(0,0,0,0.8)'
            }}
          >
            WELCOME TO THE POKÉMON WORLD
          </Typography>
          
          <Typography
            variant="h6"
            component="p"
            sx={{ 
              color: 'rgba(255,255,255,0.9)',
              mb: 4,
              fontSize: { xs: '1rem', md: '1.1rem' },
              textShadow: '1px 1px 2px rgba(0,0,0,0.7)'
            }}
          >
            Discover and catch all your favorite Pokémon
          </Typography>
          
          <Button
            variant="contained"
            size="medium"
            href="#pokemon-slider"
            sx={{
              bgcolor: '#FFDE00',
              color: '#3B4CCA',
              fontWeight: 'bold',
              px: 4,
              py: 1,
              '&:hover': {
                bgcolor: '#FFE733'
              }
            }}
          >
            Explore Pokémon
          </Button>
        </Box>
      </Box>

      {/* Pokémon Slider Section - Directly Underneath */}
      <Box id="pokemon-slider" sx={{ 
        py: 6,
        px: 2,
        bgcolor: 'background.default'
      }}>
        <Container maxWidth="md">
          <Typography variant="h4" sx={{ 
            mb: 4,
            fontWeight: 600,
            textAlign: 'center'
          }}>
            Featured Pokemon
          </Typography>

          {loading ? (
            <Box display="flex" justifyContent="center">
              <CircularProgress size={60} />
            </Box>
          ) : error ? (
            <Alert severity="error">
              {error}
            </Alert>
          ) : pokemons.length > 0 ? (
            <Box sx={{ 
              position: 'relative',
              minHeight: '400px',
              display: 'flex',
              alignItems: 'center'
            }}>
              <IconButton 
                onClick={handlePrev}
                sx={{ 
                  position: 'absolute',
                  left: { xs: -2, sm: -4 },
                  zIndex: 1,
                  bgcolor: 'background.paper',
                  '&:hover': {
                    bgcolor: 'primary.main',
                    color: 'white'
                  }
                }}
              >
                <ChevronLeft fontSize="large" />
              </IconButton>

              <Box sx={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                px: 2
              }}>
                <Box sx={{
                  height: '300px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mb: 3
                }}>
                  <img 
                    src={pokemons[currentIndex].imageUrl} 
                    alt={pokemons[currentIndex].name}
                    style={{ 
                      maxHeight: '100%',
                      maxWidth: '100%',
                      objectFit: 'contain'
                    }}
                  />
                </Box>
                
                <Typography variant="h5" sx={{ mb: 1 }}>
                  {pokemons[currentIndex].name}
                </Typography>
                
                <Chip 
                  label={`${currentIndex + 1}/${pokemons.length}`}
                  color="primary"
                  sx={{ fontWeight: 500 }}
                />
              </Box>

              <IconButton 
                onClick={handleNext}
                sx={{ 
                  position: 'absolute',
                  right: { xs: -2, sm: -4 },
                  zIndex: 1,
                  bgcolor: 'background.paper',
                  '&:hover': {
                    bgcolor: 'primary.main',
                    color: 'white'
                  }
                }}
              >
                <ChevronRight fontSize="large" />
              </IconButton>
            </Box>
          ) : (
            <Alert severity="info">
              No Pokémon found
            </Alert>
          )}
        </Container>
      </Box>
    </Box>
  );
};

export default HomePage;