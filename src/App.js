import Input from "./input";
import { useState } from "react";
import axios from "axios";

export default function App() {

  const [encripted_agent_account, setencripted_agent_account] = useState('')
  const [city, setCity] = useState('')
  const [association, setAssociation] = useState('')
  const [agent_name, setAgent_name] = useState('')
  const [encripted_billid, setEncripted_billid] = useState('')
  const [payment_channels, setPayment_channels] = useState('')
  const [standardised_amount, setStandardised_amount] = useState('')
  const [previous_transaction_count, setPrevious_transaction_count] = useState('')

  const [algorithim, setAlgorithim] = useState('KNN')

  const makePredictionsData = {
    algorithim: algorithim,
    data: {
      encripted_agent_account: parseInt(encripted_agent_account),
      city: parseInt(city),
      association: parseInt(association),
      agent_name: parseInt(agent_name),
      encripted_billid: parseInt(encripted_billid),
      payment_channels: parseInt(payment_channels),
      standardised_amount: parseInt(standardised_amount),
      previous_transaction_count: parseInt(previous_transaction_count)
    }
  }

  const resetVariables = () => {
    setencripted_agent_account('')
    setCity('')
    setAssociation('')
    setAgent_name('')
    setEncripted_billid('')
    setPayment_channels('')
    setStandardised_amount('')
    setPrevious_transaction_count('')
    // setAlgorithim('KNN')
  }

  const [isFraud, setIsFraud] = useState(false)
  const [apiIddle, setApiIddle] = useState(false)

  const [error, setError] = useState('')

  const [loading, setLoading] = useState(false)

  const handleMakePredictions = () => {
    setLoading(true)
    axios.post('https://thesis-flask-backend.onrender.com/v1/api/predict', makePredictionsData)
      .then((response) => {
        setApiIddle(true)
        setLoading(false)
        setError('')
        if (response?.data?.status === 200) {
          setIsFraud(response?.data?.is_fraud)
          setTimeout(() => {
            resetVariables()
          }, 10000)
        }
        else {
          setError(response?.data?.error)
        }
      })
      .catch((error) => {
        setLoading(false)
        console.log(error)
      })
  }

  const selectAlgorithims = [
    { id: 1, label: "SVM", value: "SVM" },
    { id: 2, label: "XG-BOOST", value: "XGB" },
    { id: 3, label: "LOGISTIC", value: "LOG" },
    { id: 4, label: "NAIVE BAYES", value: "NB" },
    { id: 5, label: "KNN", value: "KNN" }
  ]

  const [showSelectItems, setShowSelectItems] = useState(false)

  return (
    <div className="relative min-h-screen w-full dark:bg-black">
      {showSelectItems && <div className="absolute z-10 bg-white border-slate-600 top-24 right-32 rounded-xl p-3">
        {selectAlgorithims.map((data) => {
          return (
            <div key={data.id} onClick={() => { setAlgorithim(data.value); setShowSelectItems(false) }}
              className="rounded-3xl border text-black hover:bg-slate-600 hover:text-white p-3 mt-2 mb-2">
              {data.label} Algorithim
            </div>)
        })}
      </div>}
      <div className="bg-white dark:bg-black w-full h-full lg:bg-opacity-50">
        <div className="flex flex-col md:flex-row  justify-between">
          <nav className="px-12 py-5 text-white text-4xl font-bold w-1/2">
            FRAUD DETECTION APP
          </nav>
          <div onClick={() => { setShowSelectItems(true) }}
            className="px-12 py-5 hover:bg-white hover:text-black text-white text-2xl font-bold cursor-pointer border border-red-700 w-96 rounded-xl md:mr-12">
            {algorithim === 'KNN' ? "Select Algorithim to use" : `${algorithim} Algorithim`}
          </div>
        </div>

        <div className="flex justify-center mt-2">
          <div className="bg-black bg-opacity-70 px-8 py-16 self-center border-teal-500 rounded-lg shadow-sm">
            <h2 className="text-white text-4xl mb-8 font-semibold">
              Enter Transaction Details To Predict
            </h2>
            <div className="flex flex-col gap-4 md:w-full">
              <div className="flex flex-col md:flex-row gap-5">
                <Input
                  id={"encripted_agent_account"}
                  onChange={
                    (e) => { setencripted_agent_account(e.target.value) }}
                  value={encripted_agent_account}
                  label={"Encripted agent account"}
                  type={"number"} />
                <Input
                  id={"city"}
                  onChange={
                    (e) => { setCity(e.target.value) }}
                  value={city}
                  label={"City"}
                  type={"number"} />
              </div>
              <div className="flex flex-col md:flex-row gap-5">
                <Input
                  id={"association"}
                  onChange={
                    (e) => { setAssociation(e.target.value) }}
                  value={association}
                  label={"Association"}
                  type={"number"} />
                <Input
                  id={"agent_name"}
                  onChange={
                    (e) => { setAgent_name(e.target.value) }}
                  value={agent_name}
                  label={"Agent name"}
                  type={"number"} />
              </div>
              <div className="flex flex-col md:flex-row gap-5">
                <Input
                  id={"encripted_billid"}
                  onChange={
                    (e) => { setEncripted_billid(e.target.value) }}
                  value={encripted_billid}
                  label={"Encripted billid"}
                  type={"number"} />
                <Input
                  id={"payment_channels"}
                  onChange={
                    (e) => { setPayment_channels(e.target.value) }}
                  value={payment_channels}
                  label={"Payment channels"}
                  type={"number"} />
              </div>
              <div className="flex flex-col md:flex-row gap-5">
                <Input
                  id={"standardised_amount"}
                  onChange={
                    (e) => { setStandardised_amount(e.target.value) }}
                  value={standardised_amount}
                  label={"Standardised amount"}
                  type={"number"} />
                <Input
                  id={"previous_transaction_count"}
                  onChange={
                    (e) => { setPrevious_transaction_count(e.target.value) }}
                  value={previous_transaction_count}
                  label={"Previous transaction count"}
                  type={"number"} />
              </div>
            </div>
            <button disabled={loading} className={`${loading ? "bg-red-400" : "bg-red-600 hover:bg-red-700"}  py-3 text-white rounded-md w-full mt-10 transition`}
              onClick={handleMakePredictions}>
              {loading ?
                <div className="flex flex-row items-center justify-center font-bold text-xl">
                  <svg aria-hidden="true" role="status" className="inline h-8 mr-5 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 
                    0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 
                    91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 
                    9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 
                    20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 
                    0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 
                    10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 
                    15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 
                    38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="black" />
                  </svg>
                  Proccessing...
                </div>
                :
                "Make Predictions"
              }

            </button>
            <div className="flex flex-col w-full bg-white text-black italic mt-4 p-2 border hover:bg-slate-400 rounded-lg">

              {apiIddle &&
                error !== '' ?
                <div className="mb-2 border-b p-3 rounded-xl text-white bg-red-700">
                  {JSON.stringify(error)}
                </div> :
                isFraud ?
                  <div className="mb-2 border-b p-3 rounded-xl text-white bg-red-700">
                    Results: Fraud Detected
                  </div> :
                  <div className={"mb-2 border-b p-3 rounded-xl text-white bg-slate-700"}>
                    Results: No Fraud Detected
                  </div>
              }
              <div>
                Default Algorithim KNN
              </div>
            </div>
          </div>
        </div>
      </div >
    </div >
  )
}
