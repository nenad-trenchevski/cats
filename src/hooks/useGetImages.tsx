import { useInfiniteQuery, UseInfiniteQueryResult } from '@tanstack/react-query';
import { Queries } from '../queries';
import CatService from '../services/CatService';
import { ImgQueryResponse } from '../types/BreedType';

const useGetImages = (breedId: string): UseInfiniteQueryResult<ImgQueryResponse, Error> => {
  return useInfiniteQuery({
    queryKey: [Queries.BREED_IMGS, breedId],
    queryFn: ({ pageParam = 0 }) => CatService.getBreedImages(pageParam, breedId, 10),
    initialPageParam: 0,
    getNextPageParam: (lastPageData, allPagesData) => {
      // check whether we reached the end, or there are more pages
      return lastPageData.length === 0 ? null : allPagesData.length + 1;
    },
    refetchOnWindowFocus: false,
    staleTime: Infinity,
    // do not automatically fetch even on first init
    // the fetch is controlled by the component
    enabled: !!breedId,
  });
};

export default useGetImages;
