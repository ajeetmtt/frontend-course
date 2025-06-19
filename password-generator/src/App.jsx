import React, { useRef } from "react";
import { useCallback } from "react";
import { useEffect } from "react";
import { useState } from "react";

const App = () => {
  const passwordRef = useRef(null);
  const [Password, setPassword] = useState("");
  const [numberAllowed, setNumberAllwod] = useState(false);
  const [characterAllowed, setCharacterAllowed] = useState(false);
  const [length, setLength] = useState(10);

  const generateRandomPassword = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0123456789";
    if (characterAllowed) str += "!@#$^%^&*()_+{}[]";

    for (let index = 1; index <= length; index++) {
      const char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, characterAllowed, numberAllowed, setPassword]);

  useEffect(() => {
    generateRandomPassword();
  }, [length, characterAllowed, numberAllowed, generateRandomPassword]);

  const handelCopyPassword = () => {
    navigator.clipboard.writeText(Password);
    passwordRef.current.select();
    passwordRef.current.setSelectRange(0, 6);
  };

  const handelCopy = () => {
    navigator.clipboard.writeText(Password);
    passwordRef.current.select();
  };

  return (
    <div className="max-w-md bg-gray-700 mx-auto my-7 rounded-md text-pink-600 px-4 py-2">
      <h1 className="text-center text-white font-bold text-2xl mb-5">
        Password Generator
      </h1>
      <div className="flex rounded-lg shadow">
        <input
          type="text"
          ref={passwordRef}
          placeholder="Password"
          className="w-full px-2 py-3 outline-none text-white"
          value={Password}
          readOnly
        />
        <button
          onClick={handelCopyPassword}
          className="bg-sky-400 text-white px-3 py-1"
        >
          Copy
        </button>
      </div>
      <div className="flex justify-between items-center gap-x-4 mt-5">
        <div className=" flex items-center gap-x-1 ">
          <input
            type="range"
            className="cursor-pointer"
            min={8}
            max={50}
            value={length}
            onChange={(e) => setLength(e.target.value)}
          />
          <label htmlFor="rangeValue">Length {length}</label>
        </div>
        <div className=" flex items-center gap-x-1 ">
          <input
            type="checkbox"
            defaultChecked={numberAllowed}
            onChange={() => setNumberAllwod((prev) => !prev)}
          />
          <label htmlFor="numberallowed">Number</label>
        </div>
        <div className=" flex items-center gap-x-1 ">
          <input
            type="checkbox"
            defaultChecked={numberAllowed}
            onChange={() => setCharacterAllowed((prev) => !prev)}
          />
          <label htmlFor="characterAllowed">Character</label>
        </div>
      </div>
    </div>
  );
};

export default App;
