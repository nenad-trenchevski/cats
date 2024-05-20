import { useQuery } from '@tanstack/react-query';
import { Queries } from '../queries';
import CatService from '../services/CatService';
import { Breed } from '../types/BreedType';

// get breeds based on searchTerm
const useFilterBreeds = (searchTerm: string) => {
  return useQuery<Breed[], Error>({
    queryKey: [Queries.FILTER_BREEDS, searchTerm],
    queryFn: () => CatService.filterBreeds(searchTerm),
    enabled: !!searchTerm && searchTerm.length >= 3,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });
};

export default useFilterBreeds;
