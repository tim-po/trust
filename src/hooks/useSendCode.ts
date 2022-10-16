import {RouteName} from "../router";
import {useContext, useState} from "react";
import NotificationContext from "../Standard/utils/NotificationContext";
import {useHistory} from "react-router-dom";
import {useCookies} from "react-cookie";

export const useSendCode = (body: {}, serverUrl: string, appUrl?: string) => {
  const [incorrectCodeError, setIncorrectCodeError] = useState('')
  const notification = useContext(NotificationContext)
  const history = useHistory()

  const [cookies, setCookie, removeCookie] = useCookies(['auth'])

  const requestOptions = {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(body)
  };

  const fetchCode = async () => {
    fetch(serverUrl, requestOptions)
      .then(res => res.json())
      .then(json => {
        if (json.statusCode === 200) {

          if (json.token && appUrl === RouteName.VERIFICATION) {
            setCookie("auth", `${json.token}`, {path: '/'});
            history.push(RouteName.VERIFICATION);
          }

          if (appUrl === RouteName.LOGIN) {
            history.push(appUrl)
            removeCookie('auth')
          }

          if (appUrl === RouteName.ACCOUNT) {
            notification.displayNotification(
              `Success`,
              'You successfully update your personal data',
            )
            history.push(RouteName.ACCOUNT)
          }

        } else {
          setIncorrectCodeError(json.message)
        }
      })
  }

  return {fetchCode, incorrectCodeError}
}