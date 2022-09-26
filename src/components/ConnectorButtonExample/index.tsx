import React from 'react';
import {useHistory} from "react-router-dom";

type ConnectorButtonProps = {
  text: string;
  url?: string | undefined;
  icon: React.ReactElement;
}

const ConnectorButton = (props: ConnectorButtonProps) => {
  const {text, url, icon} = props
  const history = useHistory()

  const historyPush = () => {
    if (url) history.push(url)
  }

  return (
    <button
      className={`connection-button`}
      onClick={historyPush}
    >
      {icon}
      <div style={{marginRight: 12}}/>
      {text}
    </button>
  )
}

export default ConnectorButton;