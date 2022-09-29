import React, {useContext, useEffect, useState} from 'react';
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

const UnreadNotificationIcon = styled.div`
  position: absolute;
  top: 8px;
  right: 8px;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #33CC66;
  border: 1px solid #fff;
`

const UnreadNotificationIconWrapper = styled.div<{isUnreadIconActive: boolean}>`
  opacity: 1;

  ${({ isUnreadIconActive }) => !isUnreadIconActive && css`
    transition: opacity 0.3s;
    opacity: 0;
  `};
`

const NotificationButton = () => {
  const {setIsNotificationsActive, isNotificationsActive, notifications} = useContext(ServerNotificationContext)

  const [isUnreadIconActive, setIsUnreadIconActive] = useState(false)

  useEffect(() => {
    if (notifications.length > 0) {
      setIsUnreadIconActive(true)
      return
    }
    setIsUnreadIconActive(false)
  }, [notifications.length])

  const toggleNotificationActive = () => {
    setIsNotificationsActive(!isNotificationsActive)
  }

  return (
    <IconWrapper onClick={toggleNotificationActive}>
      <UnreadNotificationIconWrapper isUnreadIconActive={isUnreadIconActive}>
        <UnreadNotificationIcon />
      </UnreadNotificationIconWrapper>
      <NotificationIcon/>
    </IconWrapper>
  );
};

export default NotificationButton;