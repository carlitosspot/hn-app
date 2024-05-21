const BASE_URL = import.meta.env.VITE_HN_BASE_API;

export interface IStory {
  id: number;
  title: string;
  url: string;
  by: string;
  time: number;
  score: number;
  descendants: number;
  index?: number;
}

export const fetchTopStories = async (): Promise<number[]> => {
  console.log('xxxxxx', import.meta.env.MODE, import.meta.env.VITE_HN_BASE_API);
  const response = await fetch(`${BASE_URL}/topstories.json`);
  const storyIds = await response.json();
  return storyIds;
};

export const fetchStory = async (id: number): Promise<IStory> => {
  const response = await fetch(`${BASE_URL}/item/${id}.json`);
  const story = (await response.json()) as IStory;
  return story;
};
