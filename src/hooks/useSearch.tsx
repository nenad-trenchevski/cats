import { useState, useCallback } from 'react';
import useDebounce from './useDebounce';

const useSearch = (initialValue = '', debounceDelay = 300) => {
  const [searchTerm, setSearchTerm] = useState(initialValue);
  const debouncedSearchTerm = useDebounce(searchTerm, debounceDelay);

  const handleSearchChange = useCallback((value: string) => {
    setSearchTerm(value);
  }, []);
  return { searchTerm, debouncedSearchTerm, handleSearchChange, setSearchTerm };
};

export default useSearch;
