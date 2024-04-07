import Alert from "../../Decoration/Alert/Alert";
import Button from "../../Decoration/Button/Button";
import { useState } from "react";
import GuessTheGhost from "../GuessTheGhost/GuessTheGhost";
import { signOut } from "../../../consumers/UserApi";
import ReadHistory from "../ReadHistory/ReadHistory";
import UserCard from "../Card/UserCard";
import ReadGhost from "../../Admin/ReadGhost/ReadGhost";

export default function UserMenu() {
  const [message, setMessage] = useState("")
  const [title, setTitle] = useState("")
  const [isVisible, setIsVisible] = useState(false)
  const [alertElement, setAlertElement] = useState<JSX.Element>()
  const [height, setHeight] = useState(500)
  const [width, setWidth] = useState(0)
  const [isReload, setIsReload] = useState(false)


  const signOutBtn = async () => {
    await signOut();
    setTitle(`Sign Out`);
    setMessage(`Closing user's session.`);
    setAlertElement(<></>);
    setHeight(200);
    setWidth(350);
    setIsVisible(true);
    setIsReload(true);
  }

  const btnPlay = () => {
    setTitle(`GUESS THE GHOST`);
    setMessage(`Epic guessing game`);
    setAlertElement(<GuessTheGhost />);
    setHeight(550);
    setWidth(350);
    setIsVisible(true);
    setIsReload(false);
  }

  const btnCard = () => {
    setTitle(`CARD`);
    setMessage(`Welcome in, Ghost Hunter, here is your money and level!`);
    setAlertElement(<UserCard title={"GHOST HUNTIN' RECRUIT"} />);
    setHeight(400);
    setWidth(350);
    setIsVisible(true);
    setIsReload(false);
  }

  const btnHistory = () => {
    setTitle(`HISTORY`);
    setMessage(`Epic game history`);
    setAlertElement(<ReadHistory />);
    setHeight(500);
    setWidth(550);
    setIsVisible(true);
    setIsReload(false);
  }

  const btnReadGhost = () => {
    setTitle(`Read Ghosts`);
    setMessage(`See all the existent ghosts!`);
    setAlertElement(<ReadGhost />)
    setHeight(550);
    setWidth(600);
    setIsVisible(true);
    setIsReload(false);
  }

  return (
    <>
      <div id="buttonsAdmin">
        <Button button={ { name: 'Play', type: 1, onClick: btnPlay } } />
        <Button button={ { name: 'Card', type: 3, onClick: btnCard } } />
        <Button button={ { name: 'History', type: 2, onClick: btnHistory } } />
        <Button button={ { name: 'See Ghosts', type: 5, onClick: btnReadGhost } } />
        <Button button={ { name: 'Sign Out', type: 4, onClick: signOutBtn } } />
      </div>
      <Alert alert={ { depth: 1, title: title, message: message, height: height, width: width, isVisible: isVisible, isReload: isReload, element: alertElement, onClick: () => { setIsVisible(false); } } } />
    </>
  )
}