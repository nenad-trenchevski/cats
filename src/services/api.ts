import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { API_KEY, BASE_URL } from '../utilities/constants';
import { Breed } from '../hooks/useGetBreeds';
import { CatImage } from '../hooks/useFetchImages';

const api: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    // 'x-api-key': API_KEY,
  },
});

const getBreeds = async ({ pageParam = 0 }): Promise<Breed[]> => {
  try {
    const params = {
      limit: 10,
      page: pageParam,
    };
    const response: AxiosResponse<Breed[]> = await api.get('/breeds', { params });

    return response.data;
  } catch (error) {
    console.error('Failed to fetch breeds:', error);
    throw error;
  }
};

const filterBreeds = async (searchTerm: string) => {
  try {
    const params = {
      q: searchTerm,
    };
    const response: AxiosResponse<Breed[]> = await api.get('/breeds/search', { params });

    return response.data;
  } catch (error) {
    console.error('No such breeds', error);
    throw error;
  }
};

const getCatImage = async (breedId: string): Promise<CatImage[]> => {
  try {
    const params = {
      breed_id: breedId,
      limit: 1,
    };
    const response: AxiosResponse<CatImage[]> = await api.get('/images/search', { params });

    return response.data;
  } catch (error) {
    console.error('Failed to fetch cat image:', error);
    throw error;
  }
};

export { getBreeds, getCatImage, filterBreeds };
