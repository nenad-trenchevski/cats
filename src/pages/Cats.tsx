import { useEffect, useMemo } from 'react';
import useGetImages from '../hooks/useGetImages';
import useGetBreedsWithImages from '../hooks/useGetBreedsWithImages';
import useSearch from '../hooks/useSearch';
import useSelectBreed from '../hooks/useSelectBreed';
import InfiniteScroll from '../components/InfiniteScroll';
import MainLayout from '../layouts/MainLayout';
import { BreedImg, SelectBreed } from '../types/BreedType';
import Search from '../components/Search';
import BreedList from '../components/BreedList';

function Cats() {
  const { breedImageInfo, isFetchingImages, fetchNextPageBreeds, hasNextPageBreeds, error: imageErrors, isPendingInitial } = useGetBreedsWithImages();
  const { selectedBreed, handleOptionSelect } = useSelectBreed();

  useEffect(() => {
    fetchNextPageBreeds();
  }, []);

  // query images based on selected breed
  const { data, error, isFetching, fetchNextPage, hasNextPage, isPending } = useGetImages(selectedBreed ? selectedBreed.breedId : '');

  const { searchTerm, debouncedSearchTerm, handleSearchChange } = useSearch();
  // update breed images only when new data is fetched
  const images = useMemo(
    () =>
      data
        ? data.pages
            .flatMap(page => page)
            .map(image => ({
              ...image,
              ...selectedBreed,
            }))
        : [],
    [data, selectedBreed]
  ) as Array<BreedImg & SelectBreed>;

  const errorMessage = useMemo(() => error?.message || imageErrors.message || null, [error?.message, imageErrors.message]);
  // const breedsToDisplay = useDisplayBreeds(breedImageInfo, images, isFetching, selectedBreed);

  const breedsToDisplay = useMemo(() => {
    return selectedBreed ? (images.length ? images : breedImageInfo) : breedImageInfo;
  }, [images, breedImageInfo, selectedBreed]);

  // setup the right props for MainLayout and InfiniteScroll
  const shouldFetchNextPage = useMemo(() => (selectedBreed ? hasNextPage : hasNextPageBreeds), [selectedBreed, hasNextPage, hasNextPageBreeds]);

  // console.log('debouncedSearchTerm', debouncedSearchTerm);
  const fetchNextPageHandler = useMemo(
    () => (selectedBreed ? fetchNextPage : fetchNextPageBreeds),
    [selectedBreed, fetchNextPage, fetchNextPageBreeds]
  );

  const isLoading = useMemo(
    () => isFetching || isFetchingImages || isPending || isPendingInitial,
    [isFetching, isFetchingImages, isPending, isPendingInitial]
  );

  return (
    <>
      <Search
        onOptionSelect={handleOptionSelect}
        handleSearchChange={handleSearchChange}
        searchTerm={searchTerm}
        debouncedSearchTerm={debouncedSearchTerm}
      />

      <MainLayout error={errorMessage}>
        <InfiniteScroll shouldFetchNextPage={shouldFetchNextPage} showLoading={isLoading} fetchNextPage={fetchNextPageHandler}>
          <BreedList breeds={breedsToDisplay} />
        </InfiniteScroll>
      </MainLayout>
    </>
  );
}

export default Cats;
