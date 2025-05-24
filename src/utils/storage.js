export const saveStory = (story) => {
  const stories = JSON.parse(localStorage.getItem('savedStories')) || [];
  stories.push(story);
  localStorage.setItem('savedStories', JSON.stringify(stories));
};

export const getStories = () => {
  return JSON.parse(localStorage.getItem('savedStories')) || [];
};

export const clearStories = () => {
  localStorage.removeItem('savedStories');
};