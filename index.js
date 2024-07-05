const redux = require('redux');
const createStore = redux.createStore;

const Bake_Cake = 'hello';

// Action creator
function cake() {
  return {
    type: Bake_Cake
  };
}

// Initial state
const initialState = {
  noCake: 10
};

// Reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case Bake_Cake:
      return {
        ...state, // Spread the current state to maintain other properties
        noCake: state.noCake - 1
      };
    default:
      return state;
  }
};

// Create store
const store = createStore(reducer);

// Log the initial state
console.log('Initial state:', store.getState());
const subscribe = store.subscribe(() => console.log('Updated state:', store.getState()));

store.dispatch(cake())