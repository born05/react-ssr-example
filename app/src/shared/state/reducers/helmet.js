const UPDATE_TITLE = 'helmet/UPDATE_TITLE';

const initialState = {
  title: '',
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case UPDATE_TITLE:
      return {
        ...state,
        title: action.title,
      };
    default:
      return state;
  }
}

export function updateTitleAction(title) {
  return {
    type: UPDATE_TITLE,
    title,
  };
}
