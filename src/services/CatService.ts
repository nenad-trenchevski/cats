import { AxiosResponse } from 'axios';
import ApiService from './ApiService';
import { Breed, BreedImg } from '../types/BreedType';

class CatService {
  static api = ApiService.init();

  static getBreeds = async ({ pageParam = 0 }): Promise<Breed[]> => {
    const params = {
      limit: 10,
      page: pageParam,
    };
    const response: AxiosResponse<Breed[]> = await CatService.api.get('/breeds', { params });
    return response.data;
  };

  static filterBreeds = async (searchTerm: string) => {
    const params = {
      q: searchTerm,
    };
    const response: AxiosResponse<Breed[]> = await CatService.api.get('/breeds/search', { params });
    return response.data;
  };

  static getBreedImages = async (pageParam = 0, breedId: string, limit: number): Promise<BreedImg[]> => {
    const params = {
      breed_id: breedId,
      limit,
      pageParam,
    };
    const response: AxiosResponse<BreedImg[]> = await CatService.api.get('/images/search', { params });
    return response.data;
  };
}

export default CatService;
