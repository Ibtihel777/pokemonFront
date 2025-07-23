import { useState, useEffect } from 'react';
import { 
  Container, 
  Card, 
  CardContent, 
  Typography, 
  Avatar, 
  Grid, 
  Divider, 
  CircularProgress, 
  Alert, 
  Rating,
  Box,
  Chip,
  Paper,
  useTheme
} from '@mui/material';
import api from '../services/api';

const ReviewPage = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const theme = useTheme();

  // Static reviewer data
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

  useEffect(() => {
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
        setError(err.message || 'Failed to fetch reviews');
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress size={60} thickness={4} />
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="sm" sx={{ mt: 4 }}>
        <Alert severity="error" sx={{ fontSize: '1.1rem' }}>
          {error}
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: 6 }}>
      <Box textAlign="center" mb={6}>
        <Typography 
          variant="h2" 
          component="h1" 
          sx={{ 
            fontWeight: 800,
            color: theme.palette.primary.main,
            textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
            mb: 2
          }}
        >
          Pokémon Reviews
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          See what trainers are saying about their Pokémon
        </Typography>
      </Box>
      
      {reviews.length === 0 ? (
        <Paper elevation={0} sx={{ p: 4, textAlign: 'center', borderRadius: 4 }}>
          <Typography variant="h5" color="text.secondary">
            No reviews yet. Be the first to review!
          </Typography>
        </Paper>
      ) : (
        <Grid container spacing={4}>
          {reviews.map((review) => (
            <Grid item xs={12} sm={6} md={4} key={review.id}>
              <Card 
                elevation={2} 
                sx={{ 
                  borderRadius: 4,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 6
                  }
                }}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box display="flex" alignItems="center" mb={2}>
                    <Avatar 
                      sx={{ 
                        width: 50, 
                        height: 50, 
                        mr: 2,
                        bgcolor: theme.palette.secondary.main,
                        color: 'white',
                        fontSize: '1rem'
                      }}
                    >
                      {getInitials(review.reviewerName)}
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
                  
                  <Box 
                    sx={{ 
                      backgroundColor: theme.palette.grey[100],
                      p: 2,
                      borderRadius: 2,
                      mb: 2,
                      position: 'relative',
                      '&:before': {
                        content: '"“"',
                        position: 'absolute',
                        top: 4,
                        left: 4,
                        fontSize: '2.5rem',
                        color: theme.palette.grey[300],
                        lineHeight: 1
                      }
                    }}
                  >
                    <Box display="flex" alignItems="center" mb={1}>
                      <Chip 
                        label={review.pokemonName} 
                        color="primary" 
                        size="small"
                        sx={{ fontWeight: 700, mr: 1 }}
                      />
                      <Rating 
                        value={review.rating} 
                        precision={0.5} 
                        readOnly 
                        size="small"
                        sx={{ ml: 'auto' }}
                      />
                    </Box>
                    
                    <Typography variant="body2" paragraph sx={{ pl: 3 }}>
                      {review.text}
                    </Typography>
                  </Box>
                  
                  <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="caption" color="text.secondary">
                      {review.date.toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric'
                      })}
                    </Typography>
                    <Typography variant="caption" color="primary">
                      #{review.id.toString().padStart(3, '0')}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default ReviewPage;