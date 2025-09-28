// src/types.ts
export interface Soil {
  id?: string;
  name: string;
  description: string;
  suitableCrops: string[];
}

export interface Distributor {
  id?: string;
  name: string;
  contact: string;
  location: string;
}