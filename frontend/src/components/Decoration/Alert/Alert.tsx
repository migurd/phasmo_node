import './Alert.css'
import IAlert from '../../../Interfaces/Alert'
import Button from '../Button/Button'
import { useEffect, useState } from 'react'
import BlackBackground from '../BlackBackground/BlackBackground';
import ReactDOM from 'react-dom';

export default function Alert({ alert } : { alert: IAlert }) {
  const [isVisible, setIsVisible] = useState(alert.isVisible);

  useEffect(() => {
    setIsVisible(alert.isVisible);
  }, [alert.isVisible]);
  
  const alertComponent = (
    isVisible ? (
      <>
      <BlackBackground depth={alert.depth} onClick={() => { setIsVisible(false); alert.onClick() } } />
      <div
        id="alert"
        style={ { zIndex: alert.depth, height: `${alert.height}px`, width: `${alert.width}px` } }
      >
        <div className="pin red-pin"></div>
        <div className="pin blue-pin"></div>
        <h2>{alert.title}</h2>
        <p>{alert.message}</p>
        {alert.element}
        <Button button={ { name: 'Close', type: 1, onClick: () => { setIsVisible(false); alert.onClick(); if (alert.isReload) window.location.href = '/'; } } }  />
      </div>
      </>
    ) :
    <></>
  )
  return ReactDOM.createPortal(alertComponent, document.getElementById('root')!);
}