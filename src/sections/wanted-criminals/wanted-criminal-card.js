// components/WantedCriminalCard.js
import React from 'react';
import { Card, CardContent, CardMedia, Typography, Rating, Box } from '@mui/material';
import CircleIcon from '@mui/icons-material/Circle';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import { styled } from '@mui/material/styles';

const WantedCriminalCard = ({ criminal }) => {
  return (
    <Card
      sx={{
        borderRadius: 2,
        overflow: 'hidden',
        margin: 0.5,
        width: 400, // Adjusted width
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        transition: 'transform 0.3s ease-in-out',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        '&:hover': {
          transform: 'scale(1.05)',
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: 2.5,
        }}
      >
        <CardMedia
          component="img"
          alt={criminal.name} 
          image={criminal.avatar}
          sx={{
            borderRadius: '50%',
            objectFit: 'cover', // Maintain aspect ratio without stretching
            width: '120px',
            height: '120px',
            marginTop: 1,
          }}
        />
        <Rating
          name="read-only"
          value={criminal.wantedType+1}
          max={3}
          readOnly
          sx={{
            marginTop: 1,
            '.MuiRating-iconFilled': {
              color: '#ff3d47',
            },
            '.MuiRating-iconHover': {
              color: '#ff3d47',
            },
          }}
          icon={<CircleIcon fontSize="small" />}
          emptyIcon={<CircleOutlinedIcon fontSize="small" />}
        />
        <Typography variant="body2" sx={{ color: '#666' }}>
          <strong>Mức độ nguy hiểm</strong>
        </Typography>
      </Box>
      <CardContent
        sx={{
          padding: 2,
          flex: 1,
        }}
      >
        <Typography variant="subtitle2" sx={{ fontSize: '1.4em', color: '#333' }}>
          {criminal.name}
        </Typography>
        <Typography variant="body2" sx={{ color: '#666' }}>
          {criminal.anotherName}
        </Typography>
        <Typography variant="body2" sx={{ color: '#666' }}>
          <strong>Năm sinh:</strong> {criminal.yearOfBirth}
        </Typography>
        <Typography variant="body2" sx={{ color: '#666' }}>
          <strong>HKTT:</strong> {criminal.permanentResidence}
        </Typography>
        <Typography variant="body2" sx={{ color: '#666' }}>
          <strong>Đặc điểm:</strong> {criminal.characteristics}
        </Typography>
        <Typography variant="body2" sx={{ color: '#666' }}>
          <strong>Tội danh:</strong> {criminal.charge}
        </Typography>
        <Typography variant="body2" sx={{ color: '#666' }}>
          <strong>Vũ khí:</strong> {criminal.weapon}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default WantedCriminalCard;
