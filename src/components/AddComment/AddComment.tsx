import { useState } from "react"
import { commentProps } from "../../interfaces"
import { currentUser } from "../../constants";

export function AddComment({addNewComment}: {addNewComment: (newComment: commentProps) => void}) {
  const [newComment, setNewComment] = useState<string>("")

  function handleOnChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    if(event.target.scrollHeight > 70) {
      event.target.style.height = "3rem";
      event.target.style.height = `calc(${event.target.scrollHeight + 2}px)`;
    }

    setNewComment(event.target.value)
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault()

    addNewComment({
      id: 7,
      content: newComment,
      createdAt: 'now',
      score: 0,
      user: {
        image: {
          png: currentUser.image.png,
          webp: currentUser.image.webp,
        },
        username: 'yop',
      },
      replies: [],
    })

    setNewComment('')
  }

  return (
    <form onSubmit={(event) => handleSubmit(event)} className='add-comment-form'>
      <textarea onChange={(event) => handleOnChange(event)} value={newComment} className='reply-input-textbox' name="reply-input" placeholder='Add a comment...' rows={2}></textarea>
      <img className='avatar' src={currentUser.image.png.slice(1)} alt={`Avatar for ${currentUser.username}`} />
      <button className='confirmation-button'>SEND</button>
    </form>
  )
}