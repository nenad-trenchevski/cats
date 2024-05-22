import { Container, Grid } from '@mui/material';
import { BreedImg, SelectBreed } from '../types/BreedType';
import SingleBreed from './SingleBreed';

interface BreedListProps {
  breeds: Array<BreedImg & SelectBreed>;
  // imageErrors: { [key: string]: string };
}

const BreedList = ({ breeds }: BreedListProps) => {
  return (
    <Container maxWidth='xl'>
      <Grid container spacing={2}>
        {breeds?.map((breed, index) => {
          return <SingleBreed key={index} breed={breed} />;
        })}
      </Grid>
    </Container>
  );
};

export default BreedList;
