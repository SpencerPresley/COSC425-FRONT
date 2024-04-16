import { CatAccord } from "./catInfoAccord";
import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

export const CatCard = ({themedata}) => {
  // Extract categories from the themedata object
  const categories = Object.keys(themedata).sort();

  return (
    <div className="flex justify-center items-center flex-col" style={{ gap: '20px', width: '100%', padding: '0 20px' }}>
      {categories.map((category) => (
        <Card key={category} sx={{ maxWidth: 400, minWidth: 300,margin: '10px auto' }}>
          <CardContent>
            <Typography sx={{ fontSize: 25, fontWeight: 'bold' }} color="text.primary" gutterBottom>
              {category}
            </Typography>
          </CardContent>
          <CardActions>
            {/* Add any actions you want here */}
          </CardActions>
        </Card>
      ))}
    </div>
  );
}
