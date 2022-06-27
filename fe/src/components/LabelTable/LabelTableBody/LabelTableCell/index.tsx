import { useState } from 'react';
import styled, { css } from 'styled-components';

import LabelTableCellItem from '@components/LabelTable/LabelTableBody/LabelTableCell/LabelTableCellItem';
import UpdateLabelBody from '@components/LabelTable/LabelTableBody/LabelTableCell/UpdateLabelBody';

export default function LabelTableCell({ label }) {
  const [isEditing, setIsEditing] = useState(false);

  const toggleIsEditing = () => {
    setIsEditing(!isEditing);
  };

  return (
    <CellContainer isEditing={isEditing}>
      {isEditing ? (
        <UpdateLabelBody label={label} toggleIsEditing={toggleIsEditing} />
      ) : (
        <LabelTableCellItem label={label} toggleIsEditing={toggleIsEditing} />
      )}
    </CellContainer>
  );
}

const CellContainer = styled.div<{ isEditing: boolean }>`
  display: grid;
  padding: 0 2rem;
  min-height: 6.25rem;
  border-top: 1px solid ${({ theme }) => theme.palette.borderColor};
  background-color: ${({ theme }) => theme.palette.contentColor};
  ${({ isEditing }) =>
    !isEditing &&
    css`
      grid-template-columns: 5fr 1fr;
      :hover {
        background-color: ${({ theme }) => theme.palette.lighterBgColor};
      }
    `}
`;
