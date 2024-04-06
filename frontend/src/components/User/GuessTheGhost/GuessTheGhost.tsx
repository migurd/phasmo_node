import { useEffect, useState } from 'react';
import './GuessTheGhost.css'
import IGhost from '../../../../../backend/src/Models/Ghost'
import IUserHasGhost from '../../../../../backend/src/Models/UserHasGhost'
import { IUser } from '../../../../../backend/src/Models/User'
import Button from '../../Decoration/Button/Button';
import Alert from '../../Decoration/Alert/Alert';
import { getAmountGhosts, getGhost, postUserHasGhost } from '../../../consumers/AdminApi'
import { getIdUser, getUser, updateUser } from '../../../consumers/UserApi';

export default function GuessTheGhost() {
  const [correctGhost, setCorrectGhost] = useState(-1);
  const [userGuess, setUserGuess] = useState(-1);
  const [ghostList, setGhostList] = useState<IGhost[]>([]);

  const [message, setMessage] = useState("")
  const [title, setTitle] = useState("")
  const [isVisible, setIsVisible] = useState(false)

  function getRandomNumber(n: number, m: number): number {
    const range = m - n + 1;
    return Math.floor(Math.random() * range) + n;
  }

  const newGame = async () => {
    setUserGuess(-1);
    try {
      const amountGhosts = await getAmountGhosts();
  
      let newGhostList: any[] = [];
      let numbersGenerated: number[] = [];
  
      for (let i = 0; i < 4; i++) {
        let numGenerated = getRandomNumber(1, amountGhosts);
        if (!numbersGenerated.includes(numGenerated)) {
          newGhostList.push(await getGhost(numGenerated));
          numbersGenerated.push(numGenerated);
        }
        else i--;
      }
      setGhostList(newGhostList);
      setCorrectGhost(getRandomNumber(0, 3));
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const guessGhost = async () => {
    const correctGhostName = ghostList[correctGhost].name;
    const ghostFoundId = ghostList[correctGhost].id_ghost;
    const id_user = await getIdUser();
    const isDead = getRandomNumber(1, 100) <= 25 ? 1 : 0;
    const isDiscovered = userGuess === correctGhost ? 1 : 0;

    const helpmegod: IUserHasGhost = {
      user_id_user: id_user,
      ghost_id_ghost: ghostFoundId ? ghostFoundId : 0,
      isFound: 1,
      isDiscovered: isDiscovered,
      isDead: isDead,
    }

    // Guess was saved
    await postUserHasGhost(helpmegod);

    // Update user regarding guess
    let currUser: IUser | undefined = await getUser(id_user);

    if (currUser) {
      const moreMoney = getRandomNumber(2000, 3000);
      const lessMoney = Math.floor((moreMoney / 10));

      if (isDiscovered) {
        currUser.level += 1; // bro guessed right
        if (isDead) {
          setTitle('You died, but discovered the ghost');
          setMessage(`The ghost was a ${correctGhostName}. You earned 1 level.`);
        } else {
          currUser.money += moreMoney; // bro survived and guessed the ghost
          setTitle('You survived and guessed the ghost!');
          setMessage(`It indeed was a ${correctGhostName}. You earned 1 level and $${moreMoney}.`);
        }
      }
      else {
        if (isDead) {
          setTitle('You died!');
          setMessage(`A ${correctGhostName} killed you. Keep trying!`);
        } else {
          currUser.money += lessMoney; // bro survived
          setTitle('You didn\'t guess, but survived!');
          setMessage(`It was a ${correctGhostName}. You earned $${lessMoney}`);
        }
      }
      await updateUser(currUser);
      setIsVisible(true);
    }
    else {
      console.log('User not found. :(');
    }
  }

  useEffect(() => {
    newGame();
  }, []);

  return (
    <div id="guessTheGhost">
      <div className="ghosts">
        <div
          className="rightGhost"
          style={ { backgroundImage: `url("${ghostList[correctGhost]?.pic}")` } }
        ></div>
        {ghostList.map((ghost, idx) => (
          <div
            key={ghost.id_ghost}
            onClick={() => setUserGuess(idx)}
            className={idx === userGuess ? "active" : ""}
          >
            <p>{ghost.name}</p>
          </div>
        ))}
      </div>
      <div className="btnGuessTheGhost">
        <Button button={ { name: 'Guess', type: 5, onClick: guessGhost } } />
      </div>
      <Alert alert={ { depth: 2, title: title, message: message, isVisible: isVisible, height: 200, onClick: () => { setIsVisible(false); newGame(); } } } />
    </div>
  )
}