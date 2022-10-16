import React, {useContext} from 'react';
import {useHistory} from "react-router-dom";
import texts from '../localization'
import {localized} from 'Standard/utils/localized';
import LocaleContext from 'Standard/LocaleContext'
import {ConnectorButtonsEnum} from "types/ConnectorButtons";
import {useCookies} from "react-cookie";
import {API_URL} from "api/constants";

type ConnectorButtonProps = {
  text: ConnectorButtonsEnum;
  url?: string | undefined;
  icon: React.ReactElement;
}

const LogoutButton = (props: ConnectorButtonProps) => {
  const {text, url, icon} = props
  const history = useHistory()
  const {locale} = useContext(LocaleContext)
  const [cookies, setCookies, removeCookies] = useCookies(['auth'])

  const logout = () => {
    if (url) {
      const logoutUrl = `${API_URL}/api/auth/logout`

      const requestOptions = {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      }

      fetch(logoutUrl, requestOptions)
        .then(res => res.json())
        .then(json => {
          if (json.statusCode === 200) {
            removeCookies('auth')
            history.push(url)
          }
        })
    }
  }

  return (
    <button
      className={`connection-button`}
      onClick={logout}
    >
      {icon}
      <div style={{marginRight: 12}}/>
      {localized(texts[text], locale)}
    </button>
  )
}

export default LogoutButton;