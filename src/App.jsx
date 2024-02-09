import { useState, useCallback, useEffect, useRef } from 'react'


function App() {
  const [length , setLength] = useState(8)
  const [numChecked, setIsNumChecked] = useState(false)
  const [charChecked, setIsCharChecked] = useState(false)
  const [password , setPassword] = useState('')


  //useRef hook
  const passwordRef = useRef(null)

  
  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if(numChecked) str += "0123456789"
    if(charChecked) str +="!@#$%^&*()_+{}:<>?"

    for(let i = 1 ; i<= length; i++){
      let char = Math.floor(Math.random() * str.length + 1)

      pass += str.charAt(char)
    }

    setPassword(pass)

  },[length,numChecked,charChecked])

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    
    window.navigator.clipboard.writeText(password)
  }, [password])

  useEffect(() => passwordGenerator(), [length, numChecked, charChecked, passwordGenerator])


  return (
    <div className="w-full max-w-md mx-auto p-4 my-8 bg-gray-700 rounded-md shadow-md text-white">
      <h1 className="text-center text-2xl font-bold mb-4">Password Generator</h1>
      <div className="flex items-center mb-4">
        <input
          type="text"
          value={password}
          className="flex-1 py-2 px-4 bg-gray-800 rounded-md mr-2"
          placeholder="Generated Password"
          readOnly
          ref={passwordRef}
        />
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
          onClick={copyPasswordToClipboard}
        >
          Copy
        </button>
      </div>

      <div className="flex flex-col mb-4">
        <label className="mb-1">Length: {length}</label>
        <input
          type="range"
          min={6}
          max={30}
          value={length}
          onChange={(e) => setLength(e.target.value)}
          className="cursor-pointer"
        />
      </div>

      <div className="flex items-center mb-4">
        <input
          type="checkbox"
          checked={numChecked}
          id="numberInput"
          onChange={() => setIsNumChecked((prev) => !prev)}
          className="mr-2"
        />
        <label htmlFor="numberInput">Include Numbers</label>
      </div>

      <div className="flex items-center mb-4">
        <input
          type="checkbox"
          checked={charChecked}
          id="charInput"
          onChange={() => setIsCharChecked((prev) => !prev)}
          className="mr-2"
        />
        <label htmlFor="charInput">Include Special Characters</label>
      </div>

      <div className="text-center">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
          onClick={passwordGenerator}
        >
          Generate Password
        </button>
      </div>
    </div>
  );
}

export default App
