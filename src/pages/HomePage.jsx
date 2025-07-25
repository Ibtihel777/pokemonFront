import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { keyframes } from '@emotion/react';

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


// Import Pokemon font (you'll need to include this in your project)
// Add this to your CSS or import the font file
const pokemonFontStyle = {
  fontFamily: '"Pokemon Solid", sans-serif',
  letterSpacing: '2px',
  textShadow: '3px 3px 0 #3B4CCA, -1px -1px 0 #3B4CCA, 1px -1px 0 #3B4CCA, -1px 1px 0 #3B4CCA, 1px 1px 0 #3B4CCA',
  color: '#FFDE00'
};
const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

const GameCard = styled(Card)(({ theme }) => ({
  maxWidth: 345,
  margin: 'auto',
  transition: '0.3s',
  borderRadius: '16px',
  boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: '0 12px 24px rgba(255,203,5,0.3)',
    animation: `${float} 3s ease infinite`,
  },
  background: 'linear-gradient(145deg, #ffffff, #f0f0f0)',
}));


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
const games = [
  {
    title: "Pokémon Legends: Arceus",
    image: "game1.jpg",
    description: "Experience a new style of Pokémon adventure in a Sinnoh of old. Catch, survey, and research wild Pokémon to create the region's first Pokédex!",
    year: 2022,
    rating: "9/10",
    platforms: ["Nintendo Switch"]
  },
 
  {
    title: "Pokémon Emerald",
    image: "game3.jpg",
    description: "The definitive version of the Hoenn adventures, featuring the Battle Frontier and an expanded storyline with both Team Aqua and Team Magma.",
    year: 2004,
    rating: "9/10",
    platforms: ["Game Boy Advance"]
  },
  {
    title: "Pokémon Platinum",
    image: "game5.jpg",
    description: "The enhanced version of Diamond and Pearl, with the Distortion World, Battle Frontier, and an expanded Sinnoh Pokédex.",
    year: 2008,
    rating: "9/10",
    platforms: ["Nintendo DS"]
  },
  {
    title: "Pokémon Black 2 & White 2",
    image: "game4.jpg",
    description: "Direct sequels to Black and White, featuring new areas, an expanded Pokédex, and the challenging Pokémon World Tournament.",
    year: 2012,
    rating: "9/10",
    platforms: ["Nintendo DS"]
  },
  
  {
    title: "Pokémon FireRed & LeafGreen",
    image: "game6.jpg",
    description: "Faithful remakes of the original Red and Blue games, now with updated graphics, the Sevii Islands, and compatibility with Ruby and Sapphire.",
    year: 2004,
    rating: "9/10",
    platforms: ["Game Boy Advance"]
  },
   {
    title: "Pokémon HeartGold & SoulSilver",
    image: "game2.jpg",
    description: "Return to the Johto region in these enhanced remakes of the classic Gold and Silver games, now with updated graphics and features.",
    year: 2009,
    rating: "9.5/10",
    platforms: ["Nintendo DS"]
  }
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
    if (categoriesLoading) return ['normal'];
    const pokemonCategories = [];
    categories.forEach(category => {
      if (pokemonByCategory[category.id]?.some(p => p.name === pokemonName)) {
        pokemonCategories.push(category.name.toLowerCase());
      }
    });
    return pokemonCategories.length > 0 ? pokemonCategories : ['normal'];
  };
  
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
              ...pokemonFontStyle,
              fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
              mb: 2,
              lineHeight: 1.2
            }}
          >
            WELCOME TO THE POKEMON WORLD
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
            Discover and catch all your favorite Pokemon
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
            Explore Pokemon
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
            <Typography variant="h4" sx={{ 
              mb: 4, 
              fontWeight: 600, 
              textAlign: 'center',
              ...pokemonFontStyle,
              fontSize: '2rem'
            }}>
              Pokédex
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
            <Typography variant="h4" sx={{ 
              mb: 4, 
              fontWeight: 600, 
              textAlign: 'center',
              ...pokemonFontStyle,
              fontSize: '2rem'
            }}>
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
          mt: 4,
          alignItems: 'flex-start'
        }}>
          {/* Events Section */}
          <Box sx={{ 
            width: { xs: '100%', lg: '50%' },
            position: { lg: 'sticky' },
            top: { lg: '80px' },
            alignSelf: 'flex-start'
          }}>
            <Typography variant="h4" sx={{ 
              mb: 3, 
              fontWeight: 600,
              ...pokemonFontStyle,
              fontSize: '2rem',
              textAlign: { xs: 'center', lg: 'left' }
            }}>
              Upcoming Events
            </Typography>

            <Paper elevation={3} sx={{ 
              borderRadius: 2, 
              overflow: 'hidden', 
              border: '2px solid #FFDE00',
              height: '100%'
            }}>
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

          {/* Reviews Section */}
          <Box id="reviews-section" sx={{ 
        width: { xs: '100%', lg: '50%' },
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }}>
            <Typography variant="h4" sx={{ 
              mb: 3, 
              fontWeight: 600,
              ...pokemonFontStyle,
              fontSize: '2rem',
              textAlign: { xs: 'center', lg: 'left' }
            }}>
                Reviews
            </Typography>

            {reviewsLoading ? (
              <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
                <CircularProgress size={40} />
              </Box>
            ) : reviews.length === 0 ? (
              <Paper elevation={0} sx={{ 
                p: 3, 
                textAlign: 'center', 
                borderRadius: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '200px'
              }}>
                <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
                  No reviews yet. Be the first to review!
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
              </Paper>
            ) : (
              <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <Grid container spacing={3}>
                  {reviews.slice(0, showAllReviews ? reviews.length : 1).map((review) => (
                    <Grid item xs={12} sm={6} key={review.id}>
                      <Card elevation={2} sx={{ 
                        borderRadius: 4, 
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column'
                      }}>
                        <CardContent sx={{ flex: 1 }}>
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
                
                <Box sx={{ 
                  mt: 3,
                  display: 'flex',
                  justifyContent: 'flex-end',
                  gap: 2,
                  flexWrap: 'wrap',
                  pr: 2
                }}>
                  {reviews.length > 1 && (
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
                  )}
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
              </Box>
            )}
          </Box>
        </Container>
      </Box>

     
      <Box id="games-section" sx={{ py: 8, bgcolor: 'background.paper' }}>
  <Container maxWidth="xl">
    <Typography 
      variant="h4" 
      component="h1" 
      gutterBottom 
      sx={{ 
        mb: 4, 
        fontWeight: 600, 
        textAlign: 'center',
        ...pokemonFontStyle,
        fontSize: '2rem'
      }}
    >
      Best Pokémon Games
    </Typography>
    
    <Typography 
      variant="h6" 
      component="h2" 
      sx={{ 
        textAlign: 'center', 
        mb: 6,
        color: 'text.secondary',
        fontSize: '1.1rem'
      }}
    >
      Explore the greatest Pokémon adventures through the years
    </Typography>

    <Grid container spacing={4}>
      {games.map((game, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <GameCard>
            <CardMedia
              component="img"
              height="200"
              image={game.image}
              alt={game.title}
              sx={{ objectFit: 'cover' }}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
                {game.title}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                {game.description}
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Chip 
                  label={game.year} 
                  color="primary" 
                  size="small" 
                  sx={{ fontWeight: 'bold' }}
                />
                <Chip 
                  label={game.rating} 
                  color="success" 
                  size="small" 
                  sx={{ fontWeight: 'bold' }}
                />
              </Box>
              <Box sx={{ mt: 2 }}>
                {game.platforms.map((platform, i) => (
                  <Chip 
                    key={i}
                    label={platform} 
                    variant="outlined" 
                    size="small" 
                    sx={{ mr: 1, mb: 1 }}
                  />
                ))}
              </Box>
            </CardContent>
          </GameCard>
        </Grid>
      ))}
    </Grid>
  </Container>
</Box>
    </Box>
  );
};

export default HomePage;