import { User } from "../models/User";
import { PoolClient, QueryResult } from "pg";
import { connectionPool } from ".";


export async function findUsers(): Promise<User[]> {
    let client : PoolClient;
    client = await connectionPool.connect();
    try {
        let result : QueryResult = await client.query(
            `SELECT users.userId, users.username, users.password, users.firstName, users.lastName, 
            users.email, users.role
            FROM users;`
        );
        for(let row of result.rows) {
            console.log(row.username);
        }
        return result.rows.map((u)=>{
            return new User(u.userId, u.username, u.password, u.firstName, u.lastName, u.email, u.role);
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
        for(let row of result.rows) {
            console.log(row.username);
        }
        return result.rows.map((u)=>{
            return new User(u.userId, u.username, u.password, u.firstName, u.lastName, u.email, u.role);
        });
    } catch (e) {
        throw new Error(`Failed to query all users: ${e.message}`);
    } finally {
        client && client.release();
    }
}