import './AdminMenu.css'
import Button from "../../Decoration/Button/Button";
import axios from 'axios';
import { useState } from 'react';
import Alert from '../../Decoration/Alert/Alert';

export default function AdminMenu() {
  const [message, setMessage] = useState("")
  const [title, setTitle] = useState("")
  const [isVisible, setIsVisible] = useState(false)

  const signOut = async () => {
      try {
        const response = await axios.get("http://localhost:3000/user/signout");
        console.log(response);
        setTitle(`Sign out`);
        setMessage(`Signed out successfully!`);
        setIsVisible(true);
      } catch (error) {
        console.error("Error signing out:", error);
    }
  }

  return (
    <>
      <div id="buttonsAdmin">
        <Button button={ { name: 'Create Ghost', type: 1, onClick: () => {} } } />
        <Button button={ { name: 'Update Ghost', type: 2, onClick: () => {} } } />
        <Button button={ { name: 'Read Ghost', type: 3, onClick: () => {} } } />
        <Button button={ { name: 'Sign Out', type: 4, onClick: signOut } } />
      </div>
      <Alert alert={ { depth: 1, title: title, message: message, isVisible: isVisible, onClick: () => { setIsVisible(false); window.location.href = '/'; } } } />
    </>
  )
}