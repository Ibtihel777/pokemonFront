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
  Paper,
  Rating as MuiRating,
  Grid,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Snackbar
} from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import { getCategories } from '../services/categoryService';
import { getPokemons } from '../services/pokemonServices';
import api from '../services/api';

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


const reviewers = [
  {id: 11, firstName: "Ash", lastName: "Ketchum"},
  {id: 12, firstName: "Misty", lastName: "Waterflower"},
  {id: 13, firstName: "Brock", lastName: "Slate"},
  {id: 14, firstName: "Serena", lastName: "Yvonne"},
  {id: 15, firstName: "Gary", lastName: "Oak"},
  {id: 16, firstName: "Dawn", lastName: "Berlitz"},
  {id: 17, firstName: "May", lastName: "Maple"},
  {id: 18, firstName: "Cynthia", lastName: "Shirona"},
  {id: 19, firstName: "Lance", lastName: "Dragonsbane"},
  {id: 20, firstName: "Professor", lastName: "Oak"}
];

const HomePage = () => {
  const [categories, setCategories] = useState([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [pokemonByCategory, setPokemonByCategory] = useState({});
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [fadeIn, setFadeIn] = useState(true);
  const [reviews, setReviews] = useState([]);
  const [reviewsLoading, setReviewsLoading] = useState(true);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [openReviewDialog, setOpenReviewDialog] = useState(false);
  const [newReview, setNewReview] = useState({
    pokemonName: '',
    rating: 0,
    text: ''
  });
  
  // Ajoutez ces fonctions en haut de votre composant (avant le return)
const getTypeIcon = (type) => {
  const typeIcons = {
    fire: '🔥',
    water: '💧',
    grass: '🌿',
    electric: '⚡',
    psychic: '🌀',
    ice: '❄️',
    dragon: '🐉',
    dark: '🌑',
    fairy: '✨',
    normal: '🟤',
    fighting: '🥊',
    flying: '🕊️',
    poison: '☠️',
    ground: '⛰️',
    rock: '🪨',
    bug: '🐛',
    ghost: '👻',
    steel: '⚙️'
  };
  return typeIcons[type.toLowerCase()] || '❓';
};

const getTypeColor = (type) => {
  const typeColors = {
    fire: '#F08030',
    water: '#6890F0',
    grass: '#78C850',
    electric: '#F8D030',
    psychic: '#F85888',
    ice: '#98D8D8',
    dragon: '#7038F8',
    dark: '#705848',
    fairy: '#EE99AC',
    normal: '#A8A878',
    fighting: '#C03028',
    flying: '#A890F0',
    poison: '#A040A0',
    ground: '#E0C068',
    rock: '#B8A038',
    bug: '#A8B820',
    ghost: '#705898',
    steel: '#B8B8D0'
  };
  return typeColors[type.toLowerCase()] || '#777';
};
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  

  const getReviewerName = (reviewId) => {
    const reviewerIndex = (reviewId - 11) % reviewers.length;
    const reviewer = reviewers[reviewerIndex] || {firstName: "Unknown", lastName: "Trainer"};
    return `${reviewer.firstName} ${reviewer.lastName}`;
  };

  const getInitials = (name) => {
    if (!name) return '?';
    return name.split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };
  const getPokemonCategories = (pokemonName) => {
  if (categoriesLoading) return ['normal']; // Default while loading
  
  // Find which categories this Pokémon belongs to
  const pokemonCategories = [];
  
  categories.forEach(category => {
    if (pokemonByCategory[category.id]?.some(p => p.name === pokemonName)) {
      pokemonCategories.push(category.name.toLowerCase());
    }
  });
  
  return pokemonCategories.length > 0 ? pokemonCategories : ['normal'];
};
  //  this useEffect for fetching categories
 useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (err) {
        console.error('Error fetching categories:', err);
      } finally {
        setCategoriesLoading(false);
      }
    };
    fetchCategories();
  }, []);
  // Fetch Pokémon for categories
  useEffect(() => {
    const fetchPokemonForCategories = async () => {
      if (categoriesLoading || categories.length === 0) return;
      
      const pokemonData = {};
      for (const category of categories) {
        try {
          const response = await fetch(`http://localhost:5029/PokemonReviewAPP/Category/pokemon/${category.id}`);
          pokemonData[category.id] = await response.json();
        } catch (err) {
          console.error(`Error fetching Pokémon for category ${category.id}:`, err);
          pokemonData[category.id] = [];
        }
      }
      setPokemonByCategory(pokemonData);
    };

    fetchPokemonForCategories();
  }, [categories, categoriesLoading]);

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
       const fetchReviews = async () => {
      try {
        const response = await api.get('/review');
        const processedReviews = response.data.map((review) => ({
          ...review,
          reviewerName: getReviewerName(review.id),
          date: new Date(),
          pokemonName: review.title
        }));
        setReviews(processedReviews);
      } catch (err) {
        console.error('Failed to fetch reviews:', err);
      } finally {
        setReviewsLoading(false);
      }
    };

    fetchPokemons();
    fetchReviews();

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

  const handleOpenReviewDialog = () => {
    setOpenReviewDialog(true);
  };

  const handleCloseReviewDialog = () => {
    setOpenReviewDialog(false);
    setNewReview({ pokemonName: '', rating: 0, text: '' });
  };

  const handleReviewChange = (e) => {
    const { name, value } = e.target;
    setNewReview(prev => ({ ...prev, [name]: value }));
  };

  const handleRatingChange = (event, newValue) => {
    setNewReview(prev => ({ ...prev, rating: newValue }));
  };

