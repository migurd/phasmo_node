import { getConnection } from "./connection";
import { IUser, UserReg } from './User';
import bcrypt from 'bcrypt';
import IUserHasGhost from "./UserHasGhost";

export const user_db = {
  getUser: function(id_user: number): Promise<IUser> {
    return new Promise((resolve, reject) => {
      // query
      const sqlQuery = "SELECT * FROM user WHERE id_user = ?";

      getConnection().query(
        sqlQuery,
        [id_user],
        function (err: any, res: any) {
          if (err) {
            console.error(`Error ocurred: ${err.message}`);
            reject(err);
          } else {
            if (res.length > 0) resolve(res[0]);
            else reject(new Error(`User with the ID ${id_user} wasn't found`));
          }
        }
      )
    })
  },

  postUserHasGhost: function(userHasGhost: IUserHasGhost): Promise<string> {
    return new Promise((resolve, reject) => {
      // query
      const sqlQuery = "INSERT INTO user_has_ghost (user_id_user, ghost_id_ghost, isFound, isDiscovered, isDead) VALUES (?,?,?,?,?)";

      getConnection().query(
        sqlQuery,
        [userHasGhost.user_id_user, userHasGhost.ghost_id_ghost, userHasGhost.isFound, userHasGhost.isDiscovered, userHasGhost.isDead],
        function (err: any, res: any) {
          if (err) {
            console.error(`Error ocurred: ${err.message}`);
            reject(err);
          } else {
            if (res.affectedRows > 0) resolve("OK");
            else reject(new Error(`Couldn't be posted. :(`));
          }
        }
      )
    })
  },

  updateUser: function(user: Partial<IUser> | undefined): Promise<string> {
    return new Promise((resolve, reject) => {
      // query
      const sqlQuery = "UPDATE user SET money = ?, level = ?, status = ? WHERE id_user = ?";

      getConnection().query(sqlQuery,
        [user?.money, user?.level, user?.status, user?.id_user],
        function(err: any, res: any) { // Oh yes, I love using TS, so I can use any
        if (err) {
          console.error(`Error ocurred: ${err.message}`);
          reject(err);
        }
        else {
          if (res.affectedRows > 0) resolve(`Updated user number ${user?.id_user}.`);
          reject(new Error("Failed to insert user"));
        }
      });
    });
  },

  register: function(user: UserReg): Promise<string> {
    return new Promise((resolve, reject) => {
      // query
      const sqlQuery = "INSERT INTO user (username, password) values (?, ?);";

      getConnection().query(sqlQuery,
        [user.username, user.password],
        function(err: any, res: any) { // Oh yes, I love using TS, so I can use any
        if (err) {
          console.error(`Error ocurred: ${err.message}`);
          reject(err);
        }
        else {
          if (res.affectedRows > 0) resolve("OK");
          reject(new Error("Failed to insert user"));
        }
      });
    });
  },

  login: function(user: UserReg): Promise<IUser | string> {
    return new Promise((resolve, reject) => {
      // query
      const sqlQuery = "SELECT * FROM user WHERE username = ?;";

      getConnection().query(sqlQuery, 
        [user.username], 
        function (err: any, res: any) {
        if (err) {
          console.error(`Error ocurred: ${err.message}`);
          reject(err);
        }
        else {
          if (res.length > 0) {
            bcrypt.compare(user.password, res[0].password, (error, response) => {
              if (response) {
                resolve(res[0]);
              }
              else {
                reject(new Error("User and password combination is incorrect!"));
              }
            })
          }
          else reject(new Error("User not found"));
        }
      });
    });
  },
}