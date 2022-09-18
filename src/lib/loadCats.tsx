import { blobToBase64 } from 'base64-blob';
import { Cat } from '../components/ChallengerPage/Stepper';

export const CAT_API_URL = 'https://cataas.com';

export type AllCatsResponse = {
  id: string;
}[];

export const loadCats = async (): Promise<{ id: string }[]> => {
  const response = await fetch(CAT_API_URL + '/api/cats?limit=1000&tags=cute');
  const data = (await response.json()) as AllCatsResponse;
  const cats = data.map((data) => ({
    id: data.id,
  }));

  return cats;
};

export const loadCatImage = async (id: string) => {
  const response = await fetch(CAT_API_URL + `/cat/${id}`);
  const blob = await response.blob();
  const base64 = await blobToBase64(blob);
  console.log('base64', base64);
  return base64;
};