const handleSubmitReview = async () => {
    try {
        const response = await api.post('/review', {
            Title: newReview.pokemonName,
            Text: newReview.text,
            Rating: newReview.rating
        });
        
        const addedReview = {
            ...response.data,
            reviewerName: "You",
            date: new Date(),
            pokemonName: newReview.pokemonName
        };
        
        setReviews(prev => [addedReview, ...prev]);
        setSnackbarMessage('Review submitted successfully!');
        setSnackbarOpen(true);
        handleCloseReviewDialog();
    } catch (err) {
        console.error('Failed to submit review:', err);
        setSnackbarMessage(err.response?.data?.title || 'Failed to submit review. Please try again.');
        setSnackbarOpen(true);
    }
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
        
        {/* Static type display */}
        {/* Inside the slider section, replace the static type display with: */}
<Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
  {getPokemonCategories(pokemons[currentIndex].name).map((type) => (
    <Chip
      key={type}
      label={type.charAt(0).toUpperCase() + type.slice(1)}
      avatar={
        <Avatar sx={{ 
          bgcolor: 'transparent',
          color: 'inherit',
          width: 24,
          height: 24
        }}>
          {getTypeIcon(type)}
        </Avatar>
      }
      sx={{
        backgroundColor: getTypeColor(type),
        color: 'white',
        fontWeight: 'bold'
      }}
    />
  ))}
</Box>
        
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

        {/* Combined Events and Reviews Section */}
        <Container maxWidth="lg" sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', lg: 'row' }, 
          gap: 4,
          px: { xs: 0, md: 2 },
          mt: 4
        }}>
          {/* Events Section - now taking half width */}
          <Box sx={{ 
            width: { xs: '100%', lg: '50%' },
            position: { lg: 'sticky' },
            top: { lg: '80px' },
            alignSelf: 'flex-start'
          }}>
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
                        px: 2,
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

          {/* Reviews Section - now taking half width */}
          <Box sx={{ 
            width: { xs: '100%', lg: '50%' },
            alignSelf: 'flex-start'
          }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
              <Typography variant="h4" sx={{ fontWeight: 600, color: '#3B4CCA' }}>
                Trainer Reviews
              </Typography>
              <Button 
                variant="contained"
                onClick={handleOpenReviewDialog}
                sx={{
                  bgcolor: '#3B4CCA',
                  color: 'white',
                  '&:hover': {
                    bgcolor: '#2a3a9a'
                  }
                }}
              >
                Add Review
              </Button>
            </Box>

            {reviewsLoading ? (
              <Box display="flex" justifyContent="center">
                <CircularProgress size={40} />
              </Box>
            ) : reviews.length === 0 ? (
              <Paper elevation={0} sx={{ p: 3, textAlign: 'center', borderRadius: 4 }}>
                <Typography variant="h6" color="text.secondary">
                  No reviews yet. Be the first to review!
                </Typography>
              </Paper>
            ) : (
              <Box>
                <Grid container spacing={3}>
                  {reviews.slice(0, showAllReviews ? reviews.length : 1).map((review) => (
                    <Grid item xs={12} sm={6} key={review.id}>
                      <Card elevation={2} sx={{ borderRadius: 4, height: '100%' }}>
                        <CardContent>
                          <Box display="flex" alignItems="center" mb={2}>
                            <Avatar sx={{ 
                              width: 50, 
                              height: 50, 
                              mr: 2,
                              bgcolor: review.reviewerName === "You" ? '#4CAF50' : 'secondary.main',
                              color: 'white',
                              fontSize: '1rem'
                            }}>
                              {review.reviewerName === "You" ? "Y" : getInitials(review.reviewerName)}
                            </Avatar>
                            <Box>
                              <Typography variant="subtitle1" fontWeight="600">
                                {review.reviewerName}
                              </Typography>
                              <Typography variant="caption" color="text.secondary">
                                Pokémon Trainer
                              </Typography>
                            </Box>
                          </Box>
                          
                          <Box mb={2}>
                            <Chip 
                              label={review.pokemonName} 
                              color="primary" 
                              size="small"
                              sx={{ fontWeight: 700, mb: 1 }}
                            />
                            <MuiRating 
                              value={review.rating} 
                              precision={0.5} 
                              readOnly 
                              size="small"
                            />
                          </Box>
                          
                          <Typography variant="body2" paragraph>
                            {review.text}
                          </Typography>
                          
                          <Typography variant="caption" color="text.secondary">
                            Reviewed on {review.date.toLocaleDateString()}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
                
                {reviews.length > 1 && (
                  <Box display="flex" justifyContent="center" mt={3}>
                    <Button 
                      variant="outlined" 
                      onClick={() => setShowAllReviews(!showAllReviews)}
                      sx={{
                        color: '#3B4CCA',
                        borderColor: '#3B4CCA',
                        '&:hover': {
                          backgroundColor: '#3B4CCA10',
                          borderColor: '#3B4CCA'
                        }
                      }}
                    >
                      {showAllReviews ? 'Show Less' : `Show More (${reviews.length - 1})`}
                    </Button>
                  </Box>
                )}
              </Box>
            )}
          </Box>
        </Container>
      </Box>

      {/* Review Form Dialog */}
      <Dialog open={openReviewDialog} onClose={handleCloseReviewDialog}>
        <DialogTitle>Add Your Review</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="pokemonName"
            label="Pokémon Name"
            type="text"
            fullWidth
            variant="outlined"
            value={newReview.pokemonName}
            onChange={handleReviewChange}
            sx={{ mb: 2 }}
          />
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Typography variant="body1" sx={{ mr: 2 }}>
              Rating:
            </Typography>
            <MuiRating
              name="rating"
              value={newReview.rating}
              onChange={handleRatingChange}
              precision={0.5}
            />
          </Box>
          <TextField
            margin="dense"
            name="text"
            label="Your Review"
            type="text"
            fullWidth
            variant="outlined"
            multiline
            rows={4}
            value={newReview.text}
            onChange={handleReviewChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseReviewDialog}>Cancel</Button>
          <Button 
            onClick={handleSubmitReview}
            disabled={!newReview.pokemonName || !newReview.text}
            variant="contained"
            sx={{
              bgcolor: '#3B4CCA',
              color: 'white',
              '&:hover': {
                bgcolor: '#2a3a9a'
              }
            }}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>

      {/* Success/Failure Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
      />
    </Box>
  );
};

export default HomePage;