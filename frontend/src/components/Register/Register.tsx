import axios from "axios";
import { useState } from "react"
import Button from "../Decoration/Button/Button";
import Alert from "../Decoration/Alert/Alert";
import { login, register } from '../../consumers/UserApi'

export default function Register() {
  const [usernameReg, setUsernameReg] = useState("")
  const [passwordReg, setPasswordReg] = useState("")

  const [message, setMessage] = useState("")
  const [title, setTitle] = useState("")
  const [isVisible, setIsVisible] = useState(false)

  const btnRegister = async () => {
    await register(usernameReg, passwordReg);
    setTitle(`Welcome ${usernameReg}!`);
    setMessage(`Created account successfully. Starting session!`);
    setIsVisible(true)
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
        <Button button={ { name: "Register", type: 3, onClick: btnRegister } } />
        <Alert alert={ { depth: 1, title: title, message: message, isVisible: isVisible, isReload: true, onClick: () => { login(usernameReg, passwordReg); } } } />
      </div>
    </>
  )
}