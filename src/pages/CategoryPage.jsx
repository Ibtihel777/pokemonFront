import { useEffect, useState } from 'react';
import {
  Container,
  CircularProgress,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { getCategories } from '../services/categoryService';

// Enhanced category icons with more options
const categoryIcons = {
  fire: '🔥',
  water: '💧',
  electric: '⚡',
  ice: '❄️',
  grass: '🌿',
  poison: '☠️',
  ground: '⛰️',
  rock: '🪨',
  bug: '🐛',
  ghost: '👻',
  steel: '🛡️',
  fighting: '🥊',
  flying: '🦅',
  psychic: '🔮',
  dark: '🌑',
  fairy: '🧚',
  dragon: '🐉',
  normal: '🟫',
  default: '❓'
};

const CategoryPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pokemonByCategory, setPokemonByCategory] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriesData = await getCategories();
        setCategories(categoriesData);
        
        // Fetch Pokémon for all categories immediately
        const pokemonData = {};
        for (const category of categoriesData) {
          try {
            const response = await fetch(`http://localhost:5029/PokemonReviewAPP/Category/pokemon/${category.id}`);
            pokemonData[category.id] = await response.json();
          } catch (err) {
            console.error(`Error fetching Pokémon for category ${category.id}:`, err);
            pokemonData[category.id] = [];
          }
        }
        setPokemonByCategory(pokemonData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getIconForCategory = (name) => {
    const key = name.toLowerCase();
    return categoryIcons[key] || categoryIcons['default'];
  };

  if (loading) return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
      <CircularProgress size={60} />
    </Box>
  );
  
  if (error) return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
      <Alert severity="error" sx={{ maxWidth: 500 }}>{error}</Alert>
    </Box>
  );

  return (
    <Container maxWidth="lg" sx={{ 
      pt: 10, // Added padding to account for navbar
      pb: 6,
      minHeight: '100vh'
    }}>
      {/* Enhanced title with animation */}
      <Box 
        sx={{ 
          textAlign: 'center',
          mb: 6,
          animation: 'fadeInDown 0.8s ease',
          '@keyframes fadeInDown': {
            '0%': {
              opacity: 0,
              transform: 'translateY(-20px)'
            },
            '100%': {
              opacity: 1,
              transform: 'translateY(0)'
            }
          }
        }}
      >
        <Typography 
          variant="h2" 
          component="h1" 
          sx={{ 
            fontWeight: 700,
            color: theme.palette.primary.main,
            textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
            mb: 1
          }}
        >
          Pokémon Categories
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Explore Pokémon by their types and attributes
        </Typography>
      </Box>

      {/* Enhanced table container with shadow and animation */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          animation: 'fadeIn 0.8s ease',
          '@keyframes fadeIn': {
            '0%': { opacity: 0 },
            '100%': { opacity: 1 }
          }
        }}
      >
        <TableContainer 
          component={Paper} 
          sx={{ 
            maxWidth: 1000,
            borderRadius: 4,
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
            border: `1px solid ${theme.palette.divider}`,
            overflow: 'hidden'
          }}
        >
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: theme.palette.primary.light }}>
                <TableCell sx={{ 
                  width: '30%',
                  fontWeight: 'bold',
                  fontSize: isMobile ? '0.9rem' : '1rem',
                  color: theme.palette.primary.contrastText
                }}>
                  Category
                </TableCell>
                <TableCell sx={{ 
                  width: '70%',
                  fontWeight: 'bold',
                  fontSize: isMobile ? '0.9rem' : '1rem',
                  color: theme.palette.primary.contrastText
                }}>
                  Pokémon
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {categories.map((category) => (
                <TableRow 
                  key={category.id} 
                  hover
                  sx={{
                    '&:nth-of-type(odd)': {
                      backgroundColor: theme.palette.action.hover
                    },
                    '&:hover': {
                      backgroundColor: theme.palette.action.selected
                    }
                  }}
                >
                  <TableCell>
                    <Box display="flex" alignItems="center">
                      <Avatar 
                        sx={{ 
                          width: 40, 
                          height: 40, 
                          fontSize: '1.8rem', 
                          mr: 2,
                          bgcolor: 'transparent',
                          color: theme.palette.text.primary
                        }}
                      >
                        {getIconForCategory(category.name)}
                      </Avatar>
                      <Typography 
                        variant="subtitle1" 
                        sx={{ 
                          fontWeight: 600,
                          textTransform: 'capitalize'
                        }}
                      >
                        {category.name}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {pokemonByCategory[category.id] ? (
                      pokemonByCategory[category.id].length > 0 ? (
                        <List 
                          dense 
                          sx={{ 
                            maxHeight: 200, 
                            overflow: 'auto',
                            '&::-webkit-scrollbar': {
                              width: '6px'
                            },
                            '&::-webkit-scrollbar-thumb': {
                              backgroundColor: theme.palette.primary.main,
                              borderRadius: '3px'
                            }
                          }}
                        >
                          {pokemonByCategory[category.id].map((pokemon) => (
                            <ListItem 
                              key={pokemon.id} 
                              disablePadding
                              sx={{
                                '&:hover': {
                                  backgroundColor: theme.palette.action.hover
                                }
                              }}
                            >
                              <ListItemText 
                                primary={
                                  <Typography 
                                    variant="body1" 
                                    sx={{ 
                                      fontWeight: 500,
                                      textTransform: 'capitalize'
                                    }}
                                  >
                                    {pokemon.name}
                                  </Typography>
                                } 
                                secondary={
                                  <Typography 
                                    variant="body2" 
                                    color="text.secondary"
                                  >
                                    Born: {new Date(pokemon.birthDate).toLocaleDateString()}
                                  </Typography>
                                } 
                                sx={{ pl: 2, py: 1 }}
                              />
                            </ListItem>
                          ))}
                        </List>
                      ) : (
                        <Typography 
                          variant="body2" 
                          color="text.secondary"
                          sx={{ fontStyle: 'italic' }}
                        >
                          No Pokémon in this category
                        </Typography>
                      )
                    ) : (
                      <Box display="flex" alignItems="center">
                        <CircularProgress size={20} sx={{ mr: 2 }} />
                        <Typography variant="body2">Loading Pokémon...</Typography>
                      </Box>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
};

export default CategoryPage;