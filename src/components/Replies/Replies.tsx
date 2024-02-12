import { useState } from "react"
import { currentUser } from "../../constants";
import { DeleteButton } from "../DeleteButton/DeleteButton"
import EditIcon from "../icons/EditIcon"
import ReplyIcon from "../icons/ReplyIcon"
import ScoreDisplay from "../ScoreDisplay/ScoreDisplay"
import { replyProps } from "../../interfaces"

export function Replies({commentIndex, updateReplies, repliesArray}: {commentIndex: number, updateReplies: (commentIndex: number, updatedComments: replyProps[]) => void, repliesArray: replyProps[]}) {
  const [updatedComment, setUpdatedComment] = useState<string>('')
  const [editStates, setEditStates] = useState<boolean[]>(Array(repliesArray.length).fill(false))
  // const [replyingStates, setReplyingStates] = useState<boolean[]>(Array(repliesArray.length).fill(false))

  function addReply(replyingTo: string) {
    updateReplies(commentIndex, [...repliesArray, {
      id: 11,
      content: 'Culpa sit occaecat aute non nulla aliquip commodo ullamco.',
      createdAt: 'now',
      score: 0,
      replyingTo: `${replyingTo}`,
      user: {
        image: {
          'png': './images/avatars/image-juliusomo.png',
          'webp': './images/avatars/image-juliusomo.webp'
        },
        username: 'juliusomo'
      }
    }])
    setEditStates(Array(repliesArray.length).fill(false))
  }

  function deleteReply(replyIndex: number) {
    const updatedReplies = [...repliesArray]
    updatedReplies.splice(replyIndex, 1)
    updateReplies(replyIndex, updatedReplies)
  }

  function handleOnChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    event.target.style.height = "1.5rem";
    event.target.style.height = `calc(${event.target.scrollHeight + 2}px)`;

    setUpdatedComment(event.target.value)
  }

  function handleOnClick(replyContent: string, index: number) {
    setUpdatedComment(replyContent);
    const updatedEditStates = editStates.map((editState, stateIndex) => stateIndex === index ? !editState : editState);
    setEditStates(updatedEditStates);
  }
  

  function handleUpdate(index: number) {
    repliesArray[index].content = updatedComment
    updateReplies(commentIndex, repliesArray)
    const updatedEditStates = [...editStates]
    updatedEditStates[index] = false
    setEditStates(updatedEditStates)
  }

  if(repliesArray.length === 0) return null
  return (
    <ul className='reply-container'>
      {
        repliesArray.map((replyProps, replyIndex) => {
          return (
            <li className='comment-body' key={replyProps.id}>
              <div className='user-info'>
                <img className='avatar' src={replyProps.user.image.png.slice(1)} alt={`Avatar for ${replyProps.user.username}`} />
                <span className='user-name'>{replyProps.user.username}</span>
                {currentUser.username === replyProps.user.username && <small className='own-comment-indicator'>you</small>}
                <span className='created-date'>{replyProps.createdAt}</span>
              </div>
              {
              !editStates[replyIndex] ? 
              <p className='comment-content'><span>@{replyProps.replyingTo}</span> {replyProps.content}</p>
              :
              <div className='edit-container'>
                <textarea onChange={(event) => handleOnChange(event)} rows={1} value={updatedComment} className='edit-input-textarea'></textarea>
                <button className="confirmation-button color-blue" onClick={() => handleUpdate(replyIndex)}>UPDATE</button>
              </div>
              }
              <ScoreDisplay score={replyProps.score} />
              {
                currentUser.username === replyProps.user.username ?
                <div className='comment-action-buttons'>
                  <DeleteButton commentIndex={commentIndex} deleteComment={() => deleteReply(replyIndex)} />
                  <button onClick={() => handleOnClick(`${replyProps.content}`, replyIndex)} className='comment-action-button color-blue'><EditIcon /> Edit</button>
                </div>
                :
                <button onClick={() => addReply(replyProps.user.username)} className='comment-action-button color-blue'><ReplyIcon /> Reply</button>
              }
              {/* {
                replyingStates[commentIndex] && (
                  <form onSubmit={(event) => handleSendReply(event, commentIndex)} className='Add-comment-box'>
                    <textarea onChange={(event) => handleOnChange(event)} 
                      value={} className='reply-input-textbox' name="reply-input" placeholder='Add a comment...' rows={2}></textarea>
                    <img className='Avatar' src={currentUser.image.png.slice(1)} alt={`Avatar for ${currentUser.username}`} />
                    <button className='Send-reply-button'>REPLY</button>
                  </form>
                  )
              } */}
            </li>
          )
        })
      }
    </ul>
  )
}