export interface Breed {
  id: string;
  name: string;
  origin?: string;
  temperament?: string;
  description?: string;
  life_span?: string;
  wikipedia_url?: string;
}

export interface CatImage {
  id: string;
  url: string;
  breeds?: Breed[];
}
