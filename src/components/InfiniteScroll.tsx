import { ReactNode, useEffect } from 'react';
import { Box, Button, Typography } from '@mui/material';
import useScrollEnd from '../hooks/useScrollEnd';

interface InfiniteScrollProps {
  children: ReactNode;
  fetchNextPage: () => void;
  showLoading: boolean;
  shouldFetchNextPage: boolean;
}

const InfiniteScroll = ({ children, fetchNextPage, showLoading, shouldFetchNextPage }: InfiniteScrollProps) => {
  const isScrolledToEnd = useScrollEnd();

  useEffect(() => {
    if (isScrolledToEnd && shouldFetchNextPage) {
      fetchNextPage();
    }
  }, [isScrolledToEnd, fetchNextPage, shouldFetchNextPage]);

  return (
    <>
      {children}
      <Box display='flex' justifyContent='center' mt={2}>
        {showLoading ? (
          <Typography>Loading images...</Typography>
        ) : (
          <Button variant='contained' color='primary' onClick={fetchNextPage}>
            Load More...
          </Button>
        )}
      </Box>
    </>
  );
};

export default InfiniteScroll;
