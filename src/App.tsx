import { useCallback, useEffect, useMemo, useState } from 'react';
import './App.css';
import { Box, List, ListItem, ListItemButton, ListItemText, TextField } from '@mui/material';
import useGetBreeds from './hooks/useGetBreeds';
import useFetchImages from './hooks/useFetchImages';
import useCheckViewPort from './hooks/useCheckViewPort';
import useFilterBreeds from './hooks/useFilterBreeds';
import useDebounce from './hooks/useDebounce';
import { useInView } from 'react-intersection-observer';
import { useInfiniteQuery } from '@tanstack/react-query';
import { Queries } from './queries';
import { getBreeds } from './services/api';

function App() {
  // const { isPending, error, data, isFetchingNextPage, fetchNextPage, hasNextPage } = useGetBreeds();

  const { isPending, error, data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: [Queries.BREEDS],
    queryFn: getBreeds,
    staleTime: 10000,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      console.log('calledd');
      return lastPage.length === 0 ? null : allPages.length + 1;
    },
  });

  const ref = useCheckViewPort(fetchNextPage);

  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const { data: filteredBreeds, error: searchError, isFetching } = useFilterBreeds(debouncedSearchTerm.length >= 3 ? debouncedSearchTerm : '');

  // update breeds only when new data is fetched
  const breeds = useMemo(() => (data ? data.pages.flatMap(page => page) : []), [data]);
  const { breedImages, error: imageErrors } = useFetchImages(breeds);

  const handleSearchChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  }, []);

  const breedsToDisplay = debouncedSearchTerm.length >= 3 && !isFetching ? filteredBreeds ?? breeds : breeds;

  if (isPending && breeds.length === 0) {
    return <div>Loading...</div>;
  }

  if (error || searchError) {
    return <div>Error: {error?.message || searchError?.message}</div>;
  }

  return (
    <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', color: 'white' }}>
      <TextField fullWidth label='Search Breeds' variant='outlined' value={searchTerm} onChange={handleSearchChange} sx={{ marginBottom: 2 }} />
      <List>
        {breedsToDisplay?.map((breed, index) => {
          const imageUrl = breedImages[breed.id];
          const imageError = imageErrors[breed.id];

          return (
            <ListItem key={index} component='div' disablePadding>
              {imageError ? (
                <div style={{ display: 'block', width: '100%', textAlign: 'center' }}>Image not available</div>
              ) : (
                imageUrl && <img src={imageUrl} alt='Cat' style={{ display: 'block', width: '100%' }} />
              )}
              <div>{breed.name}</div>
            </ListItem>
          );
        })}
        {/* {hasNextPage && !isFetchingNextPage && !searchTerm && (
          <ListItem ref={ref} component='div' disablePadding>
            <ListItemButton disabled>
              <ListItemText primary='Loading more...' />
            </ListItemButton>
          </ListItem>
        )} */}

        {hasNextPage && (
          <ListItem ref={ref} component='div' disablePadding>
            <ListItemButton disabled>
              <ListItemText primary='Loading more...' />
            </ListItemButton>
          </ListItem>
        )}
      </List>
    </Box>
  );
}

export default App;
