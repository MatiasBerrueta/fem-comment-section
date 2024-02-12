import React, { useState } from "react";
import DeleteIcon from "../icons/DeleteIcon";

export function DeleteButton({deleteComment, commentIndex}: {deleteComment: (commentIndex: number) => void, commentIndex: number}) {
  const [isOpen, setIsOpen] = useState(false)

  function handleDelete() {
    deleteComment(commentIndex)
    setIsOpen(false)
  }
 
  return (
    <React.Fragment>
      <button onClick={() => setIsOpen(true)} className='comment-action-button color-red'>
        <DeleteIcon /> Delete
      </button>
      {isOpen &&
        <React.Fragment>
          <div onClick={() => setIsOpen(false)} className="modal-background" style={{top: `calc(${window.scrollY}px + 50% - 1px)`}}></div>
          <div className='delete-modal' style={{top: `calc(${window.scrollY + window.innerHeight / 2}px - 10rem)`}}>
            <h1 className="delete-modal-title">Delete comment</h1>
            <p>Are you sure you want to delete this comment? This will remove the comment and can't be undone.</p>
            <div className='delete-modal-buttons'>
              <button className="confirmation-button background-grey" onClick={() => setIsOpen(false)}>NO, CANCEL</button>
              <button className="confirmation-button background-red" onClick={handleDelete}>YES, DELETE</button>
            </div>
          </div>
        </React.Fragment>
      }
    </React.Fragment>
  )
}