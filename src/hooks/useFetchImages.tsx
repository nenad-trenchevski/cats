// import { useState, useEffect } from 'react';
// import { getCatImage } from '../services/api';
// import { Breed } from './useGetBreeds';

// export interface CatImage {
//   id: string;
//   url: string;
// }

// const useFetchImages = (breeds: Breed[]) => {
//   const [breedImages, setBreedImages] = useState<Record<string, string>>({});
//   const [error, setError] = useState<Record<string, string>>({});

//   useEffect(() => {
//     const fetchImages = async () => {
//       const newBreedImages = { ...breedImages };
//       const newErrors = { ...error };
//       await Promise.all(
//         breeds.map(async breed => {
//           if (!newBreedImages[breed.id]) {
//             try {
//               const images = await getCatImage(breed.id);
//               console.log('the images', images);
//               if (images.length > 0) {
//                 newBreedImages[breed.id] = images[0].url;
//               } else {
//                 throw new Error();
//               }
//             } catch (err) {
//               newBreedImages[breed.id] = '';
//               newErrors[breed.id] = 'Failed to fetch image';
//             }
//           }
//         })
//       );

//       setBreedImages(newBreedImages);
//       setError(newErrors);
//     };

//     if (breeds.length > 0) {
//       fetchImages();
//     }
//   }, [breeds, breedImages, error]);

//   return {
//     breedImages,
//     error,
//   };
// };

// export default useFetchImages;

import { useState, useEffect } from 'react';
import { getCatImage } from '../services/api';
import { Breed } from './useGetBreeds';

export interface CatImage {
  id: string;
  url: string;
}

const useFetchImages = (breeds: Breed[]) => {
  const [breedImages, setBreedImages] = useState<Record<string, string>>({});
  const [error, setError] = useState<Record<string, string>>({});

  useEffect(() => {
    const fetchImages = async () => {
      const newBreedImages = { ...breedImages };
      const newErrors = { ...error };

      await Promise.all(
        breeds.map(async breed => {
          if (!newBreedImages[breed.id] && !newErrors[breed.id]) {
            try {
              const images = await getCatImage(breed.id);
              if (images.length > 0) {
                newBreedImages[breed.id] = images[0].url;
              } else {
                throw new Error('No image found');
              }
            } catch (err) {
              newBreedImages[breed.id] = '';
              newErrors[breed.id] = 'Failed to fetch image';
            }
          }
        })
      );

      setBreedImages(newBreedImages);
      setError(newErrors);
    };

    if (breeds.length > 0) {
      fetchImages();
    }
  }, [breeds, error, breedImages]);

  return { breedImages, error };
};

export default useFetchImages;
