import { useInfiniteQuery, UseInfiniteQueryResult } from '@tanstack/react-query';
import { getBreeds } from '../services/api';
import { Queries } from '../queries';

export interface Breed {
  id: string;
  name: string;
  reference_image_id: string;
}

export interface BreedQueryResponse {
  pageParams: Array<number>;
  pages: Array<Array<Breed>>;
}

const useGetBreeds = (): UseInfiniteQueryResult<BreedQueryResponse, Error> => {
  return useInfiniteQuery({
    queryKey: [Queries.BREEDS],
    queryFn: async ({ pageParam = 0 }) => {
      console.log('Fetching breeds for page:', pageParam);
      const data = await getBreeds(pageParam);
      console.log('Fetched data:', data);

      return data;
    },
    initialPageParam: 0,
    getNextPageParam: (lastPageData, allPagesData) => {
      console.log('Getting next page param:', lastPageData, allPagesData);
      // Ensure lastPageData is not undefined or null and has a length
      return lastPageData.length === 0 ? null : allPagesData.length + 1;
    },
    refetchOnWindowFocus: false,
    staleTime: Infinity,
    // do not automatically fetch even on first init
    // the fetch is controlled by the component
    enabled: false,
  });
};

export default useGetBreeds;
