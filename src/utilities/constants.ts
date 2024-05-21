export const BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const API_KEY = import.meta.env.VITE_API_KEY;

export enum ErrorMessages {
  FAILED_IMG_FETCH = 'Failed to fetch image',
  ERROR_BREED_FETCH = 'Error fetching breeds',
  ERROR_FETCH_FOR_BREED = 'Error fetching images for breed',
}
