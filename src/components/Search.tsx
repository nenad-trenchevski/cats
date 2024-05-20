import { Autocomplete, Box, TextField } from '@mui/material';
import useFilterBreeds from '../hooks/useFilterBreeds';
import { SelectBreed, NewVal } from '../types/BreedType';
import { SyntheticEvent } from 'react';
import { ErrorMessages } from '../utilities/constants';
import { ArrowDropDownSharp } from '@mui/icons-material';

interface SearchProps {
  searchTerm: string;
  handleSearchChange: (value: string) => void;
  onOptionSelect: (breed: SelectBreed | undefined) => void;
  debouncedSearchTerm: string;
}

const Search: React.FC<SearchProps> = ({ onOptionSelect, searchTerm, handleSearchChange, debouncedSearchTerm }) => {
  const { data: searchData, error: searchError } = useFilterBreeds(debouncedSearchTerm.length >= 3 ? debouncedSearchTerm : '');

  let breedOptions = searchData ? searchData.map(breed => ({ label: breed.name, breedId: breed.id })) : [];

  if (searchError) {
    breedOptions = [
      {
        label: ErrorMessages.ERROR_BREED_FETCH,
        breedId: 'error',
      },
    ];
  }

  const handleOptionSelect = (_: SyntheticEvent, newValue: NewVal) => {
    if (newValue && typeof newValue !== 'string' && newValue.breedId !== 'error') {
      onOptionSelect({ breedId: newValue.breedId, name: newValue.label });
    } else {
      onOptionSelect(undefined);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        mt: 6,
        mb: 8,
      }}
    >
      <Box sx={{ width: '30%' }}>
        <Autocomplete
          freeSolo
          options={breedOptions}
          getOptionLabel={option => (typeof option === 'string' ? option : option.label)}
          onInputChange={(_, newInputValue) => handleSearchChange(newInputValue)}
          onChange={handleOptionSelect}
          renderInput={params => (
            <TextField
              {...params}
              fullWidth
              label='Choose a breed'
              variant='outlined'
              value={searchTerm}
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {params.InputProps.endAdornment}
                    <ArrowDropDownSharp sx={{ color: 'grey.700' }} />
                  </Box>
                ),
              }}
            />
          )}
          renderOption={(props, option) => {
            const { onClick, ...rest } = props;
            return (
              <Box
                component='li'
                {...rest}
                sx={{ color: option.breedId === 'error' ? 'red' : 'inherit' }}
                onClick={option.breedId === 'error' ? undefined : onClick}
                key={option.label}
              >
                {option.label}
              </Box>
            );
          }}
        />
      </Box>
    </Box>
  );
};

export default Search;
