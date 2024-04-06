import './BlackBackground.css'

export default function BlackBackground({ depth, onClick }: { depth: number, onClick: () => void }) {
  return (
    <>
      <div id="blackBackground" style={ { zIndex: depth }} onClick={onClick}></div>
    </>
  )
}