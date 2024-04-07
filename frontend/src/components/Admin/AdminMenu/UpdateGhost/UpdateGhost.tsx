import { useEffect, useState } from 'react'
import IGhost from '../../../../../../backend/src/Models/Ghost'
import { updateGhost } from '../../../../consumers/AdminApi'
import Alert from '../../../Decoration/Alert/Alert'
import Button from '../../../Decoration/Button/Button'
import './UpdateGhost.css'
import { isPicValid } from '../../../../consumers/Helpers'

export default function UpdateGhost(ghost: IGhost) {
  const [message, setMessage] = useState("")
  const [title, setTitle] = useState("")
  const [isVisible, setIsVisible] = useState(false)

  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [pic, setPic] = useState("")
  const [isEpicPicValid, setIsEpicPicValid] = useState<boolean>()

  const areFieldsVaild = (name: string, description: string): boolean =>{
    if (name.length > 0 && description.length > 0) return true;
    return false;
  }

  const checkIsValid = async () => {
    try {
      const isValid: boolean = await isPicValid(pic);
      setIsEpicPicValid(isValid);
    } catch (err) {
      setIsEpicPicValid(false);
    }
  }

  const btnUpdateGhost = async () => {
    if (!areFieldsVaild(name, description)) {
      setTitle(`Error`);
      setMessage(`Name or description can't be empty.`);
    } else {
      if (!isEpicPicValid) {
        setTitle(`Error`);
        setMessage(`Invalid image URL.`);
      }
      else {
        try {
          const udpatedGhost: IGhost = {
            id_ghost: ghost.id_ghost,
            name: name,
            description: description,
            pic: pic,
            status: ghost.status,
          }
          await updateGhost(udpatedGhost);
          setTitle(`Ghost updated`);
          setMessage(`Ghost ${ghost.name} was updated successfully!`);
        } catch (error) {
          setTitle(`Error`);
          setMessage(`Error ocurred updating the ghost.`);
        }
      }
    }
    setIsVisible(true);
  }

  const btnActivateGhost = async () => {
    try {
      const udpatedGhost: IGhost = {
        id_ghost: ghost.id_ghost,
        name: ghost.name,
        description: ghost.description,
        pic: ghost.pic,
        status: 1,
      }
      await updateGhost(udpatedGhost);
      setTitle(`Ghost activated`);
      setMessage(`Ghost ${ghost.name} was activated successfully!`);
    } catch (error) {
      setTitle(`Error`);
      setMessage(`Error ocurred activating the ghost.`);
    }
    setIsVisible(true);
  }

  const btnDeactivateGhost = async () => {
    try {
      const udpatedGhost: IGhost = {
        id_ghost: ghost.id_ghost,
        name: ghost.name,
        description: ghost.description,
        pic: ghost.pic,
        status: 0,
      }
      await updateGhost(udpatedGhost);
      setTitle(`Ghost deactivaded`);
      setMessage(`Ghost ${ghost.name} was deactivaded successfully!`);
    } catch (error) {
      setTitle(`Error`);
      setMessage(`Error ocurred deactivating the ghost.`);
    }
    setIsVisible(true);
  }

  useEffect(() => {
    setName(ghost.name);
    setDescription(ghost.description);
    if (ghost.pic) setPic(ghost.pic);
  }, [])

  useEffect(() => {
    checkIsValid();
  });

  return (
    <div className="updateGhost">
      <div className="fields">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input 
            type="text" 
            id="name" 
            value={name}
            placeholder='Ghost name' 
            onChange={(e) => {
              setName(e.target.value)
            }}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea 
            id="description" 
            value={description}
            placeholder='Ghost description'
            onChange={(e) => {
              setDescription(e.target.value)
            }}
            required
          ></textarea>
        </div>
        <div className="form-group form-group__pic">
          <div className="img-container">
            <img src={isEpicPicValid ? pic : 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/d27c11e3-d4f0-445c-b9d6-efc9db517960/d81sf2c-eadaa3ab-7ac5-48e6-a950-dfabb29d2658.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2QyN2MxMWUzLWQ0ZjAtNDQ1Yy1iOWQ2LWVmYzlkYjUxNzk2MFwvZDgxc2YyYy1lYWRhYTNhYi03YWM1LTQ4ZTYtYTk1MC1kZmFiYjI5ZDI2NTgucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.RD2Dl5lNke1Fr9HnjyGJBAQVrhkm8yiH9GLDRhECpOY' } alt="Ghost picture" />
          </div>
          <div className="pic-group">
            <label htmlFor="url_pic">Ghost Pic URL</label>
            <input 
              type="text" 
              id="url_pic"
              value={pic}
              placeholder='Ghost Pic URL'
              onChange={(e) => {
                setPic(e.target.value);
              }}
              required
            />
          </div>
          {/* Must receive an url, please verify if there's a valid url and show the received image in the img element */}
        </div>
      </div>
      <div className="btnUpdateGhost">
        <Button button={ { name: "Update", type: 2, onClick: btnUpdateGhost } } />
        <Button button={ { name: "Activate", type: 5, onClick: btnActivateGhost } } />
        <Button button={ { name: "Deactivate", type: 6, onClick: btnDeactivateGhost } } />
      </div>
      <Alert alert={ { depth: 3, title: title, message: message, height: 200, width: 450, isVisible: isVisible, onClick: () => { setIsVisible(false); } } } />
    </div>
  )
}