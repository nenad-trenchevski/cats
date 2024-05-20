import { useInfiniteQuery, UseInfiniteQueryResult } from '@tanstack/react-query';
import CatService from '../services/CatService';
import { BreedQueryResponse } from '../types/BreedType';
import { Queries } from '../queries';

// get initial breeds
const useGetBreeds = (): UseInfiniteQueryResult<BreedQueryResponse, Error> => {
  return useInfiniteQuery({
    queryKey: [Queries.BREEDS],
    queryFn: CatService.getBreeds,
    initialPageParam: 0,
    getNextPageParam: (lastPageData, allPagesData) => {
      return lastPageData.length === 0 ? null : allPagesData.length + 1;
    },
    refetchOnWindowFocus: false,
    staleTime: Infinity,
    enabled: false,
  });
};

export default useGetBreeds;
