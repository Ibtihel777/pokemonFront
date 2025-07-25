import { AppBar, Toolbar, Typography, Button, Box, Avatar } from '@mui/material';
import CatchingPokemonIcon from '@mui/icons-material/CatchingPokemon';
import HomeIcon from '@mui/icons-material/Home';
import CategoryIcon from '@mui/icons-material/Category';
import GroupsIcon from '@mui/icons-material/Groups';
import ReviewsIcon from '@mui/icons-material/Reviews';
import PersonIcon from '@mui/icons-material/Person';
import PetsIcon from '@mui/icons-material/Pets';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { keyframes } from '@emotion/react';
import { useTheme } from '@mui/material/styles';

const Navbar = () => {
  const [hoveredButton, setHoveredButton] = useState(null);
  const theme = useTheme();

  const spin = keyframes`
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  `;

  const pulse = keyframes`
    0% { transform: scale(1); }
    50% { transform: scale(1.05); }
    100% { transform: scale(1); }
  `;

  return (
    <AppBar 
      position="fixed" 
      sx={{ 
        background: 'linear-gradient(135deg, #FFCB05 0%, #3B4CCA 100%)',
        color: 'white',
        boxShadow: 3,
        py: 1,
        zIndex: theme.zIndex.drawer + 1
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        {/* Left side with logo and title */}
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center',
          '&:hover': {
            '& svg': {
              animation: `${spin} 0.5s ease`
            }
          }
        }}>
          <CatchingPokemonIcon sx={{ 
            mr: 1, 
            color: 'white',
            fontSize: '2rem',
            transition: 'all 0.3s ease'
          }} />
          <Typography
            variant="h5"
            component="div"
            sx={{ 
              fontWeight: 'bold',
              background: 'linear-gradient(to right, white, #FFDE00)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0 0 8px rgba(59,76,202,0.5)',
              letterSpacing: '1px'
            }}
          >
            Pokémon Review
          </Typography>
        </Box>

        {/* Navigation buttons */}
        <Box sx={{ 
          display: 'flex', 
          gap: 1,
          alignItems: 'center'
        }}>
          {[
            { icon: <HomeIcon />, text: 'Home', to: '/', anchor: null },
            { icon: <SportsEsportsIcon />, text: 'Games', to: '/', anchor: '#games-section' },
            { icon: <CategoryIcon />, text: 'Categories', to: '/categories', anchor: null },
            { icon: <ReviewsIcon />, text: 'Reviews', to: '/', anchor: '#reviews-section' },
          ].map((item, index) => (
            <Button
              key={index}
              startIcon={
                <Avatar sx={{
                  width: 24,
                  height: 24,
                  bgcolor: hoveredButton === index ? '#FFDE00' : 'rgba(255,255,255,0.2)',
                  transition: 'all 0.3s ease'
                }}>
                  {item.icon}
                </Avatar>
              }
              component={item.anchor ? 'a' : Link}
              to={item.to}
              href={item.anchor}
              onMouseEnter={() => setHoveredButton(index)}
              onMouseLeave={() => setHoveredButton(null)}
              sx={{ 
                color: 'white',
                fontWeight: 'bold',
                textTransform: 'uppercase',
                fontSize: '0.75rem',
                letterSpacing: '1px',
                px: 2,
                py: 1,
                borderRadius: '20px',
                '&:hover': {
                  animation: `${pulse} 0.5s ease`,
                  background: 'rgba(255,222,0,0.2)',
                  '& .MuiAvatar-root': {
                    transform: 'scale(1.2)'
                  }
                },
                transition: 'all 0.3s ease'
              }}
            >
              {item.text}
            </Button>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;