const flash = (state = {}, action) => {
  switch (action.type) {
    case 'SET_FLASH':
      return { message: action.message, color: action.color, duration: action.duration };
    case 'CLEAR_FLASH':
      return {};
    default:
      return state;
  }
};

export default flash;