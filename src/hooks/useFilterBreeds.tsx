import { useQuery } from '@tanstack/react-query';
import { filterBreeds } from '../services/api';
import { Breed } from './useGetBreeds';
import { Queries } from '../queries';

const useFilterBreeds = (searchTerm: string) => {
  return useQuery<Breed[], Error>({
    queryKey: [Queries.FILTER_BREEDS],
    queryFn: () => filterBreeds(searchTerm),
    enabled: !!searchTerm && searchTerm.length >= 3,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });
};

export default useFilterBreeds;
