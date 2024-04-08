import { useEffect, useState } from 'react'
import './ReadGhost.css'
import IGhost from '../../../../../backend/src/Models/Ghost'
import { getGhosts } from '../../../consumers/AdminApi'
import Alert from '../../Decoration/Alert/Alert'
import UpdateGhost from '../AdminMenu/UpdateGhost/UpdateGhost'

export default function ReadGhost({ onClick } : { onClick?: (ghost: IGhost) => void }) {
  const [ghostList, setGhostList] = useState<IGhost[]>()
  const [chosenGhost, setChosenGhost] = useState<number>()
  const [isVisible, setIsVisible] = useState<boolean>(true)
  
  const epicSetGhostList = async () => {
    const newGhostList: IGhost[] = await getGhosts();
    setGhostList(newGhostList);
  }

  useEffect(() => {
    epicSetGhostList();
  })

  return (
    <div id="readGhost">
      <table className="ghosts">
        <thead>
          <tr>
            <td>Pic</td>
            <td>Name</td>
            <td>Description</td>
          </tr>
        </thead>
        <tbody>
          {ghostList ? ghostList.map((ghost, idx) => (
            <tr className={`${ghost && ghost.status === 0 ? 'inactive' : ''} ${onClick ? 'clickable' : ''}`} key={idx} onClick={() => { onClick && ghost.id_ghost && setChosenGhost(idx+1); setIsVisible(true); }}>
              {ghost.pic && <td><img src={ghost.pic} alt={ghost.name} /></td>}
              <td>{ghost.name}</td>
              <td>{ghost.description}</td>
            </tr>
          )) : <tr><td colSpan={3}>No ghosts available</td></tr>}
        </tbody>
      </table>
      {ghostList && chosenGhost &&
        <Alert alert={ 
          { 
            depth: 2, 
            title: `Update ghost ${ghostList[chosenGhost-1].id_ghost}`, 
            message: `Update the ghost as you please!`, 
            isVisible: isVisible, 
            isReload: false, 
            width: 300, 
            height: 500, 
            element: 
              <UpdateGhost 
                id_ghost={ghostList[chosenGhost-1].id_ghost} // FOR SOME DAMN REASON I CANT SEND THE OBJECT AS A WHOLE
                name={ghostList[chosenGhost-1].name} 
                description={ghostList[chosenGhost-1].description}  
                pic={ghostList[chosenGhost-1].pic}
                status={ghostList[chosenGhost-1].status}
              />, 
            onClick: () => { setIsVisible(false); } 
          } } />
      }
    </div>
  )
}