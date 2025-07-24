import { Box, Container, Typography, Link, IconButton, Divider } from '@mui/material';
import { styled } from '@mui/material/styles';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import CatchingPokemonIcon from '@mui/icons-material/CatchingPokemon';

const FooterContainer = styled(Box)(({ theme }) => ({
  backgroundColor: '#3B4CCA',
  color: 'white',
  padding: theme.spacing(3, 0),
  borderTop: '3px solid #FFCB05'
}));

const SocialIcon = styled(IconButton)(({ theme }) => ({
  color: 'white',
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
  margin: theme.spacing(0, 0.5),
  padding: theme.spacing(0.8),
  '&:hover': {
    backgroundColor: '#FFCB05',
    color: '#3B4CCA'
  }
}));

const FooterLink = styled(Link)(({ theme }) => ({
  color: 'white',
  margin: theme.spacing(0, 1),
  textDecoration: 'none',
  fontSize: '0.85rem', // Increased from 0.8rem
  '&:hover': {
    color: '#FFCB05',
    textDecoration: 'underline'
  }
}));

const Footer = () => {
  return (
    <FooterContainer component="footer">
      <Container maxWidth="lg">
        {/* Header row */}
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Box display="flex" alignItems="center">
            <CatchingPokemonIcon sx={{ fontSize: 32, mr: 1, color: '#FFCB05' }} /> {/* Slightly larger icon */}
            <Typography variant="h6" component="div" sx={{ 
              fontWeight: 'bold',
              background: 'linear-gradient(to right, #FFCB05, #FFDE00)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontSize: '1.1rem' // Slightly larger title
            }}>
              Pokémon Review
            </Typography>
          </Box>
          
          <Box>
            <SocialIcon aria-label="Facebook">
              <FacebookIcon fontSize="small" />
            </SocialIcon>
            <SocialIcon aria-label="Twitter">
              <TwitterIcon fontSize="small" />
            </SocialIcon>
            <SocialIcon aria-label="Instagram">
              <InstagramIcon fontSize="small" />
            </SocialIcon>
            <SocialIcon aria-label="YouTube">
              <YouTubeIcon fontSize="small" />
            </SocialIcon>
          </Box>
        </Box>

        <Divider sx={{ backgroundColor: 'rgba(255, 255, 255, 0.2)', my: 1.5 }} />

        {/* Links section */}
        <Box display="flex" justifyContent="space-around" flexWrap="wrap" mb={1.5}>
          <Box textAlign="center" mb={1.5} minWidth={120}>
            <Typography variant="subtitle2" gutterBottom sx={{ color: '#FFCB05', fontSize: '1rem' }}> {/* Increased from 0.9rem */}
              Explore
            </Typography>
            <Box  display="flex" flexDirection="column" gap={0.5}>
              <FooterLink href="#" underline="none">Pokédex</FooterLink>
              <FooterLink href="#" underline="none">Moves</FooterLink>
            </Box>
          </Box>

          <Box textAlign="center" mb={1.5} minWidth={120}>
            <Typography variant="subtitle2" gutterBottom sx={{ color: '#FFCB05', fontSize: '1rem' }}>
              Community
            </Typography>
            <Box display="flex" flexDirection="column" gap={0.5}>
              <FooterLink href="#" underline="none">Forums</FooterLink>
              <FooterLink href="#" underline="none">Discord</FooterLink>
            </Box>
          </Box>

          <Box textAlign="center" mb={1.5} minWidth={120}>
            <Typography variant="subtitle2" gutterBottom sx={{ color: '#FFCB05', fontSize: '1rem' }}>
              Legal
            </Typography>
            <Box display="flex" flexDirection="column" gap={0.5}>
              <FooterLink href="#" underline="none">Terms</FooterLink>
              <FooterLink href="#" underline="none">Privacy</FooterLink>
            </Box>
          </Box>
        </Box>

        <Divider sx={{ backgroundColor: 'rgba(255, 255, 255, 0.2)', my: 1.5 }} />

        {/* Copyright section */}
        <Box textAlign="center">
          <Typography variant="caption" sx={{ fontSize: '0.95rem' }}> {/* Increased from 0.7rem */}
            © {new Date().getFullYear()} Pokémon Review App. Pokémon © Nintendo.
          </Typography>
        </Box>
      </Container>
    </FooterContainer>
  );
};

export default Footer;