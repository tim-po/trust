import {useCookies} from "react-cookie";
import {useState} from "react";
import {API_URL} from "../api/constants";

export const useNextStep = (dealId: string) => {
  const [cookies] = useCookies(['auth'])

  const [isServerError, setIsServerError] = useState<boolean>(false)

  const nextStepUrl = `${API_URL}/api/transaction/nextStepFor/${dealId}`

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": cookies.auth
    }
  }

  const setNewStep = async () => {
    fetch(nextStepUrl, requestOptions)
      .then(res => res.json())
  }

  return {setNewStep, isServerError}
}