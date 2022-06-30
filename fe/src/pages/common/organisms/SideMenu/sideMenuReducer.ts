import {
  ActionType,
  MenuStateType,
} from '@pages/common/organisms/SideMenu/type';

const sideMenuReducer = (state: MenuStateType, action: ActionType) => {
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
    case 'ALL':
      return action.data;
    default:
      throw Error('Unexpected action type on side menu');
  }
};

export default sideMenuReducer;
