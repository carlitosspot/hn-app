const BASE_URL = 'https://hacker-news.firebaseio.com/v0';

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
