import { Card, CardContent, CardMedia, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const PokemonCard = ({ pokemon }) => {
  return (
    <Card>
      <CardMedia
        component="img"
        height="140"
        image={pokemon.imageUrl || 'https://via.placeholder.com/150'}
        alt={pokemon.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {pokemon.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Rating: {pokemon.rating || 'N/A'}
        </Typography>
        <Button
          component={Link}
          to={`/pokemons/${pokemon.id}`}
          size="small"
          color="primary"
        >
          View Details
        </Button>
      </CardContent>
    </Card>
  );
};

export default PokemonCard;