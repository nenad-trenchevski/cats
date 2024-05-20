import { useState, useCallback } from 'react';
import { SelectBreed } from '../types/BreedType';

const useSelectBreed = () => {
  const [selectedBreed, setSelectedBreed] = useState<SelectBreed>();

  const handleOptionSelect = useCallback(
    (breed: SelectBreed | undefined) => {
      setSelectedBreed(breed);
    },
    [setSelectedBreed]
  );
  return { handleOptionSelect, selectedBreed, setSelectedBreed };
};

export default useSelectBreed;
