import { useState, useRef } from "react";
/* import AttractionService from "../services/services"; */
import Input from "./Input";
import React from 'react'


const AttracionsForm = () => {

const [inputValue, setInputValue ] = useState({
    name: "",
    settlement: "",
    address: "",
    category: "",
    price: "",
    note: "",
  })

function inputHandleChange(event){
    setInputValue({...inputValue,
        [event.target.name]:event.target.value
    })
}

const categoryOptions = [
    {
      value: "",
      text: "Válassz!",
    },
    {
      value: "múzeum",
      text: "múzeum",
    },
    {
      value: "étterem",
      text: "étterem",
    },
    {
      value: "építmény",
      text: "építmény",
    },
  ];
  return (
    <form>
        <Input name="name" onChange={inputHandleChange} type="text" inputValue={inputValue}/>
        <Input name="settlement" onChange={inputHandleChange} type="text" inputValue={inputValue}/>
        <Input name="address" onChange={inputHandleChange} type="text" inputValue={inputValue}/>
        <Input name="category" onChange={inputHandleChange} type="select" options={categoryOptions} inputValue={inputValue}/>
        <Input name="price" onChange={inputHandleChange} type="text" inputValue={inputValue}/>
        <Input name="note" onChange={inputHandleChange} type="textarea" inputValue={inputValue}/>
    </form>
  )
}

export default AttracionsForm