import { useEffect, useState } from 'react';
import Alert from '../../Decoration/Alert/Alert';
import './CreateGhost.css'
import { createGhost } from '../../../consumers/AdminApi';
import Button from '../../Decoration/Button/Button';
import { isPicValid } from '../../../consumers/Helpers';

export default function CreateGhost() {
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
    const isValid: boolean = await isPicValid(pic);
    setIsEpicPicValid(isValid);
  }

  const btnCreateGhost = async () => {
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
          await createGhost({ name: name, description: description, pic: pic });
          setTitle(`Ghost created`);
          setMessage(`Ghost ${name} was created!`);

        } catch (error) {
          setTitle(`Error`);
          setMessage(`Error ocurred creating the ghost.`);
        }
      }
    }
    setIsVisible(true);
    setName('');
    setDescription('');
    setPic('');
  }

  useEffect(() => {
    checkIsValid();
  });

  return (
    <div className="createGhost">
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
      <div className="btnCreateGhost">
        <Button button={ { name: "Create", type: 2, onClick: btnCreateGhost } } />
      </div>
      <Alert alert={ { depth: 1, title: title, message: message, height: 250, width: 250, isVisible: isVisible, onClick: () => { setIsVisible(false); } } } />
    </div>
  )
}