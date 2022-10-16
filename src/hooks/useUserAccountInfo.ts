import {useCookies} from "react-cookie";
import {useState} from "react";

export const useUserAccountInfo = (serverUrl: string) => {
  const [cookies] = useCookies(['auth'])

  const [phone, setPhone] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [communicationMethod, setCommunicationMethod] = useState<{type: string, contact: string} | null>(null)
  const [isServerError, setIsServerError] = useState<boolean>(false)

  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": cookies.auth
    }
  };

  const fetchUserAccountInfo = async () => {
    fetch(serverUrl, requestOptions)
      .then(res => res.json())
      .then(json => {
        if (json.statusCode === 200) {
          setEmail(json.email);
          setPhone(json.phoneNumber);
          setCommunicationMethod(json.contactMethod);
        } else {
          setIsServerError(true)
        }
      })
  }

  return {phone, email, communicationMethod, fetchUserAccountInfo, isServerError}
}