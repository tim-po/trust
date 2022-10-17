import {useCookies} from "react-cookie";
import {useState} from "react";
import {IDeal} from "../types/ManageStatus";
import {API_URL} from "../api/constants";
import {useParams} from "react-router";

export const useCurrentDeal = (dealId: string) => {
  const [cookies] = useCookies(['auth'])

  const [currentDeal, setCurrentDeal] = useState<IDeal | undefined>(undefined)
  const [isServerError, setIsServerError] = useState<boolean>(false)

  const params: { id: string } = useParams()

  const dealByIdUrl = `${API_URL}/api/transaction/${dealId}`

  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": cookies.auth
    }
  };

  const fetchCurrentDeal = async () => {

    fetch(dealByIdUrl, requestOptions)
      .then(res => res.json())
      .then(json => {
        if (json.statusCode === 200) {
          setCurrentDeal(json.data.transaction)
        } else {
          setIsServerError(true)
        }
      })
  }

  const nextStep = async (body: { desiredInvestmentAmount?: number }) => {

    const nextStepUrl = `${API_URL}/api/transaction/nextStepFor/${params.id}`

    const requestOptionsNextStep = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": cookies.auth
      },
      body: JSON.stringify(body)
    }

    fetch(nextStepUrl, requestOptionsNextStep)
      .then(res => res.json())
      .then(json => setCurrentDeal(json.data.transaction))
  }

  return {fetchCurrentDeal, nextStep,  isServerError, currentDeal, setCurrentDeal}
}