import { useEffect, useState } from 'react';
import {
  Container,
  CircularProgress,
  Alert,
  Grid,
  Card,
  CardContent,
  Typography,
  Box
} from '@mui/material';
import { getCategories } from '../services/categoryService';

// Category icon images (type symbols)
const categoryIcons = {
  fire: '/fire.jpg',
  water: '/water.jpg',
  electric: '/electric.jpg',
  ice: '/ice.jpg',
  default: '/default.jpg'
};


const CategoryPage = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getIconForCategory = (name) => {
    const key = name.toLowerCase();
    return categoryIcons[key] || categoryIcons['default'];
  };

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <Container>
      <h1>Categories</h1>

      <Grid container spacing={3}>
        {categories.map((category) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={category.id}>
            <Card sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 2 }}>
              <Box
                component="img"
                src={getIconForCategory(category.name)}
                alt={category.name}
                sx={{ width: 50, height: 50, mb: 1 }}
              />
              <CardContent>
                <Typography variant="h6" align="center">
                  {category.name}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
  
};

export default CategoryPage;
