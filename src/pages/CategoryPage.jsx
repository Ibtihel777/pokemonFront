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
  ListItemText
} from '@mui/material';
import { getCategories } from '../services/categoryService';

// Category icons using emojis
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

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <Container>
      <Typography variant="h3" component="h1" gutterBottom sx={{ my: 3 }}>
        Categories
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ width: '30%' }}>Category</TableCell>
              <TableCell sx={{ width: '70%' }}>Pokémon</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories.map((category) => (
              <TableRow key={category.id} hover>
                <TableCell>
                  <Box display="flex" alignItems="center">
                    <Avatar sx={{ width: 36, height: 36, fontSize: '1.5rem', mr: 2 }}>
                      {getIconForCategory(category.name)}
                    </Avatar>
                    <Typography variant="subtitle1">{category.name}</Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  {pokemonByCategory[category.id] ? (
                    pokemonByCategory[category.id].length > 0 ? (
                      <List dense sx={{ maxHeight: 200, overflow: 'auto' }}>
                        {pokemonByCategory[category.id].map((pokemon) => (
                          <ListItem key={pokemon.id} disablePadding>
                            <ListItemText 
                              primary={pokemon.name} 
                              secondary={`Born: ${new Date(pokemon.birthDate).toLocaleDateString()}`} 
                            />
                          </ListItem>
                        ))}
                      </List>
                    ) : (
                      <Typography variant="body2" color="text.secondary">
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
    </Container>
  );
};

export default CategoryPage;