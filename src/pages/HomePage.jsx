import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Container,
  CircularProgress,
  Alert,
  IconButton,
  Chip,
  Card,
  CardMedia,
  Fade,
  List,
  ListItem,
  ListItemText,
  Divider,
  Avatar,
  Paper
} from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import { getPokemons } from '../services/pokemonServices';

const cardData = [
  { image: '/card2.jpg', name: "Glaceon" },
  { image: '/card3.jpg', name: "Leafeon" },
  { image: '/card4.jpg', name: "Flareon" },
  { image: '/card5.jpg', name: "Vaporeon" },
  { image: '/card6.jpg', name: "Sylveon" },
  { image: '/card7.jpg', name: "Umbreon" }
];

const pokemonEvents = [
  {
    title: 'Pikachu Day',
    date: 'Nov 18',
    time: '2-5PM',
    color: '#FFDE00',
    icon: '⚡',
    description: 'Special Pikachu appearances'
  },
  {
    title: 'Mewtwo Raid',
    date: 'Nov 22',
    time: '6-7PM',
    color: '#8A2BE2',
    icon: '🌀',
    description: 'Legendary raids!'
  },
  {
    title: 'New Gen',
    date: 'Dec 1',
    time: 'All Day',
    color: '#3B4CCA',
    icon: '🎉',
    description: 'New Pokémon!'
  },
  {
    title: 'Double XP',
    date: 'Dec 9-11',
    time: 'Weekend',
    color: '#4CAF50',
    icon: '✨',
    description: '2x XP bonus'
  }
];

