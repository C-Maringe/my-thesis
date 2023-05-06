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
    setAlgorithim('KNN')
  }

  const [isFraud, setIsFraud] = useState(false)
  const [apiIddle, setApiIddle] = useState(false)

  const [error, setError] = useState('')

  const handleMakePredictions = () => {
    axios.post('http://127.0.0.1:5000/v1/api/predict', makePredictionsData)
      .then((response) => {
        setApiIddle(true)
        setError('')
        if (response?.data?.status === 200) {
          setIsFraud(response?.data?.is_fraud)
          // setTimeout(() => {
          //   resetVariables()
          // }, 1000)
        }
        else {
          setError(response?.data?.error)
        }
      })
      .catch((error) => {
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
            <button className="bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition"
              onClick={handleMakePredictions}>
              Make Predictions
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
      </div>
    </div>
  )
}
