import './App.css';
import data from './data.json';
import Comments from './components/Comments/Comments';
import { useState } from 'react';
import { AddComment } from './components/AddComment/AddComment';
import { commentProps } from './interfaces';
import { currentUser } from './constants';

function App() {
  const [comments, setComments] = useState<commentProps[]>(data.comments)
  
  function updateComments(updatedComments: commentProps[]) {
    setComments(updatedComments)
  }

  function addNewComment(newComment: commentProps) {
    updateComments([...comments, newComment])
  }

  data.comments[2] = {
    id: 10,
    content: 'test',
    createdAt: 'a week ago',
    score: 0,
    user: {
      image: {
        png: `${currentUser.image.png}`,
        webp: `${currentUser.image.webp}`
      },
    username: `${currentUser.username}`
    },
    replies: []
  }

  data.comments[3] = {
    "id": 11,
    "content": "Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You've nailed the design and the responsiveness at various breakpoints works really well.",
    "createdAt": "1 month ago",
    "score": 12,
    "user": {
      "image": { 
        "png": "./images/avatars/image-amyrobson.png",
        "webp": "./images/avatars/image-amyrobson.webp"
      },
      "username": "amyrobson"
    },
    "replies": []
  }

  return (
    <div className='app'>
      <main>
        <Comments updateComments={updateComments} comments={comments} />
        <AddComment addNewComment={addNewComment} />
      </main>
    </div>
  );
}

export default App;
