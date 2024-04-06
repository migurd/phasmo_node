import { useEffect, useState } from 'react'
import './UserCard.css'
import { getIdUser, getUser } from '../../../consumers/UserApi';

export default function UserCard({title} : { title: string }) {
  const [name, setName] = useState('');
  const [money, setMoney] = useState(0);
  const [level, setLevel] = useState(0);
  
  const getCardInfo = async ()  => {
    const id_user = await getIdUser();
    const user = await getUser(id_user);
    if (user) {
      setName(user.username);
      setMoney(user?.money);
      setLevel(user?.level);
    }
  }
  
  useEffect(() => {
    getCardInfo();
  }, []);

  return (
  <div id="userCard">
    <header>{title}</header>
    <div className="container">
      <div className="pfp">
        <img src="/decoration/pfp.png" alt="Profile picture" />
      </div>
      <div className="information">
        <div className="name">
          <span className="title nameTitle">Name</span>
          <p className="content nameContent">{name}</p>
        </div>
        <div className="money">
          <span className="title moneyTitle">Money</span>
          <p className="content moneyContent">${money}</p>
        </div>
        <div className="level">
          <span className="title levelTitle">Level</span>
          <p className="content levelContent">{level}</p>
        </div>
      </div>
    </div>
  </div>
  )
}