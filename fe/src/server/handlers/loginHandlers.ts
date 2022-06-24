import { rest } from 'msw';

import { minute } from '@util/timeUtils';

interface IUser {
  id: number;
  identity: string;
  name: string;
  email: string;
  password: string;
  profile_url: string;
}

interface IFakeToken {
  'r-1'?: string;
}

let lastUserId = 2;
const fakeUsers: IUser[] = [
  {
    id: 1,
    identity: 'healtheopler',
    name: 'Park',
    email: 'super0872@naver.com',
    password: '1234',
    profile_url: 'https://avatars.githubusercontent.com/u/58503584?v=4',
  },
];

const fakeTokenMap: IFakeToken = {
  'r-1': 'a-1-1',
};

const getAccessTokenOrderCounter = (userId) => {
  let accessTokenOrder = 1;
  return () => {
    accessTokenOrder += 1;
    return `a-${userId}-${accessTokenOrder}`;
  };
};

const startLoginTimer = (userId) => {
  const refreshToken = `r-${userId}`;
  // 1분 뒤 access token 을 a-2 로 변경
  const accessTokenInterval = setInterval(() => {
    const accessToken = getAccessTokenOrderCounter(userId);
    fakeTokenMap[refreshToken] = accessToken;
  }, minute(1));

  // 2분 뒤 refresh token 을 삭제
  setTimeout(() => {
    delete fakeTokenMap[refreshToken];
    clearInterval(accessTokenInterval);
  }, minute(3));
};

const postJoin = async (req, res, ctx) => {
  const { email, name, password } = req.body;
  const profileUrl =
    'https://thumbs.dreamstime.com/b/default-avatar-profile-vector-user-profile-default-avatar-profile-vector-user-profile-profile-179376714.jpg';
  const userData: IUser = {
    id: lastUserId,
    identity: 'fakeIdentity',
    name,
    email,
    password,
    profile_url: profileUrl,
  };
  fakeUsers.push(userData);
  lastUserId += 1;
  return res(ctx.status(201));
};

const postLogin = async (req, res, ctx) => {
  const { email, password } = req.body;
  const user = fakeUsers.find((fUser) => fUser.email === email);
  if (!user) {
    return res(ctx.status(401));
  }
  if (user.password === password) {
    startLoginTimer(user.id);
    return res(
      ctx.status(201),
      ctx.cookie('refresh-token', `r-${user.id}`),
      ctx.set('access-token', `a-${user.id}`),
      ctx.json({
        userInfo: {
          id: user.id,
          identity: user.identity,
          name: user.name,
          profileUrl: user.profile_url,
        },
        status: 'OK',
        message: '로그인이 정상적으로 처리되었습니다.',
      }),
    );
  }
  return res(ctx.status(401));
};

const getGithubLogin = async (_, res, ctx) => {
  // code 를 통해 user 를 찾는 로직은 일단 없음
  const user = fakeUsers[0];
  startLoginTimer(user.id);
  return res(
    ctx.cookie('refresh-token', `r-${user.id}`),
    ctx.set('access-token', `a-${user.id}`),
    ctx.json({
      profileUrl: user.profile_url,
      status: 'OK',
      message: '로그인이 정상적으로 처리되었습니다.',
    }),
  );
};

const getLogout = async (req, res, ctx) => {
  const refreshToken = req.cookies['refresh-token'];
  delete fakeTokenMap[refreshToken];
  return res(
    ctx.json({
      status: 'OK',
      message: '로그아웃 처리되었습니다.',
    }),
  );
};

const getAccessTokenReIssue = async (req, res, ctx) => {
  console.log(req.cookie, req.headers.cookie, req.headers);
  const refreshToken = req.cookies['refresh-token'];
  const accessToken = fakeTokenMap[refreshToken];
  if (!accessToken) {
    res(
      ctx.status(403),
      ctx.json({
        status: 'FORBIDDEN',
        message: 'refresh 토큰의 만료기한이 지났습니다. 다시 로그인 해주세요.',
      }),
    );
  }
  return res(
    ctx.status(200),
    ctx.set('access-token', accessToken),
    ctx.json({
      status: 'OK',
      message: 'access 토큰이 갱신되었습니다.',
    }),
  );
};

const getMe = (req, res, ctx) => {
  const { authorization } = req.headers;
  const [, accessToken] = authorization.split(' ');
  // jwt 써야하는데 일단 안씀
  const userId = accessToken;
  const user = fakeUsers.find((fUser) => fUser.id === userId);
  return res(ctx.status(200), ctx.json(user));
};

export default function loginHandlers() {
  return [
    rest.post('/api/join', postJoin),
    rest.post('/api/login', postLogin),
    rest.get('/api/github-login', getGithubLogin),
    rest.get('/api/getLogout', getLogout),
    rest.get('/api/access-token/reissue', getAccessTokenReIssue),
    rest.get('/api/mine', getMe),
  ];
}
