import { User } from "../models/User";
import { PoolClient, QueryResult } from "pg";
import { connectionPool } from ".";
import { Role } from "../models/Role";


export async function findUsers(): Promise<User[]> {
    let client : PoolClient;
    client = await connectionPool.connect();
    try {
        let result : QueryResult = await client.query(
            `SELECT *
            FROM users;`
        );
        return result.rows.map((u)=>{
            return new User(u.userid, u.username, u.password, u.firstname, u.lastname, u.email, u.role);
        });
    } catch (e) {
        throw new Error(`Failed to query all users: ${e.message}`);
    } finally {
        client && client.release();
    }
}

export async function findUsersById(id: number): Promise<User[]> {
    let client : PoolClient;
    client = await connectionPool.connect();
    try {
        let result : QueryResult = await client.query(
            `SELECT users.userId, users.username, users.password, users.firstName, users.lastName, 
            users.email, users.role
            FROM users WHERE users.userId = $1;`, [id]
        );
        // for(let row of result.rows) {
        //     console.log(row.username);
        // };
        return result.rows;
    } catch (e) {
        throw new Error(`Failed to query all users: ${e.message}`);
    } finally {
        client && client.release();
    }
}

// return result.rows.map((u)=>{
//     return new User(u.userId, u.username, u.password, u.firstName, u.lastName, u.email, u.role);
// });

export async function findUserByUsernamePassword(username: string, password: string) : Promise<User> {
    let client : PoolClient;
    client = await connectionPool.connect();
    try {
      let result : QueryResult;
      result = await client.query(
        `SELECT users.userId, users.username, users.password,
          users.firstName, users.lastName,
          users.email, roles."role"
        FROM users INNER JOIN roles ON users."role" = roles."role"
        WHERE users.username = $1 AND users.password = $2;`, [username, password]
      );
      const usersMatchingUsernamePassword = result.rows.map((u) => {
        return new User(u.userid, u.username, u.password, u.firstname, u.lastname, u.email, u.role);
      })
      if(usersMatchingUsernamePassword.length > 0) {
        return usersMatchingUsernamePassword[0];
      } else {
        throw new Error('Username and Password are invalid');
      }
    } catch (e) {
      throw new Error(`Failed to validate User: ${e.message}`);
    } finally {
      client && client.release();
    }
  }

export async function updateUser(userId:number, username:string, password:string,
    firstName:string, lastName:string, email:string, role:Role): Promise<User[]> {
    let client : PoolClient;
    client = await connectionPool.connect();
    try {
        let result : QueryResult = await client.query(
            `UPDATE users
            SET username = $2,
                "password" = $3,
                firstName = $4,
                lastName = $5,
                email = $6,
                "role" = $7
            WHERE userId = $1;`, [userId, username, password, firstName, lastName, email, role]
        );
        return result.rows;
    } catch (e) {
        throw new Error(`Failed to update user: ${e.message}`);
    } finally {
        client && client.release();
    }
};