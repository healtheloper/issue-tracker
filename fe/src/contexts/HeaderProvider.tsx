import React, { useReducer, useContext, createContext, Dispatch } from 'react';

import { MemberType } from '@type/types';

interface IHeaderState {
  isLogin: boolean;
  isDarkMode: boolean;
  userInfo: MemberType | null;
}

type Action =
  | { type: 'LOGIN'; userInfo: MemberType }
  | { type: 'LOGOUT' }
  | { type: 'THEME_TOGGLE' };

type HeaderDispatch = Dispatch<Action>;

/*
  Production Header
*/
const isLoginInBrowser = localStorage.getItem('isLogin');
const initHeaderStateForProd: IHeaderState = {
  isLogin: isLoginInBrowser ? JSON.parse(isLoginInBrowser) : false,
  isDarkMode: JSON.parse(
    localStorage.getItem('isDarkMode') ||
      String(window.matchMedia('(prefers-color-scheme: dark)').matches),
  ),
  userInfo: null,
};

/*
  Development Header
*/
const initHeaderStateForDev: IHeaderState = {
  isLogin: true,
  isDarkMode: JSON.parse(
    localStorage.getItem('isDarkMode') ||
      String(window.matchMedia('(prefers-color-scheme: dark)').matches),
  ),
  userInfo: {
    id: 1,
    identity: 'ikjo',
    name: '익조',
    profileUrl: 'https://avatars.githubusercontent.com/u/82401504?v=4',
  },
};
//

const initHeaderState =
  process.env.NODE_ENV === 'production'
    ? initHeaderStateForProd
    : initHeaderStateForDev;

const HeaderStateContext = createContext<IHeaderState | null>(null);
const HeaderDispatchContext = createContext<HeaderDispatch | null>(null);

function reducer(state: IHeaderState, action: Action): IHeaderState {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        isLogin: true,
        userInfo: action.userInfo,
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
    default:
      throw new Error('Unhandled action');
  }
}

export function HeaderProvider({ children }: { children: React.ReactNode }) {
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
