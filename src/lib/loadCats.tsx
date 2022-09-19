import { blobToBase64 } from 'base64-blob';
import { sampleSize } from 'lodash';
import { Cat } from '../components/ChallengerPage/Stepper';

export const CAT_API_URL = 'https://cataas.com';

export type AllCatsResponse = {
  id: string;
}[];

export const loadAllCats = async (): Promise<{ id: string }[]> => {
  const response = await fetch(CAT_API_URL + '/api/cats?limit=1000&tags=cute');
  const data = (await response.json()) as AllCatsResponse;
  const cats = data.map((data, i) => ({
    id: data.id,
  }));

  return cats;
};

export const loadCatImage = async (id: string) => {
  const response = await fetch(CAT_API_URL + `/cat/${id}`);
  const blob = await response.blob();
  const base64 = await blobToBase64(blob);
  return base64;
};

export const loadFewCats = async (): Promise<Cat[]> => {
  const allCats = await loadAllCats();
  const sampleCats = sampleSize(allCats, 9);

  const cats = await Promise.all(
    sampleCats.map(async (cat, i) => ({
      id: cat.id,
      image: await loadCatImage(cat.id),
      secret: i.toString(),
    }))
  );

  return cats;
};
