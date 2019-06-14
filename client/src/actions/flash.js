
export const setFlash = (message, color, duration) => {
  return { type: 'SET_FLASH', message, color, duration};
};

export const clearFlash = () => {
  return { type: 'CLEAR_FLASH' };
};