import axios from 'axios';
import IUserHasGhost from '../../../backend/src/Models/UserHasGhost'

export const getGhost = (id_ghost: number): Promise<any> => {
  return new Promise((resolve, reject) => {
    axios.get(`http://localhost:3000/admin/ghostInfo/${id_ghost}`)
      .then((response: any) => {
        // console.log(response.data);
        resolve(response.data);
      })
      .catch((error: any) => {
        console.error('Error fetching ghost:', error);
        reject(error);
      });
  });
};

export const getAmountGhosts = (): Promise<number> => {
  return new Promise((resolve, reject) => {
    axios.get(`http://localhost:3000/admin/amountGhosts`)
      .then((response: any) => {
        console.log(response.data.ghost_count);
        resolve(response.data.ghost_count);
      })
      .catch((error: any) => {
        console.error('Error fetching ghost:', error);
        reject(error);
      });
  });
};

export const postUserHasGhost = (userHasGhost: IUserHasGhost): Promise<void> => {
  return new Promise((resolve, reject) => {
    axios.post('http://localhost:3000/user/postUserHasGhost', {
      user_id_user: userHasGhost.user_id_user,
      ghost_id_ghost: userHasGhost.ghost_id_ghost,
      isFound: userHasGhost.isFound,
      isDiscovered: userHasGhost.isDiscovered,
      isDead: userHasGhost.isDead,
    })
      .then((response) => {
        console.log(response?.data.status);
        resolve();
      })
      .catch((err) => {
        console.error(err.response?.data.status);
        reject(err);
      });
  });
};