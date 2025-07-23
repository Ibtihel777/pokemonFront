import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import CatchingPokemonIcon from '@mui/icons-material/CatchingPokemon';
import HomeIcon from '@mui/icons-material/Home';
import CategoryIcon from '@mui/icons-material/Category';
import GroupsIcon from '@mui/icons-material/Groups';
import ReviewsIcon from '@mui/icons-material/Reviews';
import PersonIcon from '@mui/icons-material/Person';
import PetsIcon from '@mui/icons-material/Pets';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: '#FFCB05', color: 'black', boxShadow: 3 }}>
      <Toolbar>
        <CatchingPokemonIcon sx={{ mr: 1, color: '#3B4CCA' }} />
        <Typography
          variant="h5"
          component="div"
          sx={{ flexGrow: 1, fontWeight: 'bold', color: '#3B4CCA' }}
        >
          Pokémon Review
        </Typography>

        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            startIcon={<HomeIcon />}
            component={Link}
            to="/"
            sx={{ color: '#3B4CCA', fontWeight: 'bold' }}
          >
            Home
          </Button>
          <Button
            startIcon={<PetsIcon />}
            component={Link}
            to="/pokemons"
            sx={{ color: '#3B4CCA', fontWeight: 'bold' }}
          >
            Pokémons
          </Button>
          <Button
            startIcon={<CategoryIcon />}
            component={Link}
            to="/categories"
            sx={{ color: '#3B4CCA', fontWeight: 'bold' }}
          >
            Categories
          </Button>
          <Button
            startIcon={<GroupsIcon />}
            component={Link}
            to="/owners"
            sx={{ color: '#3B4CCA', fontWeight: 'bold' }}
          >
            Owners
          </Button>
          <Button
            startIcon={<ReviewsIcon />}
            component={Link}
            to="/reviews"
            sx={{ color: '#3B4CCA', fontWeight: 'bold' }}
          >
            Reviews
          </Button>
          <Button
            startIcon={<PersonIcon />}
            component={Link}
            to="/reviewers"
            sx={{ color: '#3B4CCA', fontWeight: 'bold' }}
          >
            Reviewers
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
