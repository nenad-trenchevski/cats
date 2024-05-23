import { useQueries } from '@tanstack/react-query';
import CatService from '../services/CatService';
import useGetBreeds from './useGetBreeds';
import { useMemo, useState, useEffect, useRef } from 'react';
import { ErrorMessages } from '../utilities/constants';
import { Queries } from '../queries';

const useGetBreedsWithImages = () => {
  const { data, error: breedsError, fetchNextPage: fetchNextPageBreeds, hasNextPage: hasNextPageBreeds, isPending } = useGetBreeds();

  const allBreeds = useMemo(() => (data ? data.pages.flatMap(page => page) : []), [data]);

  // update data without causing re-render each time
  // breedImagesRef.current does not change, only it's properties
  // as refs are persistent across re-renders (compared to a variable)
  const breedImagesRef = useRef<Record<string, string>>({});
  const errorRef = useRef<Record<string, string>>({});
  const [fetchError, setFetchError] = useState<string | null>(null);

  const queries = allBreeds.map(breed => ({
    queryKey: [Queries.SINGLE_BREED_IMG, breed.id],
    queryFn: () => CatService.getBreedImages(0, breed.id, 1),
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    onError: (error: { message: string }) => {
      const errorMessage = `${ErrorMessages.ERROR_FETCH_FOR_BREED} ${breed.id}`;
      console.error(errorMessage, error);
      errorRef.current[breed.id] = errorMessage;
      setFetchError(errorMessage);
    },
  }));

  const results = useQueries({ queries });

  const breedImageInfo = results.map((result, index) => {
    const breed = allBreeds[index];
    if (result.isLoading || result.isError || !result.data?.length) {
      return {
        breedId: breed.id,
        id: '',
        name: breed.name,
        url: '',
      };
    }
    const image = result.data[0];
    breedImagesRef.current[breed.id] = image.url;

    return {
      breedId: breed.id,
      id: image.id,
      name: breed.name,
      url: image.url,
      error: breedsError || fetchError,
    };
  });

  const isFetchingImages = results.some(result => result.isLoading);

  const [fetchingImages, setFetchingImages] = useState(isFetchingImages);

  useEffect(() => {
    setFetchingImages(isFetchingImages);
  }, [isFetchingImages]);

  return {
    breedImageInfo,
    isFetchingImages: fetchingImages,
    fetchNextPageBreeds,
    hasNextPageBreeds,
    breedImages: breedImagesRef.current,
    error: errorRef.current,
    isPendingInitial: isPending,
  };
};

export default useGetBreedsWithImages;
