import { Box, Grid, Typography, Paper, useTheme } from '@mui/material';
import { styled } from '@mui/system';
import { BreedImg, SelectBreed } from '../types/BreedType';

const StyledPaper = styled(Paper)(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: '10px',
  '&:hover': {
    border: `1px solid ${theme.palette.secondary.dark}`,
  },
  '&:focus': {
    border: `1px solid ${theme.palette.secondary.dark}`,
  },
  '&:focus-within .item': {
    backgroundColor: `${theme.palette.secondary.main}`,
    borderBottomLeftRadius: '10px',
    borderBottomRightRadius: '10px',
  },
}));

interface SingleBreedProps {
  breed: BreedImg & SelectBreed;
}

const SingleBreed = ({ breed }: SingleBreedProps) => {
  const theme = useTheme();

  return (
    <Grid item xs={12} sm={6} md={3} lg={3}>
      <StyledPaper tabIndex={0}>
        <Box
          sx={{
            width: '100%',
            height: 250,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
            borderTopLeftRadius: '10px',
            borderTopRightRadius: '10px',
            overflow: 'hidden',
            backgroundColor: theme.palette.background.default,
          }}
        >
          {!breed.url ? (
            <Typography variant='body2' color='textSecondary' align='center'>
              Image not available
            </Typography>
          ) : (
            <Box
              sx={{
                width: '100%',
                position: 'relative',
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              {breed.url && (
                <img
                  src={breed.url}
                  alt={breed.name}
                  // style={{ display: !loadedImages[breed.id] ? 'none' : 'block', maxHeight: '200px' }}
                  style={{ display: 'block', maxHeight: '200px' }}
                />
              )}
            </Box>
          )}
        </Box>
        <Box sx={{ py: 2, px: 1 }} className='item'>
          <Typography variant='body1' sx={{ fontWeight: 'bold' }}>
            {breed.name}
          </Typography>
        </Box>
      </StyledPaper>
    </Grid>
  );
};

export default SingleBreed;
