import AddIcon from '@mui/icons-material/Add';
import CachedIcon from '@mui/icons-material/Cached';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import axios from 'axios';
import { FormEvent, useRef, useState } from 'react';
import styled, { useTheme } from 'styled-components';

import Button from '@components/Button';
import Container from '@components/Container';
import InputBox from '@components/inputs/InputBox';
import Label from '@components/Label';
import Squircle from '@components/Squircle';
import colors from '@constants/colors';
import { fontSize } from '@constants/fonts';
import { useLabelContext } from '@contexts/LabelProvider';
import mixin from '@style/mixin';
import { debounce } from '@util/timeUtils';

interface IFormEventTarget extends EventTarget {
  name?: HTMLInputElement;
  description?: HTMLInputElement;
  color?: HTMLInputElement;
  darkText?: HTMLInputElement;
}

const DEFAULT_LABEL_NAME = '레이블 이름';
const POSSIBLE_COLOR_HEX_LEN = 4;
const COLOR_HEX_MAX_LEN = 7;

export default function UpdateLabelBody({ label, toggleIsEditing }) {
  const [labelBgColor, setLabelBgColor] = useState(label.color);
  const [isLabelDarkText, setIsLabelDarkText] = useState(label.darkText);
  const [labelText, setLabelText] = useState(label.name);
  const colorInputRef = useRef<HTMLInputElement>(null);
  const theme = useTheme();
  const { refetch: labelAxiosRefetch } = useLabelContext();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const formData: IFormEventTarget = e.target;
    await axios.patch(`/api/labels/${label.id}`, {
      name: formData.name?.value,
      description: formData.description?.value,
      color: formData.color?.value,
      darkText: formData.darkText?.value,
    });
    toggleIsEditing();
    labelAxiosRefetch();
  };

  const handleChangeLabelNameInput = debounce({
    callback: ({ target }) => {
      if (target.value === '') {
        setLabelText(DEFAULT_LABEL_NAME);
      } else {
        setLabelText(target.value);
      }
    },
    msTime: 200,
  });

  const handleChangeLabelBgColorInput = debounce({
    callback: ({ target }) => {
      const isPossbleColorCode =
        target.value.length === POSSIBLE_COLOR_HEX_LEN ||
        target.value.length === COLOR_HEX_MAX_LEN;

      if (target.value > COLOR_HEX_MAX_LEN) {
        target.value = target.value.substr(0, COLOR_HEX_MAX_LEN);
        return;
      }
      if (target.value === '') {
        target.value = '#';
      }
      if (isPossbleColorCode) {
        target.style.color = 'inherit';
        setLabelBgColor(target.value);
      } else {
        target.style.color = theme.palette.warning;
      }
    },
    msTime: 200,
  });

  const handleChangeRadioButton = ({ target }) => {
    setIsLabelDarkText(JSON.parse(target.value));
  };

  const handleClickRandomLabelButton = () => {
    if (!colorInputRef.current) return;
    const randomHex = Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, '0')
      .toUpperCase();
    setLabelBgColor(`#${randomHex}`);
    colorInputRef.current.value = `#${randomHex}`;
  };

  return (
    <Wrapper onSubmit={handleSubmit}>
      <Title>레이블 편집</Title>
      <CreateInfo>
        <ExampleLabel>
          <Label
            text={labelText}
            bgColor={labelBgColor}
            darkText={isLabelDarkText}
          />
        </ExampleLabel>
        <InputBoxes>
          <InputBox
            name="name"
            placeholder="레이블 이름"
            defaultValue={label.name}
            onChange={handleChangeLabelNameInput}
          />
          <InputBox
            name="description"
            placeholder="설명(선택)"
            defaultValue={label.description}
          />
          <ColorInputs>
            <ColorInputBox width={15}>
              <InputCaption>배경 색상</InputCaption>
              <Container
                flexInfo={{ align: 'center', justify: 'space-between' }}
              >
                <ColorInput
                  ref={colorInputRef}
                  name="color"
                  defaultValue={labelBgColor}
                  onChange={handleChangeLabelBgColorInput}
                />
                <button type="button" onClick={handleClickRandomLabelButton}>
                  <CachedIcon sx={{ color: theme.palette.fontColor }} />
                </button>
              </Container>
            </ColorInputBox>
            <ColorInputBox width={20}>
              <InputCaption>텍스트 색상</InputCaption>
              <Container
                flexInfo={{ align: 'center', justify: 'space-around' }}
              >
                <RadioButton
                  type="radio"
                  id="selectDarkBtn"
                  defaultValue="true"
                  name="darkText"
                  onChange={handleChangeRadioButton}
                  defaultChecked={label.darkText}
                />
                <label htmlFor="selectDarkBtn">어두운 색</label>
                <RadioButton
                  type="radio"
                  id="selectLightBtn"
                  defaultValue="false"
                  name="darkText"
                  onChange={handleChangeRadioButton}
                  defaultChecked={!label.darkText}
                />
                <label htmlFor="selectLightBtn">밝은 색</label>
              </Container>
            </ColorInputBox>
          </ColorInputs>
        </InputBoxes>
      </CreateInfo>
      <ButtonBox>
        <Button size="small" variant="outlined" onClick={toggleIsEditing}>
          <CancelOutlinedIcon />
          <span>취소</span>
        </Button>
        <Button type="submit" size="small" variant="primary">
          <AddIcon />
          <span>완료</span>
        </Button>
      </ButtonBox>
    </Wrapper>
  );
}

const RadioButton = styled.input``;
const InputCaption = styled.span`
  color: ${colors.grey4};
  font-weight: 500;
`;

const ColorInput = styled.input`
  width: 4rem;
  background-color: inherit;
  color: inherit;
`;

const ColorInputBox = styled(Squircle)`
  display: grid;
  grid-template-columns: 5rem 1fr;
  grid-gap: 0.5rem;
  align-items: center;
  background-color: ${({ theme }) => theme.palette.darkerBgColor};
  padding: 0rem 1rem;
  :focus-visible {
    background-color: ${({ theme }) => theme.palette.bgColor};
    outline: 1px solid ${({ theme }) => theme.palette.borderColor};
  }
`;

const ColorInputs = styled.div`
  width: 80%;
  display: flex;
  gap: 1rem;
`;

const Wrapper = styled.form`
  ${mixin.flexMixin({ direction: 'column' })}
  gap:2rem;
  padding: 2rem;
`;

const ExampleLabel = styled.div`
  ${mixin.flexMixin({ justify: 'center', align: 'flex-end' })}
  padding-bottom: 2rem;
`;

const Title = styled.h3`
  font-size: ${fontSize.large};
`;

const ButtonBox = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  gap: 1rem;
`;

const CreateInfo = styled.div`
  display: grid;
  grid-template-columns: 2fr 5fr;
  width: 100%;
`;

const InputBoxes = styled.div`
  ${mixin.flexMixin({ direction: 'column' })}
  gap: 0.7rem;
`;
