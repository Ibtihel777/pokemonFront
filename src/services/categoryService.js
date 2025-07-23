import api from './api';

// Fetch all categories
export const getCategories = async () => {
  try {
    const response = await api.get('/category');
    return response.data;
  } catch (error) {
    console.error("Erreur API:", {
      URL: error.config?.url,
      Status: error.response?.status,
      Message: error.message
    });
    throw error;
  }
};

// Create a new category
export const createCategory = async (category) => {
  try {
    const response = await api.post('/category', category);
    return response.data;
  } catch (error) {
    console.error("Erreur API (POST):", {
      URL: error.config?.url,
      Status: error.response?.status,
      Message: error.message
    });
    throw error;
  }
};
