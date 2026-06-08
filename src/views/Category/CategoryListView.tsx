import React, { useContext } from 'react';
import { Box, Typography, Grid, Card, CardContent, CardActionArea } from '@mui/material';
import { ExpensesContext } from '../../context/ExpensesContext.js';
import { useNavigate } from 'react-router-dom';
import routes from '../../config/routes.ts';

const CategoryListView: React.FC = () => {
  const { categories } = useContext(ExpensesContext);
  const navigate = useNavigate();

  const handleCategoryClick = (id: string) => {
    navigate("/" + routes.category.path.replace(":id", id));
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 700, color: "primary.main" }}>
        Categories
      </Typography>
      <Typography variant="body1" sx={{ mb: 4, color: "text.secondary" }}>
        Select a category to view detailed expenses and budget.
      </Typography>

      <Grid container spacing={3}>
        {Object.entries(categories).map(([id, category]: [string, any]) => (
          <Grid item xs={12} sm={6} md={4} key={id}>
            <Card sx={{ border: "1px solid rgba(0,0,0,0.08)", boxShadow: "none", "&:hover": { borderColor: "primary.main" } }}>
              <CardActionArea onClick={() => handleCategoryClick(id)} sx={{ p: 1 }}>
                <CardContent>
                  <Typography variant="h6" component="div">
                    {category.displayValue}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    View expenses for this category
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default CategoryListView;
