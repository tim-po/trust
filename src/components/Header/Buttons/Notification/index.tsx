import React, {useContext, useState} from 'react';
import NotificationIcon from 'icons/Notification'
import styled, {css} from "styled-components";
import ServerNotificationContext from "Standard/ServerNotificationContext";

const IconWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid rgba(24, 24, 51, .1);
  border-radius: 20px;
  width: 40px;
  height: 40px;
  cursor: pointer;
`

const ActiveNotification = styled.div`
  position: absolute;
  top: 8px;
  right: 8px;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #33CC66;
  border: 1px solid #fff;
`

const ActiveNotificationWrapper = styled.div<{isNotificationsActive: boolean}>`
  opacity: 1;

  ${({ isNotificationsActive }) => isNotificationsActive && css`
    transition: opacity 0.3s;
    opacity: 0;
  `};
`

const NotificationButton = () => {
  const {setIsNotificationsActive, isNotificationsActive} = useContext(ServerNotificationContext)
  const [isIconActive, setIsActiveIcon] = useState<boolean>(false)

  const setIconStatus = () => {
    setIsActiveIcon(!isIconActive)
  }

  const setNotificationActive = () => {
    setIsNotificationsActive(!isNotificationsActive)
  }

  return (
    <IconWrapper onMouseEnter={setIconStatus} onMouseLeave={setIconStatus} onClick={setNotificationActive}>
      <ActiveNotificationWrapper isNotificationsActive={isNotificationsActive}>
        <ActiveNotification />
      </ActiveNotificationWrapper>
      <NotificationIcon animate={isIconActive}/>
    </IconWrapper>
  );
};

export default NotificationButton;