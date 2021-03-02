export const Note = ({ id, content, date }) => {
  return (
    <li>
      {content} <br />
      <small><time>{date}</time></small>
    </li>
  )
}

