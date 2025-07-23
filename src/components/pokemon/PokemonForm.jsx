import { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Grid, MenuItem, FormControl, InputLabel, Select } from '@mui/material';
import { getCategories } from '../../services/categoryService';
import { getOwners } from '../../services/ownerService';

const PokemonForm = ({ initialValues, onSubmit }) => {
  const [categories, setCategories] = useState([]);
  const [owners, setOwners] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cats = await getCategories();
        const owns = await getOwners();
        setCategories(cats);
        setOwners(owns);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const formik = useFormik({
    initialValues: initialValues || {
      name: '',
      birthDate: '',
      ownerId: '',
      categoryId: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Required'),
      birthDate: Yup.string().required('Required'),
      ownerId: Yup.number().required('Required'),
      categoryId: Yup.number().required('Required'),
    }),
    onSubmit: (values) => {
      onSubmit(values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            id="name"
            name="name"
            label="Name"
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            id="birthDate"
            name="birthDate"
            label="Birth Date"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={formik.values.birthDate}
            onChange={formik.handleChange}
            error={formik.touched.birthDate && Boolean(formik.errors.birthDate)}
            helperText={formik.touched.birthDate && formik.errors.birthDate}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel id="owner-label">Owner</InputLabel>
            <Select
              labelId="owner-label"
              id="ownerId"
              name="ownerId"
              value={formik.values.ownerId}
              onChange={formik.handleChange}
              error={formik.touched.ownerId && Boolean(formik.errors.ownerId)}
            >
              {owners.map((owner) => (
                <MenuItem key={owner.id} value={owner.id}>
                  {owner.firstName} {owner.lastName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel id="category-label">Category</InputLabel>
            <Select
              labelId="category-label"
              id="categoryId"
              name="categoryId"
              value={formik.values.categoryId}
              onChange={formik.handleChange}
              error={formik.touched.categoryId && Boolean(formik.errors.categoryId)}
            >
              {categories.map((category) => (
                <MenuItem key={category.id} value={category.id}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Button color="primary" variant="contained" fullWidth type="submit">
            Submit
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default PokemonForm;