import { useReducer } from 'react';

import { ActionType, MenuStateType } from '@components/SideMenu/type';

export default function useMenu() {
  const [menuState, menuDispatch] = useReducer(reducer, initState);
}

const initState: MenuStateType = {
  assignees: [],
  labels: [],
  milestone: undefined,
};

const reducer = (state: MenuStateType, action: ActionType) => {
  switch (action.type) {
    case 'ASSIGNEE': {
      if (state.assignees.some(({ id }) => id === action.data.id)) {
        return state;
      }
      return {
        ...state,
        assignees: [...state.assignees, action.data],
      };
    }
    case 'LABEL': {
      if (state.labels.some(({ id }) => id === action.data.id)) {
        return state;
      }
      return {
        ...state,
        labels: [...state.labels, action.data],
      };
    }
    case 'MILESTONE':
      return {
        ...state,
        milestone: action.data,
      };
    default:
      throw Error('Unexpected action type on side menu');
  }
};
