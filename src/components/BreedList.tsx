import { useState } from 'react';
import { Container, Grid } from '@mui/material';
import { BreedImg, SelectBreed } from '../types/BreedType';
import SingleBreed from './SingleBreed';

interface BreedListProps {
  breeds: Array<BreedImg & SelectBreed>;
  imageErrors: { [key: string]: string };
}

const BreedList = ({ breeds, imageErrors }: BreedListProps) => {
  const [loadedImages, setLoadedImages] = useState<{ [key: string]: boolean }>({});

  const handleImageLoad = (id: string) => {
    setLoadedImages(prev => ({ ...prev, [id]: true }));
  };

  return (
    <Container maxWidth='xl'>
      <Grid container spacing={2}>
        {breeds?.map((breed, index) => {
          const imageUrl = breed.url;
          const imageError = imageErrors[breed.id];
          const isLoading = !loadedImages[breed.id];

          return (
            <SingleBreed key={index} breed={breed} isLoading={isLoading} imageError={imageError} imageUrl={imageUrl} onImageLoad={handleImageLoad} />
          );
        })}
      </Grid>
    </Container>
  );
};

export default BreedList;
