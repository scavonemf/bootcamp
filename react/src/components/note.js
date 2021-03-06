export const Note = ({ title, body }) => {
  return (
    <li>
      {title} <br />
      <small><time>{body}</time></small>
    </li>
  )
}

