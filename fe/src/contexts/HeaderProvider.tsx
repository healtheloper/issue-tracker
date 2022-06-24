import React, { useReducer, useContext, createContext, Dispatch } from 'react';

import { MemberType } from '@type/types';

interface IHeaderState {
  isLogin: boolean;
  isDarkMode: boolean;
  userInfo: MemberType | null;
  accessToken: string | null;
}

type Action =
  | { type: 'LOGIN'; userInfo: MemberType; accessToken: string }
  | { type: 'LOGOUT' }
  | { type: 'THEME_TOGGLE' }
  | { type: 'REFRESH_TOKEN'; accessToken: string };

type HeaderDispatch = Dispatch<Action>;

const initHeaderState: IHeaderState = {
  isLogin: false,
  isDarkMode: Boolean(localStorage.getItem('isDarkMode')) || false,
  userInfo: null,
  accessToken: null,
};

/*
  Default Page 작업용 init state
*/
const initHeaderStateForDefaultPage: IHeaderState = {
  isLogin: true,
  isDarkMode: JSON.parse(localStorage.getItem('isDarkMode') || 'false'),
  userInfo: {
    id: 1,
    identity: 'ikjo',
    name: '익조',
    profileUrl: 'https://avatars.githubusercontent.com/u/82401504?v=4',
  },
  accessToken: 'fakeToken',
};
//

const HeaderStateContext = createContext<IHeaderState | null>(null);
const HeaderDispatchContext = createContext<HeaderDispatch | null>(null);

function reducer(state: IHeaderState, action: Action): IHeaderState {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        isLogin: true,
        userInfo: action.userInfo,
        accessToken: action.accessToken,
      };
    case 'LOGOUT':
      return {
        ...state,
        isLogin: false,
        userInfo: null,
      };
    case 'THEME_TOGGLE': {
      const toggleData = !state.isDarkMode;
      localStorage.setItem('isDarkMode', JSON.stringify(toggleData));
      return {
        ...state,
        isDarkMode: toggleData,
      };
    }
    case 'REFRESH_TOKEN': {
      return {
        ...state,
        accessToken: action.accessToken,
      };
    }
    default:
      throw new Error('Unhandled action');
  }
}

export function HeaderProvider({ children }: { children: React.ReactNode }) {
  // TODO: init state 작업에 따라 바꿔서 사용하세요
  const [state, dispatch] = useReducer(reducer, initHeaderState);

  return (
    <HeaderStateContext.Provider value={state}>
      <HeaderDispatchContext.Provider value={dispatch}>
        {children}
      </HeaderDispatchContext.Provider>
    </HeaderStateContext.Provider>
  );
}

export function useHeaderState() {
  const state = useContext(HeaderStateContext);
  if (!state) throw new Error('Cannot find HeaderProvider');
  return state;
}

export function useHeaderDispatch() {
  const dispatch = useContext(HeaderDispatchContext);
  if (!dispatch) throw new Error('Cannot find HeaderProvider');
  return dispatch;
}
