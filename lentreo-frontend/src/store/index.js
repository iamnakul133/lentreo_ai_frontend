import { createStore } from 'redux';
import { useSelector as useReduxSelector, useDispatch as useReduxDispatch } from 'react-redux';

const initialState = {
  theme: 'light'
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'TOGGLE_THEME':
      return {
        ...state,
        theme: action.payload
      };
    default:
      return state;
  }
};

export const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

// Custom hooks with types
export const useSelector = useReduxSelector;
export const useDispatch = useReduxDispatch; 