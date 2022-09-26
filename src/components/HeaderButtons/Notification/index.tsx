import React, {useState} from 'react';
import NotificationIcon from 'icons/Notification'
import styled from "styled-components";

const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid rgba(24, 24, 51, .1);
  border-radius: 20px;
  width: 40px;
  height: 40px;
  cursor: pointer;
`

const NotificationButton = () => {

  const [isIconActive, setIsActiveIcon] = useState<boolean>(false)

  const setIconStatus = () => {
    setIsActiveIcon(!isIconActive)
  }

  return (
    <IconWrapper onMouseEnter={setIconStatus} onMouseLeave={setIconStatus}>
      <NotificationIcon animate={isIconActive}/>
    </IconWrapper>
  );
};

export default NotificationButton;