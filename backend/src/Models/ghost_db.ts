import { getConnection } from "./connection";
import IGhost from "./Ghost";
import Statistic from "./Statistic";

export const ghost_db = {
  getGhost: function(id_ghost: number): Promise<IGhost> {
    return new Promise((resolve, reject) => {
      // query
      const sqlQuery = "SELECT * FROM ghost WHERE id_ghost = ?";

      getConnection().query(
        sqlQuery,
        [id_ghost],
        function (err: any, res: any) {
          if (err) {
            console.error(`Error ocurred: ${err.message}`);
            reject(err);
          } else {
            if (res.length > 0) resolve(res[0]);
            else reject(new Error(`Ghost with the ID ${id_ghost} wasn't found`));
          }
        }
      )
    })
  },

  getGhosts: function(): Promise<IGhost[]> {
    return new Promise((resolve, reject) => {
      // query
      const sqlQuery = "SELECT * FROM ghost";

      getConnection().query(
        sqlQuery,
        [],
        function (err: any, res: any) {
          if (err) {
            console.error(`Error ocurred: ${err.message}`);
            reject(err);
          } else {
            if (res.length > 0) resolve(res);
            else reject(new Error(`Ghosts weren't retrieved.`));
          }
        }
      )
    })
  },

  getTotalGhosts: function(): Promise<number> {
    return new Promise((resolve, reject) => {
      // query
      const sqlQuery = "SELECT COUNT(id_ghost) AS ghost_count FROM ghost;";

      getConnection().query(
        sqlQuery,
        [],
        function (err: any, res: any) {
          if (err) {
            console.error(`Error ocurred: ${err.message}`);
            reject(err);
          } else {
            if (res.length > 0) resolve(res[0]);
            else reject(new Error(`Ghosts weren't retrieved.`));
          }
        }
      )
    })
  },

  getGhostStatistics: function(id_user: number): Promise<Statistic[]> {
    return new Promise((resolve, reject) => {
      // query
      const sqlQuery = `
      SELECT
        g.id_ghost as id_ghost,
        g.name as ghost_name,
        g.pic as ghost_pic,
        COALESCE(SUM(ug.isFound), 0) AS found_count,
        COALESCE(SUM(ug.isDiscovered), 0) AS discovered_count,
        COALESCE(SUM(ug.isDead), 0) AS dead_count
      FROM
        ghost g
      LEFT JOIN
          user_has_ghost ug ON g.id_ghost = ug.ghost_id_ghost and ug.user_id_user = ?
      LEFT JOIN
          user u on u.id_user = ug.user_id_user
      GROUP BY
          id_ghost, g.name, g.pic
      ORDER BY
          id_ghost;
      `;

      getConnection().query(
        sqlQuery,
        [id_user],
        function (err: any, res: any) {
          if (err) {
            console.error(`Error ocurred: ${err.message}`);
            reject(err);
          } else {
            if (res.length > 0) resolve(res);
            else reject(new Error(`Ghost with the ID ${id_user} wasn't found`));
          }
        }
      )
    })
  },

  updateGhost: function(ghost: IGhost): Promise<string> {
    return new Promise((resolve, reject) => {
      // query
      const sqlQuery = "UPDATE ghost SET name = ?, description = ?, pic = ?, status = ? WHERE id_ghost = ?";

      getConnection().query(sqlQuery,
        [ghost.name, ghost.description, ghost.pic, ghost.status, ghost.id_ghost],
        function(err: any, res: any) { // Oh yes, I love using TS, so I can use any
        if (err) {
          console.error(`Error ocurred: ${err.message}`);
          reject(err);
        }
        else {
          if (res.affectedRows > 0) resolve(`Updated ghost number ${ghost.id_ghost}.`);
          reject(new Error("Failed to insert user"));
        }
      });
    });
  },

  createGhost: function(ghost: IGhost): Promise<string> {
    return new Promise((resolve, reject) => {
      // query
      const sqlQuery = "INSERT INTO ghost (name, description, pic) values (?, ?, ?);";

      if (!ghost.pic) ghost.pic = `https://qph.cf2.quoracdn.net/main-qimg-654617264f9192ec976abe6e53356240-lq`; // Mark question

      getConnection().query(sqlQuery,
        [ghost.name, ghost.description, ghost.pic],
        function(err: any, res: any) { // Oh yes, I love using TS, so I can use any
        if (err) {
          console.error(`Error ocurred: ${err.message}`);
          reject(err);
        }
        else {
          if (res.affectedRows > 0) resolve("Inserted Ghost successfully!");
          reject(new Error("Failed to insert user"));
        }
      });
    });
  },
}