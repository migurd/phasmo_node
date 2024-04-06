import axios from "axios";
import { useState } from "react"
import Button from "../Decoration/Button/Button";
import Alert from "../Decoration/Alert/Alert";

export default function Register() {
  const [usernameReg, setUsernameReg] = useState("")
  const [passwordReg, setPasswordReg] = useState("")

  const [message, setMessage] = useState("")
  const [title, setTitle] = useState("")
  const [isVisible, setIsVisible] = useState(false)

  const register = () => {
    axios.post('http://localhost:3000/user/register', {
      username: usernameReg,
      password: passwordReg,
    }).then((response) => {
      console.log(response?.data.message);
      login();
    }).catch((err) => {
      console.error(err.response?.data.message)
    })
  }

  const login = () => {
    axios.post('http://localhost:3000/user/login', {
      username: usernameReg,
      password: passwordReg,
    }).then((response) => {
      console.log(response?.data.message);
      setTitle(`Welcome ${usernameReg}!`);
      setMessage(`Created account successfully. Starting session!`);
      setIsVisible(true)
    }).catch((err) => {
      console.error(err.response?.data.message)
    })
  }

  return(
    <>
      <div className="register">
        <div className="mb-3">
          <label htmlFor="username" className="label">Username</label>
          <input
            type="text"
            id="username"
            className="input"
            placeholder="Enter your username"
            onChange={(e) => {
              setUsernameReg(e.target.value)
            }}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="label">Password</label>
          <input
            type="password"
            id="password"
            className="input"
            placeholder="Enter your password"
            onChange={(e) => {
              setPasswordReg(e.target.value)
            }}
          />
        </div>
        <Button button={ { name: "Register", type: 3, onClick: register } } />
        <Alert alert={ { depth: 1, title: title, message: message, isVisible: isVisible, onClick: () => { setIsVisible(false); window.location.href = '/'; } } } />
      </div>
    </>
  )
}