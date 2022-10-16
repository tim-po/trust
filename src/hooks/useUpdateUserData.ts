import {useState} from "react";
import {useCookies} from "react-cookie";

export const useUserDataUpdate = (body: {}, serverUrl: string) => {
  const [isServerError, setIsServerError] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [serverErrorMessage, setServerErrorMessage] = useState<string>('')
  const [isWaitingForCode, setIsWaitingForCode] = useState<boolean>(false)

  const [cookies] = useCookies(['auth'])

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": cookies.auth
    },
    body: JSON.stringify(body)
  }

  const fetchData = async () => {
    setIsLoading(true)
    fetch(serverUrl, requestOptions)
      .then(res => res.json())
      .then(json => {
        if (json.statusCode === 200) {
          setIsServerError(false)
          setIsWaitingForCode(true)
        } else {
          setIsServerError(true)
          setServerErrorMessage(json.message)
        }
      })
      .finally(() => setIsLoading(false))
  }

  return {fetchData, isServerError, isLoading, serverErrorMessage, isWaitingForCode, setIsWaitingForCode, setIsServerError}
}