const HomePage = () => {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [fadeIn, setFadeIn] = useState(true);

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

  useEffect(() => {
    const cardInterval = setInterval(() => {
      setFadeIn(false);
      setTimeout(() => {
        setCurrentCardIndex(prev => (prev === cardData.length - 1 ? 0 : prev + 1));
        setFadeIn(true);
      }, 500);
    }, 3000);

    return () => clearInterval(cardInterval);
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
      {/* Hero Section */}
      <Box sx={{ 
        position: 'relative', 
        height: '60vh', 
        minHeight: '400px',
        display: 'flex',
        alignItems: 'center',
        pl: { xs: 2, sm: 4, md: 8, lg: 12 },
      }}>
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
        
        <Box sx={{ maxWidth: '600px', zIndex: 1 }}>
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

      {/* Main Content */}
      <Box sx={{ 
        display: 'flex',
        flexDirection: 'column',
        py: 4,
        px: 2,
        bgcolor: 'background.default'
      }}>
        {/* Pokémon Slider and Cards */}
        <Container maxWidth="lg" sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', md: 'row' }, 
          gap: 4,
          px: { xs: 0, md: 2 },
          mb: 4
        }}>
          {/* Pokémon Slider */}
          <Box sx={{ flex: 1 }}>
            <Typography variant="h4" sx={{ mb: 4, fontWeight: 600, textAlign: 'center' }}>
              Featured Pokémon
            </Typography>

            {loading ? (
              <Box display="flex" justifyContent="center">
                <CircularProgress size={60} />
              </Box>
            ) : error ? (
              <Alert severity="error">{error}</Alert>
            ) : pokemons.length > 0 ? (
              <Box sx={{ position: 'relative', minHeight: '400px', display: 'flex', alignItems: 'center' }}>
                <IconButton 
                  onClick={handlePrev}
                  sx={{ 
                    position: 'absolute',
                    left: { xs: -2, sm: -4 },
                    zIndex: 1,
                    bgcolor: 'background.paper',
                    '&:hover': { bgcolor: 'primary.main', color: 'white' }
                  }}
                >
                  <ChevronLeft fontSize="large" />
                </IconButton>

                <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', px: 2 }}>
                  <Box sx={{ height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 3 }}>
                    <img 
                      src={pokemons[currentIndex].imageUrl} 
                      alt={pokemons[currentIndex].name}
                      style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }}
                    />
                  </Box>
                  
                  <Typography variant="h5" sx={{ mb: 1 }}>{pokemons[currentIndex].name}</Typography>
                  
                  <Chip label={`${currentIndex + 1}/${pokemons.length}`} color="primary" sx={{ fontWeight: 500 }} />
                </Box>

                <IconButton 
                  onClick={handleNext}
                  sx={{ 
                    position: 'absolute',
                    right: { xs: -2, sm: -4 },
                    zIndex: 1,
                    bgcolor: 'background.paper',
                    '&:hover': { bgcolor: 'primary.main', color: 'white' }
                  }}
                >
                  <ChevronRight fontSize="large" />
                </IconButton>
              </Box>
            ) : (
              <Alert severity="info">No Pokémon found</Alert>
            )}
          </Box>

          {/* Card Display */}
          <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant="h4" sx={{ mb: 4, fontWeight: 600, textAlign: 'center', color: '#3B4CCA' }}>
              Eevee Evolutions
            </Typography>

            <Fade in={fadeIn} timeout={500}>
              <Card sx={{ 
                maxWidth: 350,
                borderRadius: 4,
                boxShadow: 6,
                position: 'relative',
                overflow: 'visible',
                '&:before': {
                  content: '""',
                  position: 'absolute',
                  top: -10,
                  left: -10,
                  right: -10,
                  bottom: -10,
                  background: 'linear-gradient(45deg, #FFCB05, #3B4CCA)',
                  borderRadius: 8,
                  zIndex: -1,
                  opacity: 0.7
                }
              }}>
                <CardMedia
                  component="img"
                  image={cardData[currentCardIndex].image}
                  alt={cardData[currentCardIndex].name}
                  sx={{
                    objectFit: 'contain',
                    p: 1,
                    backgroundColor: 'white',
                    borderRadius: 3
                  }}
                />
              </Card>
            </Fade>

            <Box sx={{ display: 'flex', gap: 1, mt: 3 }}>
              {cardData.map((_, index) => (
                <Box
                  key={index}
                  sx={{
                    width: 10,
                    height: 10,
                    borderRadius: '50%',
                    bgcolor: index === currentCardIndex ? '#FFCB05' : 'grey.400',
                    transition: 'all 0.3s ease'
                  }}
                />
              ))}
            </Box>
          </Box>
        </Container>

        {/* Events Section - Extreme Left */}
        <Box sx={{ 
          width: '100%',
          pl: { xs: 2, sm: 4, md: 8, lg: 12 },
          pr: { xs: 2, sm: 4, md: 8, lg: 12 },
          mt: 4
        }}>
          <Box sx={{ maxWidth: '400px' }}>
            <Typography variant="h4" sx={{ mb: 3, fontWeight: 600, color: '#3B4CCA' }}>
              Upcoming Events
            </Typography>

            <Paper elevation={3} sx={{ borderRadius: 2, overflow: 'hidden', border: '2px solid #FFDE00' }}>
              <List dense sx={{ py: 0 }}>
                {pokemonEvents.map((event, index) => (
                  <React.Fragment key={index}>
                    <ListItem 
                      sx={{ 
                        py: 1.5,
                        px: 3,
                        bgcolor: `${event.color}15`,
                        '&:hover': { bgcolor: `${event.color}25` }
                      }}
                    >
                      <Avatar sx={{ 
                        width: 32,
                        height: 32,
                        bgcolor: event.color,
                        mr: 2,
                        color: 'white',
                        fontSize: '1rem'
                      }}>
                        {event.icon}
                      </Avatar>
                      <ListItemText
                        primary={
                          <Typography variant="body1" sx={{ fontWeight: 'bold', lineHeight: 1.2 }}>
                            {event.title}
                          </Typography>
                        }
                        secondary={
                          <Typography variant="body2" sx={{ lineHeight: 1.2 }}>
                            {event.date} • {event.time}
                            <Box component="span" sx={{ display: 'block', fontSize: '0.8rem', color: 'text.secondary' }}>
                              {event.description}
                            </Box>
                          </Typography>
                        }
                        sx={{ my: 0 }}
                      />
                    </ListItem>
                    {index < pokemonEvents.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
            </Paper>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default HomePage;