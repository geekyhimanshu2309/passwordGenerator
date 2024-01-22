import { useEffect,useRef } from "react";
import { useState,useCallback } from "react"

function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("")
  //useRef hook
  const passwordRef = useRef("null")

  const passwordGenerator = useCallback(() => {
    let pass= ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numberAllowed) str += "0123456789"
    if(charAllowed) str += "!@#$%^&*-+=[]{}~`"

    for(let i = 0; i <= length; i++){
      let char = Math.floor((Math.random() * str.length+1))
      pass += str.charAt(char)
    }
    setPassword(pass);
  
  }, [length,numberAllowed,charAllowed,setPassword])

  const copyPasswordtoClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0,99); //To copy selected range
    window.navigator.clipboard.writeText(password)
  },[password])

  useEffect(() => {
    passwordGenerator()
  },[length,charAllowed,numberAllowed,passwordGenerator])

  return (
    <div className="bg-black h-screen w-full">
      <div className="flex flex-col justify-center w-full">
        <h1 className="flex text-white mt-10 font-bold justify-center text-4lg">
          Password Generator
        </h1>
        <div
          className="flex-col max-w-md px-5
          flex justify-center w-full p-4 mx-auto rounded-lg
        my-8 text-orange-500 bg-gray-500"
        >
          <div className="flex justify-center">
            <input
              type="text"
              value={password}
              className="outline-none w-full p-1 px-3 rounded-md"
              placeholder="Password"
              ref={passwordRef}
              readOnly
            />
            <button 
              className="bg-blue-700 rounded-md text-white px-3 p-1 outline-none shrink-0"
              onClick={copyPasswordtoClipboard}>
              Copy
            </button>
          </div>
          <div className="flex justify-center gap-x-1">
            <div className="flex gap-x-1 justify-between">
              <input
                type="range"
                min={6}
                max={100}
                value={length}
                className="cursor-pointer"
                onChange={(e) => {
                  setLength(e.target.value);
                }}
              />
              <label>Length: {length}</label>
            </div>
            <div className="flex gap-x-1 ">
              <input
                type="checkbox"
                defaultChecked={numberAllowed}
                id="numberInput"
                onChange={() => {
                  setNumberAllowed((prev) => !prev);
                }}
              />
              <label htmlFor="numberInput">Numbers</label>
            </div>
            <div className="flex gap-x-1 ">
              <input
                type="checkbox"
                defaultChecked={charAllowed}
                id="charInput"
                onChange={() => {
                  setCharAllowed((prev) => !prev);
                }}
              />
              <label htmlFor="numberInput">Character</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App
