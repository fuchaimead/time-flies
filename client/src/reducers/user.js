const user = (state = {}, action ) => {
  switch(action.type) {
    case 'USER':
      return {
        ...state,
        ...action.user
      }
    case 'LOGIN':
      return { ...action.user }
    case 'LOGOUT':
      return {}
    default:
      return state;
   }
 }
 
 export default user;