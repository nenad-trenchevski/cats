import { useState, useEffect, useRef } from 'react';
import { getCatImage } from '../services/api';
import { Breed } from './useGetBreeds';

export interface CatImage {
  id: string;
  url: string;
}

const useFetchImages = (breeds: Breed[]) => {
  const [breedImages, setBreedImages] = useState<Record<string, string>>({});
  const [error, setError] = useState<Record<string, string>>({});

  const breedImagesRef = useRef(breedImages);
  const errorRef = useRef(error);

  useEffect(() => {
    breedImagesRef.current = breedImages;
    errorRef.current = error;
  }, [breedImages, error]);

  useEffect(() => {
    const fetchImages = async () => {
      const newBreedImages = { ...breedImagesRef.current };
      const newErrors = { ...errorRef.current };

      await Promise.all(
        breeds.map(async breed => {
          if (!newBreedImages[breed.id] && !newErrors[breed.id]) {
            try {
              const images = await getCatImage(breed.id);
              if (images.length > 0) {
                newBreedImages[breed.id] = images[0].url;
              } else {
                throw new Error('No image found');
              }
            } catch (err) {
              newBreedImages[breed.id] = '';
              newErrors[breed.id] = 'Failed to fetch image';
            }
          }
        })
      );

      setBreedImages(prev => ({ ...prev, ...newBreedImages }));
      setError(prev => ({ ...prev, ...newErrors }));
    };

    if (breeds.length > 0) {
      fetchImages();
    }
  }, [breeds]);

  return { breedImages, error };
};

export default useFetchImages;
