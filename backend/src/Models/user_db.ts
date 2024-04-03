import { getConnection } from "./connection";
import { User, UserReg } from './User'

export const user_db = {
  register: function(user: UserReg): Promise<string> {
    return new Promise((resolve, reject) => {
      // query
      const sqlQuery = "INSERT INTO user (username, password) values (?, ?)";

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

  login: function(user: UserReg): Promise<string> {
    return new Promise((resolve, reject) => {
      // query
      const sqlQuery = "SELECT * FROM user WHERE username = ? and password = ?";

      getConnection().query(sqlQuery, 
        [user.username, user.password], 
        function(err: any, res: any) {
        if (err) {
          console.error(`Error ocurred: ${err.message}`);
          reject(err);
        }
        else {
          if (res.length > 0) {
            console.log("User found. Logging in");
            resolve(res[0]);
          } 
          reject(new Error("Failed to login"));
        }
      });
    });
  },
}