import { useState } from "react";
import Button from "../Decoration/Button/Button";
import './Login.css'
import Alert from "../Decoration/Alert/Alert";
import { login } from '../../consumers/UserApi'

export default function Login() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const [message, setMessage] = useState("")
  const [title, setTitle] = useState("")
  const [isVisible, setIsVisible] = useState(false)
  const [isReload, setIsReload] = useState(false)

  const btnLogin = async () => {
    try {
      await login(username, password);
      setIsReload(true);
      setTitle(`Welcome in, ${username}!`);
      setMessage(`You've started a session successfully!`);
    } catch (error: any) {
      setTitle(`Error`);
      setMessage(error.response?.data.message);
      setIsReload(false);
    }
    setIsVisible(true);
  }

  return(
    <>
      <div className="login">
        {/* <h1>Login</h1> */}
        <div className="mb-3">
          <label htmlFor="username" className="label">Username</label>
          <input
            type="text"
            id="username"
            className="input"
            placeholder="Enter your username"
            onChange={(e) => {
              setUsername(e.target.value)
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
              setPassword(e.target.value)
            }}
          />
        </div>
        <Button button={ { name: "Login", type: 3, onClick: btnLogin } } />
        <Alert alert={ { depth: 1, title: title, message: message, height: 250, width: 300, isVisible: isVisible, isReload: isReload, onClick: () => { setIsVisible(false); } } } />
      </div>
    </>
  )
}