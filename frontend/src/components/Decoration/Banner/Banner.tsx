import './Banner.css'

export default function Banner(props: { title: string }) {
  return (
    <>
      <div id="banner">
        {props.title}
      </div>
    </>
  )
}