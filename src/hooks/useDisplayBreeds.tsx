import { useEffect, useState, useMemo } from 'react';
import { BreedImg, SelectBreed } from '../types/BreedType';

const useDisplayBreeds = (
  breedImageInfo: Array<BreedImg & SelectBreed>,
  images: Array<BreedImg & SelectBreed>,
  isFetching: boolean,
  selectedBreed: SelectBreed | undefined
) => {
  const [displayedBreeds, setDisplayedBreeds] = useState<Array<BreedImg & SelectBreed>>(breedImageInfo);

  // display either breeds (initially)
  // or images for a specific breed (if there is a selected breed)
  useEffect(() => {
    if (!isFetching) {
      if (selectedBreed) {
        setDisplayedBreeds(images.length ? images : displayedBreeds);
      } else {
        setDisplayedBreeds(breedImageInfo);
      }
    }
  }, [isFetching, images, breedImageInfo, displayedBreeds, selectedBreed]);

  const breedsToDisplay = useMemo(() => displayedBreeds, [displayedBreeds]);

  return breedsToDisplay;
};

export default useDisplayBreeds;
