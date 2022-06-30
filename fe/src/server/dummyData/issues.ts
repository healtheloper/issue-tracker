import { IssueType } from '@type/types';

const alanProfileURL = 'https://avatars.githubusercontent.com/u/95538993?v=4';
const ikjoProfileURL = 'https://avatars.githubusercontent.com/u/82401504?v=4';
const parkProfileURL = 'https://avatars.githubusercontent.com/u/58503584?v=4';

const issues: IssueType[] = [
  {
    id: 1,
    status: 'OPEN',
    subject: '백엔드 기능 구현',
    replies: [
      {
        id: 1,
        writer: 'Alan',
        profileUrl: alanProfileURL,
        createdDateTime: '2022-06-18T21:23:00',
        comment: '우하하하 열심히 해보세요!',
      },
    ],
    writer: 'ikjo',
    profileUrl: ikjoProfileURL,
    createdDateTime: '2022-06-18T21:23:00',
    milestone: {
      id: 1,
      subject: '이슈 트래커 서비스 구현',
      description: '프론트 및 백엔드 구현',
      endDate: '2022-07-11',
      status: 'OPEN',
      totalCountOfIssues: 1,
      countOfClosedIssues: 0,
    },
    assignees: [
      {
        id: 1,
        identity: 'ikjo',
        name: '익조',
        profileUrl: ikjoProfileURL,
      },
    ],
    labels: [
      {
        id: 1,
        name: 'be',
        description: '백엔드 라벨',
        color: '#00cec9',
      },
      {
        id: 3,
        name: 'bug',
        description: '버그 해결',
        color: '#ff7675',
      },
    ],
  },
  {
    id: 2,
    status: 'OPEN',
    subject: '프론트엔드 기능 구현',
    replies: [
      {
        id: 2,
        writer: 'ikjo',
        createdDateTime: '2022-06-20T05:23:00',
        comment: '우하하하 열심히 해보세요!!!!',
        profileUrl: ikjoProfileURL,
      },
    ],
    writer: 'Alan',
    profileUrl: alanProfileURL,
    createdDateTime: '2022-06-20T05:23:00',
    milestone: {
      id: 2,
      subject: '숙소 예약 서비스 구현',
      description: '프론트 및 백엔드 구현',
      endDate: '2022-07-11',
      status: 'OPEN',
      totalCountOfIssues: 1,
      countOfClosedIssues: 0,
    },
    assignees: [],
    labels: [
      {
        id: 2,
        name: 'fe',
        description: '프론트엔드 라벨',
        color: '#a29bfe',
      },
    ],
  },
  {
    id: 3,
    status: 'OPEN',
    subject: '배포',
    replies: [
      {
        id: 3,
        writer: 'Alan',
        createdDateTime: '2022-06-20T05:23:00',
        comment: '우하하하 열심히 해보세요!!!!',
        profileUrl: alanProfileURL,
      },
      {
        id: 4,
        writer: 'Park',
        createdDateTime: '2022-06-21T05:23:00',
        comment: '우하하하 열심히 해보세요~~!!!!',
        profileUrl: parkProfileURL,
      },
    ],
    writer: 'Park',
    profileUrl: parkProfileURL,
    createdDateTime: '2022-06-20T21:23:00',
    milestone: undefined,
    assignees: [],
    labels: [],
  },
  {
    id: 4,
    status: 'CLOSED',
    subject: '이슈 4번 제목',
    replies: [],
    writer: 'ikjo',
    profileUrl: ikjoProfileURL,
    createdDateTime: '2022-06-21T18:23:00',
    milestone: {
      id: 3,
      subject: '반찬 주문 서비스 구현',
      description: '프론트 및 백엔드 구현',
      endDate: '2022-07-11',
      status: 'OPEN',
      totalCountOfIssues: 1,
      countOfClosedIssues: 1,
    },
    assignees: [
      {
        id: 2,
        identity: 'Park',
        name: '파크',
        profileUrl: parkProfileURL,
      },
      {
        id: 3,
        identity: 'Alan',
        name: '앨런',
        profileUrl: alanProfileURL,
      },
    ],
    labels: [
      {
        id: 2,
        name: 'fe',
        description: '프론트엔드 라벨',
        color: '#a29bfe',
      },
    ],
  },
  {
    id: 5,
    status: 'CLOSED',
    subject: '이슈 5번 제목',
    replies: [],
    writer: 'Alan',
    profileUrl: alanProfileURL,
    createdDateTime: '2022-06-21T21:23:00',
    milestone: {
      id: 4,
      subject: '카카오 페이지 구현',
      description: '프론트 구현',
      endDate: '2022-06-11',
      status: 'CLOSED',
      totalCountOfIssues: 1,
      countOfClosedIssues: 1,
    },
    assignees: [
      {
        id: 3,
        identity: 'Alan',
        name: '앨런',
        profileUrl: alanProfileURL,
      },
    ],
    labels: [
      {
        id: 3,
        name: 'bug',
        description: '버그 해결',
        color: '#ff7675',
      },
    ],
  },
];

export default issues;
