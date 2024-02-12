import React, { useState } from "react";
import EditIcon from "../icons/EditIcon"
import ReplyIcon from "../icons/ReplyIcon"
import ScoreDisplay from "../ScoreDisplay/ScoreDisplay";
import { commentProps, replyProps } from "../../interfaces";
import { Replies } from "../Replies/Replies";
import { DeleteButton } from "../DeleteButton/DeleteButton";
import { currentUser } from "../../constants";
import './Comments.css'

export default function Comments({updateComments, comments}: {updateComments: (updatedComments: commentProps[]) => void, comments: commentProps[]}) {
  const [replyContent, setReplyContent] = useState('')
  const [replyingComments, setReplyingComments] = useState<boolean[]>(Array(comments.length).fill(false))
  // const [editingComments, setEditingComments] = useState<boolean[]>(Array(comments.length).fill(false))

  function switchReplyingState(commentIndex: number) {
    const updatedReplying = [...replyingComments]
    updatedReplying.fill(false)
    updatedReplying[commentIndex] = !replyingComments[commentIndex]
    setReplyingComments(updatedReplying)
  }

  function handleSendReply(event: React.FormEvent, commentIndex: number) {
    event.preventDefault()

    updateReplies(commentIndex, [...comments[commentIndex].replies, {
      id: 11,
      content: `${replyContent}`,
      createdAt: 'now',
      score: 0,
      replyingTo: `${comments[commentIndex].user.username}`,
      user: {
        image: {
          'png': './images/avatars/image-juliusomo.png',
          'webp': './images/avatars/image-juliusomo.webp'
        },
        username: 'juliusomo'
      }
    }]) 

    switchReplyingState(commentIndex)
    setReplyContent('')
  }
  
  function handleOnChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    if(event.target.scrollHeight > 70) {
      event.target.style.height = "3rem";
      event.target.style.height = `calc(${event.target.scrollHeight + 2}px)`;
    }

    setReplyContent(event.target.value)
  }

  function deleteComment(commentIndex: number) {
    const updatedComments = [...comments]
    updatedComments.splice(commentIndex, 1)
    updateComments(updatedComments)
  }

  function updateReplies(commentIndex: number, updatedReplies: replyProps[]) {
    const updatedComments = [...comments]
    updatedComments[commentIndex].replies = updatedReplies
    updateComments(updatedComments)
  }

  return (
    <ul className='comments-container'>
      {
        comments.map((commentProps, commentIndex) => {
          return (
            <React.Fragment key={commentProps.id} >
              <li className='comment-body'>
                <div className='user-info'>
                  <img className='avatar' src={commentProps.user.image.png.slice(1)} alt={`Avatar for ${commentProps.user.username}`} />
                  <span className='user-name'>{commentProps.user.username}</span>
                  {currentUser.username === commentProps.user.username && <span className='own-comment-indicator'>you</span>}
                  <span className='created-date'>{commentProps.createdAt}</span>
                </div>
                <p className='comment-content'>{commentProps.content}</p>
                <ScoreDisplay score={commentProps.score} />
                  {
                    currentUser.username === commentProps.user.username ? 
                    <div className='comment-action-buttons'>
                      <DeleteButton commentIndex={commentIndex} deleteComment={() => deleteComment(commentIndex)} />
                      <button className='comment-action-button color-blue'><EditIcon /> Edit</button>
                    </div>
                  :
                    <button onClick={() => switchReplyingState(commentIndex)} className='comment-action-button color-blue'><ReplyIcon /> Reply</button>
                  }
              </li>
              <Replies commentIndex={commentIndex} updateReplies={updateReplies} repliesArray={commentProps.replies}/>
              {
                replyingComments[commentIndex] && (
                <form onSubmit={(event) => handleSendReply(event, commentIndex)} className='add-comment-form'>
                  <textarea onChange={(event) => handleOnChange(event)} 
                    value={replyContent} className='reply-input-textbox' name="reply-input" placeholder='Add a comment...' rows={2}></textarea>
                  <img className='avatar' src={currentUser.image.png.slice(1)} alt={`Avatar for ${currentUser.username}`} />
                  <button className='confirmation-button'>REPLY</button>
                </form>
                )
              }
          </React.Fragment>
          )
        })
      }
    </ul>
  )
}