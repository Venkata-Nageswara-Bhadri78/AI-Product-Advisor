import * as React from 'react';
// import { styled } from '@mui/material/styles'; // No longer needed
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';

import image from '../assets/prod_default_image.png';
import ShowmoreButton from '../ui/ShowmoreButton';

export default function ProductCard({product}) {

  const profileIcon = product.brand.substring(0, 1).toUpperCase();

  return (
    // <div className='min-h-100'>
    <Card sx={{ maxWidth: 300 }}>
      <CardHeader
        sx={{
            px: 1,
            py: 1,
          }}
        className='bg-blue-200 min-h-23'
        avatar={
          <Avatar sx={{ bgcolor: color[profileIcon], m:0 }}>
            {profileIcon}
          </Avatar>
        }
        title={product.brand}
        subheader={`$ ${product.price}`}
      />
      <CardMedia
        component="img"
        height="140"
        image={image}
        alt={product.product_name}
      />
      <CardContent sx={{ p: 1.5 }}>
        <Typography variant="body2" color="text.secondary" component="div">
            <div className='font-semibold text-black'>{product.category}</div>
            <div className='lg:min-h-30 md:min-h-45 text-justify'>{product.description}</div>
        </Typography>
      </CardContent>
      <CardActions className='flex justify-between'>
        <div>
            <IconButton aria-label="add to favorites" size="small">
            <FavoriteIcon fontSize="inherit" />
            </IconButton>
            <IconButton aria-label="share" size="small">
            <ShareIcon fontSize="inherit" />
            </IconButton>
        </div>
        <div>
            {/* <button className='p-1.5 rounded-sm text-white bg-blue-500'>Show More</button> */}
            <ShowmoreButton />
        </div>
      </CardActions>
    </Card>
    // </div>
  );
}

const color = {
  "A": "rgba(255, 0, 0, 0.8)",      // Red
  "B": "rgba(0, 128, 0, 0.8)",      // Green
  "C": "rgba(0, 0, 255, 0.8)",      // Blue
  "D": "rgba(255, 165, 0, 0.8)",    // Orange
  "E": "rgba(128, 0, 128, 0.8)",    // Purple
  "F": "rgba(255, 192, 203, 0.8)",  // Pink
  "G": "rgba(0, 255, 255, 0.8)",    // Cyan
  "H": "rgba(128, 128, 0, 0.8)",    // Olive
  "I": "rgba(255, 0, 255, 0.8)",    // Magenta
  "J": "rgba(0, 128, 128, 0.8)",    // Teal
  "K": "rgba(255, 215, 0, 0.8)",    // Gold
  "L": "rgba(173, 216, 10, 0.8)",  // Light Blue
  "M": "rgba(210, 105, 30, 0.8)",   // Chocolate
  "N": "rgba(75, 0, 130, 0.8)",     // Indigo
  "O": "rgba(240, 128, 128, 0.8)",  // Light Coral
  "P": "rgba(34, 139, 34, 0.8)",    // Forest Green
  "Q": "rgba(70, 130, 180, 0.8)",   // Steel Blue
  "R": "rgba(255, 69, 0, 0.8)",     // Orange Red
  "S": "rgba(138, 43, 226, 0.8)",   // Blue Violet
  "T": "rgba(60, 179, 113, 0.8)",   // Medium Sea Green
  "U": "rgba(0, 191, 255, 0.8)",    // Deep Sky Blue
  "V": "rgba(255, 20, 147, 0.8)",   // Deep Pink
  "W": "rgba(218, 165, 32, 0.8)",   // Goldenrod
  "X": "rgba(147, 112, 219, 0.8)",  // Medium Purple
  "Y": "rgba(32, 178, 170, 0.8)",   // Light Sea Green
  "Z": "rgba(199, 21, 133, 0.8)"    // Medium Violet Red
};
