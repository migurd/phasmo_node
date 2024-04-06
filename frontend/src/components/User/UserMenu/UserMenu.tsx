import Alert from "../../Decoration/Alert/Alert";
import Button from "../../Decoration/Button/Button";
import { useState } from "react";
import GuessTheGhost from "../GuessTheGhost/GuessTheGhost";
import { signOut } from "../../../consumers/UserApi";
import ReadHistory from "../ReadHistory/ReadHistory";
import UserCard from "../Card/UserCard";

export default function UserMenu() {
  const [message, setMessage] = useState("")
  const [title, setTitle] = useState("")
  const [isVisible, setIsVisible] = useState(false)
  const [alertElement, setAlertAlement] = useState<JSX.Element>()
  const [isRelaod, setIsReload] = useState(false)

  const signOutBtn = async () => {
    await signOut();
    setTitle(`Sign Out`);
    setMessage(`Closing user's session.`);
    setAlertAlement(<></>);
    setIsVisible(true);
    setIsReload(true);
  }

  const btnPlay = () => {
    setTitle(`GUESS THE GHOST`);
    setMessage(`Epic guessing game`);
    setAlertAlement(<GuessTheGhost />);
    setIsVisible(true);
    setIsReload(false);
  }

  const btnCard = () => {
    setTitle(`CARD`);
    setMessage(`Welcome in, Ghost Hunter, here is your money and level!`);
    setAlertAlement(<UserCard title={"GHOST HUNTIN' RECRUIT"} />);
    setIsVisible(true);
    setIsReload(false);
  }

  const btnHistory = () => {
    setTitle(`HISTORY`);
    setMessage(`Epic game history`);
    setAlertAlement(<ReadHistory />);
    setIsVisible(true);
    setIsReload(false);
  }

  return (
    <>
      <div id="buttonsAdmin">
        <Button button={ { name: 'Play', type: 1, onClick: btnPlay } } />
        <Button button={ { name: 'Card', type: 3, onClick: btnCard } } />
        <Button button={ { name: 'History', type: 2, onClick: btnHistory } } />
        <Button button={ { name: 'Sign Out', type: 4, onClick: signOutBtn } } />
      </div>
      <Alert alert={ { depth: 1, title: title, message: message, isVisible: isVisible, isReload: isRelaod, element: alertElement, onClick: () => { setIsVisible(false); } } } />
    </>
  )
}