import data from './data.json';

interface user {
  image: {
    png: string;
    webp: string;
  }
  username: string;
}

export const currentUser: user = data.currentUser;