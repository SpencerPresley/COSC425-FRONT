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
  return (
    <div className="flex justify-center items-center flex-col" style={{ gap: '20px', width: '100%', padding: '0 20px' }}>
      {Object.entries(themedata).map(([category, details]) => (
        <Card key={category} sx={{ maxWidth: 400, minWidth:200, margin: '10px auto' }}>
          <CardContent>
            <Typography sx={{ fontSize: 25, fontWeight: 'bold' }} color="text.secondary" gutterBottom>
              {category}
            </Typography>
          </CardContent>
          <CardActions>
          </CardActions>
        </Card>
      ))}
    </div>
  );
}
