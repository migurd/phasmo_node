import axios from "axios";
import { useState } from "react";
import Button from "../Decoration/Button/Button";
import './Login.css'
import Alert from "../Decoration/Alert/Alert";

export default function Login() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const [message, setMessage] = useState("")
  const [title, setTitle] = useState("")
  const [isVisible, setIsVisible] = useState(false)

  const login = () => {
    axios.post('http://localhost:3000/user/login', {
      username: username,
      password: password,
    }).then((response) => {
      console.log(response);
      setTitle(`Welcome ${username}!`);
      setMessage(`You've started a session successfully!`);
      setIsVisible(true)
    }).catch((err) => {
      console.error(err.response?.data.message)
    })
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
        <Button button={ { name: "Login", type: 3, onClick: login } } />
        <Alert alert={ { depth: 1, title: title, message: message, isVisible: isVisible, onClick: () => { setIsVisible(false); window.location.href = '/'; } } } />
      </div>
    </>
  )
}