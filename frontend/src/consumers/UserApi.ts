import axios from 'axios';
import { IUser } from '../../../backend/src/Models/User'
import IStatistic from '../../../backend/src/Models/Statistic'

export const login = (username: string, password: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    axios.post('http://localhost:3000/user/login', {
      username: username,
      password: password,
    }).then((response) => {
      console.log(response);
      resolve(response);
    }).catch((err) => {
      console.error(err.response?.data.message);
      reject(err);
    });
  });
};

export const register = (username: string, password: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    axios.post('http://localhost:3000/user/register', {
      username: username,
      password: password,
    }).then((response) => {
      console.log(response?.data.message);
      resolve(response);
    }).catch((err) => {
      console.error(err.response?.data.message);
      reject(err);
    });
  });
};

export const signOut = async (): Promise<void> => {
  try {
    const response = await axios.get("http://localhost:3000/user/signout");
    console.log(response);
  } catch (error) {
    console.error("Error signing out:", error);
  }
};

export const getIdUser = (): Promise<number> => {
  return new Promise((resolve, reject) => {
    axios.get(`http://localhost:3000/user/getIdCurrentUser`)
      .then((response: any) => {
        // console.log(response.data);
        resolve(response.data.id_user);
      })
      .catch((error: any) => {
        console.error('Error fetching ghost:', error);
        reject(error);
      });
  });
};

export const getUser = (id_user: number): Promise<IUser | undefined> => {
  return new Promise((resolve, reject) => {
    axios.get(`http://localhost:3000/user/getUserInfo/${id_user}`)
      .then((response: any) => {
        // console.log(response.data);
        resolve(response.data);
      })
      .catch((error: any) => {
        console.error('Error fetching user:', error);
        reject(error);
      });
  });
};

export const getUserStatistics = (id_user: number): Promise<IStatistic[] | undefined> => {
  return new Promise((resolve, reject) => {
    axios.get(`http://localhost:3000/user/getUserStatistics/${id_user}`)
      .then((response: any) => {
        // console.log(response.data);
        resolve(response.data);
      })
      .catch((error: any) => {
        console.error('Error fetching user statistics:', error);
        reject(error);
      });
  });
};

export const updateUser = (updatedUser: Partial<IUser>): Promise<void> => {
  return new Promise((resolve, reject) => {
    axios.put('http://localhost:3000/user/updateUser', {
      id_user: updatedUser.id_user,
      money: updatedUser.money,
      level: updatedUser.level,
      status: updatedUser.status,
    })
      .then(() => {
        // console.log(response?.data.status);
        resolve();
      })
      .catch((err) => {
        console.error(err.response?.data.status);
        reject(err);
      });
  });
};