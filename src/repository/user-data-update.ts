import { User } from "../models/User";
import { PoolClient, QueryResult } from "pg";
import { connectionPool } from ".";

export async function updateUser(userId: number, username: string, password:string,
    firstName: string, lastName: string, email:string, role:string): Promise<User[]> {
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