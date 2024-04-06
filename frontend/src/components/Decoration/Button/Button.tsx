import './Button.css'
import IButton from '../../../Interfaces/Button'

export default function Button({ button }: { button: IButton }) {
  return (
    <button
      id="button"
      className={`button${button.type}`}
      onClick={button.onClick}
      tabIndex={0}
      style={ { margin: '0 auto' } }
    >
      {button.name}
    </button>
  )
}