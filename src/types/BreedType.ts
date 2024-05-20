export interface BreedQueryResponse {
  pageParams: Array<number>;
  pages: Array<Array<Breed>>;
}

export interface ImgQueryResponse {
  pageParams: Array<number>;
  pages: Array<Array<BreedImg>>;
}

export interface Breed {
  id: string;
  name: string;
}

export interface BreedImg {
  id: string;
  url: string;
}

export interface SelectBreed {
  breedId: string;
  name: string;
}

export type NewVal = { label: string; breedId: string } | string | null;
