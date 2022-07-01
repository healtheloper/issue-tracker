import axios from 'axios';
import { FormEvent, useState, useReducer } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import Divider from '@components/data-display/Divider';
import UserIcon from '@components/data-display/UserIcon';
import Button from '@components/input/Button';
import InputBox from '@components/input/InputBox';
import TextAreaBox from '@components/input/TextAreaBox';
import Container from '@components/layout/Container';
import { useHeaderState } from '@contexts/HeaderProvider';
import SideMenu from '@pages/common/organisms/SideMenu';
import sideMenuReducer from '@pages/common/organisms/SideMenu/sideMenuReducer';
import { MenuStateType } from '@pages/common/organisms/SideMenu/type';
import TitleBar from '@pages/CreateIssuePage/TitleBar';

interface IFormEventTarget extends EventTarget {
  subject?: HTMLInputElement;
  description?: HTMLTextAreaElement;
}

export default function CreateIssuePage() {
  const [menuState, menuDispatch] = useReducer(sideMenuReducer, initState);
  const { userInfo } = useHeaderState();
  const [isSubmitButtonDisabled, setIsSubmitButtonDisabled] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const formData: IFormEventTarget = e.target;
    await axios.post('/api/issues', {
      subject: formData.subject?.value,
      writerId: userInfo?.id,
      assigneeIds: menuState.assignees.map((assignee) => assignee.id),
      labelIds: menuState.labels.map((label) => label.id),
      milestoneId: menuState.milestone?.id,
      comment: formData.description?.value,
    });
    navigate('/');
  };

  const handleClickCancleButton = () => {
    navigate('/');
  };

  const handleChangeTitleInput = ({ target }) => {
    if (target.value === '') {
      setIsSubmitButtonDisabled(true);
    } else if (target.value !== '' && isSubmitButtonDisabled) {
      setIsSubmitButtonDisabled(false);
    }
  };

  const handleClickItemAddBtn = (menu) => {
    menuDispatch({ type: menu.type, data: menu });
  };

  return (
    <Body onSubmit={handleSubmit}>
      <TitleBar title="새로운 이슈 작성" />
      <GridContainer>
        <UserIcon size="BIG" imgUrl={userInfo?.profileUrl} />
        <Container flexInfo={{ direction: 'column' }} gap={1}>
          <InputBox
            name="subject"
            onChange={handleChangeTitleInput}
            placeholder="제목"
          />
          <TextAreaBox />
        </Container>
        <SideMenu menuState={menuState} onClickAddBtn={handleClickItemAddBtn} />
      </GridContainer>
      <Divider margin="2rem" />
      <Container
        flexInfo={{ direction: 'row' }}
        position="absolute"
        right="0"
        gap={1}
      >
        <Button variant="warning" onClick={handleClickCancleButton}>
          작성 취소
        </Button>
        <Button type="submit" disabled={isSubmitButtonDisabled}>
          완료
        </Button>
      </Container>
    </Body>
  );
}

const initState: MenuStateType = {
  assignees: [],
  labels: [],
  milestone: undefined,
};

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 15fr 5fr;
  grid-gap: 1rem;
`;

const Body = styled.form`
  position: relative;
  max-width: 1440px;
  margin: 0 auto;
`;
