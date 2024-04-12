

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

const card = (
  <React.Fragment>
    <CardContent>
        <CatAccord />
    </CardContent>
  </React.Fragment>
);

export const CatCard = () => {
  return (
    <Box sx={{ maxWidth: 200 }}>
      <Card variant="outlined">{card}</Card>
    </Box>
  );
}