import styled from 'styled-components';

import UserIconSize from '@constants/sizes';
import { UserIconSizeType } from '@type/types';

export default function UserIcon({
  size,
  imgUrl,
}: {
  size: UserIconSizeType;
  imgUrl?: string;
}) {
  return (
    <UserIconContainer size={size}>
      <UserIconImg imgSrc={imgUrl} />
    </UserIconContainer>
  );
}

const UserIconContainer = styled.div<{ size: UserIconSizeType }>`
  ${({ size }) => `width: ${UserIconSize[size]}`};
  ${({ size }) => `height: ${UserIconSize[size]}`};
`;

const UserIconImg = styled.img<{ imgSrc?: string }>`
  width: 100%;
  height: 100%;
  border: 1px solid ${({ theme }) => theme.palette.borderColor};
  border-radius: 50%;
  content: ${({ imgSrc }) => `url(${imgSrc})`};
`;
