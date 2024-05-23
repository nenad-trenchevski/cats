import { Container, Grid } from '@mui/material';
import { BreedImg, SelectBreed } from '../types/BreedType';
import SingleBreed from './SingleBreed';

interface BreedListProps {
  breeds: Array<BreedImg & SelectBreed>;
  // imageErrors: { [key: string]: string };
}

const BreedList = ({ breeds }: BreedListProps) => {
  // demo, attachinga click
  const handleBreedClick = (event: React.MouseEvent) => {
    const target = event.target as HTMLElement;
    const breedIndex = target.closest('[data-breed-index]')?.getAttribute('data-breed-index');
    if (breedIndex !== null && breedIndex !== undefined) {
      const clickedBreed = breeds[parseInt(breedIndex)];
      console.log('clickedBreed', clickedBreed);
    }
  };
  return (
    <Container maxWidth='xl'>
      <Grid container spacing={2} onClick={handleBreedClick}>
        {breeds?.map((breed, index) => {
          return (
            <Grid item key={index} data-breed-index={index} xs={12} sm={6} md={3} lg={3}>
              <SingleBreed breed={breed} />
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
};

export default BreedList;
