import styled from 'styled-components';

import mixin from '@style/mixin';
import { getCssValueByUnit } from '@util/css';

import PopoverMenu from './PopoverMenu';

interface IPopoverContainer {
  left?: number | string;
  top?: number | string;
  unit?: string;
}

interface PopoverMenusProps<M extends { id?: number }>
  extends IPopoverContainer {
  title: string;
  menus?: M[];
  onClickPopoverItem?: (item: M) => void;
}

export default function PopoverMenus<M extends { id?: number }>({
  left,
  top,
  unit,
  title,
  menus,
  onClickPopoverItem,
}: PopoverMenusProps<M>) {
  return (
    <>
      <PopoverContainer left={left} top={top} unit={unit}>
        <PopoverHeader>{title}</PopoverHeader>
        {menus?.map((menu) => (
          <PopoverMenu
            key={menu.id}
            menu={menu}
            onClickPopoverItem={onClickPopoverItem}
          />
        ))}
      </PopoverContainer>
      <DropdownBackdrop />
    </>
  );
}

const defaultLeft = '-2rem';
const defaultTop = '2rem';

const DropdownBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1;
`;

const PopoverContainer = styled.div<IPopoverContainer>`
  position: absolute;
  width: 15rem;
  left: ${({ left, unit }) =>
    left ? getCssValueByUnit(left, unit) : defaultLeft};
  top: ${({ top, unit }) => (top ? getCssValueByUnit(top, unit) : defaultTop)};
  z-index: 100;
  border: 1px solid ${({ theme }) => theme.palette.borderColor};
  border-radius: 1rem;
  overflow: hidden;
  z-index: 2;
`;

const PopoverHeader = styled.div`
  ${mixin.flexMixin({ align: 'center' })}
  background: grey;
  height: 3rem;
  padding-left: 1rem;
`;
