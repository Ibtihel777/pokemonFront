import { Grid } from '@mui/material';
import PokemonCard from './PokemonCard';

const PokemonList = ({ pokemons }) => {
  return (
    <>
      {pokemons.map((pokemon) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={pokemon.id}>
          <PokemonCard pokemon={pokemon} />
        </Grid>
      ))}
    </>
  );
};

export default PokemonList;