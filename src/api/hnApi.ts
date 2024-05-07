const BASE_URL = import.meta.env.VITE_HN_BASE_API;

export const fetchTopStories = async () => {
  const response = await fetch(`${BASE_URL}/topstories.json`);
  const storyIds = await response.json();
  return storyIds;
};

export const fetchStory = async (id: number) => {
  const response = await fetch(`${BASE_URL}/item/${id}.json`);
  const story = await response.json();
  return story;
};
