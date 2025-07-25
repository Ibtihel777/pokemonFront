import { Container, Typography, Grid, Card, CardMedia, CardContent, Box, Chip } from '@mui/material';
import { styled } from '@mui/material/styles';
import { keyframes } from '@emotion/react';

// Animation for the cards
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

const GamesPage = () => {
  return (
    <Container maxWidth="xl" sx={{ py: 8, mt: 10 }}>
      <Typography 
        variant="h2" 
        component="h1" 
        gutterBottom 
        sx={{ 
          fontWeight: 'bold', 
          textAlign: 'center',
          background: 'linear-gradient(to right, #3B4CCA, #FFCB05)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          mb: 6,
          textShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}
      >
        Best Pokémon Games
      </Typography>
      
      <Typography 
        variant="h5" 
        component="h2" 
        sx={{ 
          textAlign: 'center', 
          mb: 6,
          color: 'text.secondary'
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
  );
};

export default GamesPage;