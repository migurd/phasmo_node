import { useState } from 'react'
import './App.css'
import axios from 'axios'

function App() {
  const [usernameReg, setUsernameReg] = useState("")
  const [passwordReg, setPasswordReg] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const [response, setResponse] = useState("")

  const register = () => {
    axios.post('http://localhost:3000/user/register', {
      username: usernameReg,
      password: passwordReg,
    }).then((response) => {
      console.log(response)
      setResponse(response.data.message)
    })
  }

  const login = () => {
    axios.post('http://localhost:3000/user/login', {
      username: username,
      password: password,
    }).then((response) => {
      console.log(response)
      setResponse(response.data.currentUser.username)
    })
  }

  return (
    <>
      <div className="App">
        <div className="registration">
          <h1>Registraton</h1>
          <label htmlFor="usernameReg">Username</label>
          <input
            type="text"
            id="usernameReg"
            onChange={(e) => {
              setUsernameReg(e.target.value)
            }}
          />
          <label htmlFor="passwordReg">Password</label>
          <input
            type="text"
            id="passwordReg"
            onChange={(e) => {
              setPasswordReg(e.target.value)
            }}
          />
          <button onClick={register}>
            Register
          </button>
        </div>

        <div className="login">
          <h1>Login</h1>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            onChange={(e) => {
              setUsername(e.target.value)
            }}
          />
          <label htmlFor="password">Password</label>
          <input
            type="text"
            id="password"
            onChange={(e) => {
              setPassword(e.target.value)
            }}
          />
          <button onClick={login}>
            Login
          </button>
        </div>
      </div>
      <p>{response}</p>
    </>
  )
}

export default App
