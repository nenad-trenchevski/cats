import { useEffect, useState, useMemo } from 'react';
import { BreedImg, SelectBreed } from '../types/BreedType';

const useDisplayBreeds = (
  breedImageInfo: Array<BreedImg & SelectBreed>,
  images: Array<BreedImg & SelectBreed>,
  isFetching: boolean,
  selectedBreed: SelectBreed | undefined
) => {
  const [displayedBreeds, setDisplayedBreeds] = useState<Array<BreedImg & SelectBreed>>(breedImageInfo);

  useEffect(() => {
    if (!isFetching) {
      if (selectedBreed) {
        setDisplayedBreeds(prevDisplayedBreeds => (images.length ? images : prevDisplayedBreeds));
      } else {
        setDisplayedBreeds(breedImageInfo);
      }
    }
  }, [isFetching, images, breedImageInfo, selectedBreed]);

  return useMemo(() => displayedBreeds, [displayedBreeds]);
};

export default useDisplayBreeds;
