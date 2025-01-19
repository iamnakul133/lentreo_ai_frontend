export const toggleTheme = (theme) => {
  // Save theme to localStorage
  localStorage.setItem('theme', theme);
  return {
    type: 'TOGGLE_THEME',
    payload: theme
  };
};
