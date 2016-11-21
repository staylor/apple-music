import catalogData from '../data/catalog';

const initialState = catalogData;

function catalog(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}

export default catalog;
