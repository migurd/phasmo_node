import axios from 'axios';
import IUserHasGhost from '../../../backend/src/Models/UserHasGhost'
import IGhost from '../../../backend/src/Models/Ghost';

export const getGhost = (id_ghost: number): Promise<IGhost> => {
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

export const getGhosts = (): Promise<IGhost[]> => {
  return new Promise((resolve, reject) => {
    axios.get(`http://localhost:3000/admin/ghostsInfo`)
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
        // console.log(response.data.ghost_count);
        resolve(response.data.ghost_count);
      })
      .catch((error: any) => {
        console.error('Error fetching ghost:', error);
        reject(error);
      });
  });
};

export const createGhost = (ghost: IGhost): Promise<string> => {
  return new Promise((resolve, reject) => {
    axios.post('http://localhost:3000/admin/createGhost', {
      name: ghost.name,
      description: ghost.description,
      pic: ghost.pic,
    })
      .then((response) => {
        // console.log(response?.data.status);
        resolve(response.data.status);
      })
      .catch((err) => {
        console.error(err.response?.data.status);
        reject(err);
      });
  });
};

export const updateGhost = (ghost: IGhost): Promise<string> => {
  return new Promise((resolve, reject) => {
    axios.put('http://localhost:3000/admin/updateGhost', {
      id_ghost: ghost.id_ghost,
      name: ghost.name,
      description: ghost.description,
      pic: ghost.pic,
      status: ghost.status,
    })
      .then((response) => {
        // console.log(response?.data.status);
        resolve(response.data.status);
      })
      .catch((err) => {
        console.error(err.response?.data.status);
        reject(err);
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
        // console.log(response?.data.status);
        resolve();
      })
      .catch((err) => {
        console.error(err.response?.data.status);
        reject(err);
      });
  });
};