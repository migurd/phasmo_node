import './AdminMenu.css'
import Button from "../../Decoration/Button/Button";
import Alert from '../../Decoration/Alert/Alert';
import CreateGhost from '../CreateGhost/CreateGhost';
import ReadGhost from '../ReadGhost/ReadGhost';
import { useEffect, useState } from 'react';
import { signOut } from '../../../consumers/UserApi';

export default function AdminMenu() {
  const [message, setMessage] = useState("")
  const [title, setTitle] = useState("")
  const [isVisible, setIsVisible] = useState(false)
  const [alertElement, setAlertElement] = useState<JSX.Element>()
  const [isRelaod, setIsReload] = useState(false)
  const [height, setHeight] = useState(500)
  const [width, setWidth] = useState(350)

  const btnSignOut = async () => {
    try {
      await signOut();
      setTitle(`Sign out`);
      setMessage(`Signed out successfully!`);
      setAlertElement(<></>);
      setHeight(200);
      setWidth(300);
      setIsReload(true);
    } catch (error) {
      setTitle(`Error`);
      setMessage(`There was a problem signing out!`);
      setIsReload(false);
    }
    setIsVisible(true);
  }

  const btnCreateGhost = () => {
    setTitle(`Create Ghost`);
    setMessage(`Create a new Ghost!`);
    setAlertElement(<CreateGhost />)
    setHeight(450);
    setWidth(400);
    setIsReload(false);
    setIsVisible(true);
  }

  const btnUpdateGhost = () => {
    setTitle(`Update Ghost`);
    setMessage(`Choose a ghost you want to update!`);
    setAlertElement(<ReadGhost onClick={() => {  }}  />)
    setIsVisible(true);
    setIsReload(false);
  }

  const btnReadGhost = () => {
    setTitle(`Read Ghosts`);
    setMessage(`See all the existent ghosts!`);
    setAlertElement(<ReadGhost />)
    setHeight(450);
    setWidth(600);
    setIsVisible(true);
    setIsReload(false);
  }

  useEffect(() => {
    document.title = 'Phasmo Admin';
  }, []);

  return (
    <>
      <div id="buttonsAdmin">
        <Button button={ { name: 'Create Ghost', type: 5, onClick: btnCreateGhost } } />
        <Button button={ { name: 'Update Ghost', type: 2, onClick: btnUpdateGhost } } />
        <Button button={ { name: 'Read Ghosts', type: 1, onClick: btnReadGhost } } />
        <Button button={ { name: 'Sign Out', type: 4, onClick: btnSignOut } } />
      </div>
      <Alert alert={ { depth: 1, title: title, message: message, height: height, isVisible: isVisible, isReload: isRelaod, width: width, element: alertElement, onClick: () => { setIsVisible(false); } } } />
    </>
  )
}