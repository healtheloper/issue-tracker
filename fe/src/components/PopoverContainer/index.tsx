import { useState } from 'react';
import styled from 'styled-components';

import PopoverMenus from '@components/PopoverContainer/PopoverMenus';
import mixin from '@style/mixin';

type PropsType<T> = {
  left?: string | number;
  top?: string | number;
  title: string;
  menus?: T[];
  onClickPopoverItem?: (item: T) => void;
  children: React.ReactElement;
};

export default function PopoverContainer<T>({
  left,
  top,
  title,
  menus,
  onClickPopoverItem,
  children,
}: PropsType<T>) {
  const [isPopoverOpened, setIsPopoverOpened] = useState(false);
  return (
    <Wrapper onClick={() => setIsPopoverOpened((prev) => !prev)}>
      <Trigger type="button">{children}</Trigger>
      {isPopoverOpened && (
        <PopoverMenus
          left={left}
          top={top}
          title={title}
          menus={menus}
          onClickPopoverItem={onClickPopoverItem}
        />
      )}
    </Wrapper>
  );
}

const Trigger = styled.button`
  color: inherit;
`;

const Wrapper = styled.div`
  ${mixin.flexMixin({ align: 'center', justify: 'space-between' })}
  position: relative;
`;
