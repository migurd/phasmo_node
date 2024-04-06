import './AdminMenu.css'
import Button from "../../Decoration/Button/Button";
import { useState } from 'react';
import Alert from '../../Decoration/Alert/Alert';
import { signOut } from '../../../consumers/UserApi';

export default function AdminMenu() {
  const [message, setMessage] = useState("")
  const [title, setTitle] = useState("")
  const [isVisible, setIsVisible] = useState(false)
  const [alertElement, setAlertAlement] = useState<JSX.Element>()
  const [isRelaod, setIsReload] = useState(false);


  const btnSignOut = async () => {
    await signOut();
    setTitle(`Sign out`);
    setMessage(`Signed out successfully!`);
    setIsVisible(true);
    setIsReload(true);
  }

  const createGhost = () => {
    console.log('ola')
    setTitle(`Sign out`);
    setMessage(`Signed out successfully!`);
    setIsVisible(true);
    setIsReload(false);
  }

  return (
    <>
      <div id="buttonsAdmin">
        <Button button={ { name: 'Create Ghost', type: 1, onClick: createGhost } } />
        <Button button={ { name: 'Update Ghost', type: 2, onClick: () => {} } } />
        <Button button={ { name: 'Read Ghost', type: 3, onClick: () => {} } } />
        <Button button={ { name: 'Sign Out', type: 4, onClick: btnSignOut } } />
      </div>
      <Alert alert={ { depth: 1, title: title, message: message, isVisible: isVisible, isReload: isRelaod, element: alertElement, onClick: () => { setIsVisible(false); } } } />
    </>
  )
}