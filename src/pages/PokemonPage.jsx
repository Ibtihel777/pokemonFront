import { useState, useEffect } from 'react';
import { Container, CircularProgress, Alert, IconButton, Box } from '@mui/material';
import { getPokemons } from '../services/pokemonServices';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';

const PokemonPage = () => {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Helper function to generate image URL
  const getImageUrl = (name) => {
    const formattedName = name.toLowerCase().replace(/[\s.']/g, '-');
    return `https://img.pokemondb.net/artwork/large/${formattedName}.jpg`;
  };

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const data = await getPokemons();
        const enrichedData = data.map((pokemon) => ({
          ...pokemon,
          imageUrl: getImageUrl(pokemon.name),
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
    setCurrentIndex((prevIndex) => 
      prevIndex === pokemons.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? pokemons.length - 1 : prevIndex - 1
    );
  };

  if (loading)
    return (
      <Container className="text-center my-5">
        <CircularProgress />
      </Container>
    );

  if (error)
    return (
      <Container className="my-5">
        <Alert severity="error">{error}</Alert>
      </Container>
    );

  return (
    <Container className="py-4">
      <h1 className="text-center text-warning mb-4">Pokémons</h1>
      
      {pokemons.length > 0 ? (
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          position: 'relative',
          minHeight: '400px'
        }}>
          <IconButton 
            onClick={handlePrev}
            sx={{ position: 'absolute', left: 0, zIndex: 1 }}
            size="large"
          >
            <ChevronLeft fontSize="large" />
          </IconButton>

          <Box sx={{
            textAlign: 'center',
            padding: '0 60px',
            width: '100%'
          }}>
            <img 
              src={pokemons[currentIndex].imageUrl} 
              alt={pokemons[currentIndex].name}
              style={{ 
                maxHeight: '300px',
                maxWidth: '100%',
                objectFit: 'contain'
              }}
            />
            <h2>{pokemons[currentIndex].name}</h2>
            <p>Index: {currentIndex + 1} / {pokemons.length}</p>
          </Box>

          <IconButton 
            onClick={handleNext}
            sx={{ position: 'absolute', right: 0, zIndex: 1 }}
            size="large"
          >
            <ChevronRight fontSize="large" />
          </IconButton>
        </Box>
      ) : (
        <Alert severity="info">No Pokémon found</Alert>
      )}
    </Container>
  );
};

export default PokemonPage;