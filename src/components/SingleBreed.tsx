import { Box, Fade, Grid, Skeleton, Typography, Paper, useTheme } from '@mui/material';
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
  onImageLoad: (id: string) => void;
  breed: BreedImg & SelectBreed;
  isLoading: boolean;
  imageError: string;
  imageUrl: string;
}

const SingleBreed = ({ onImageLoad, breed, isLoading, imageError, imageUrl }: SingleBreedProps) => {
  const theme = useTheme();
  return (
    <Grid item xs={12} sm={6} md={3} lg={3}>
      <StyledPaper tabIndex={0}>
        <Fade in={!isLoading} timeout={800}>
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
            {imageError ? (
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
                {isLoading && <Skeleton variant='rectangular' width='100%' height={200} />}
                {imageUrl && (
                  <img
                    src={imageUrl}
                    alt={breed.name}
                    style={{ display: isLoading ? 'none' : 'block', maxHeight: '200px' }}
                    onLoad={() => onImageLoad(breed.id)}
                    onError={() => onImageLoad(breed.id)}
                  />
                )}
              </Box>
            )}
          </Box>
        </Fade>
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
