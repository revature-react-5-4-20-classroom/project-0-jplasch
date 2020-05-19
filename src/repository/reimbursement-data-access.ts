import { ReimbursementStatus } from "../models/ReimbursementStatus";
import { PoolClient, QueryResult } from "pg";
import { connectionPool } from ".";
import { Reimbursement } from "../models/Reimbursement";



export async function findReimbursementByStatus(id: number): Promise<Reimbursement[]> {
    let client : PoolClient;
    client = await connectionPool.connect();
    try {
        let result : QueryResult = await client.query(
            `SELECT * FROM reimbursements INNER JOIN reimbursement_status ON reimbursementId = statusId
            WHERE statusId = $1;`, [id]
        );
        for(let row of result.rows) {
            console.log(row.username);
        }
        return result.rows.map((u)=>{
            return new Reimbursement(u.reimbursementId, u.author, u.amount, u.dateSubmitted,
            u.dateResolved, u.description, u.resolver, u.status, u.type);
        });
    } catch (e) {
        throw new Error(`Failed to query reimbursement by status: ${e.message}`);
    } finally {
        client && client.release();
    }
}

export async function findReimbursementByUser(id: number): Promise<Reimbursement[]> {
    let client : PoolClient;
    client = await connectionPool.connect();
    try {
        let result : QueryResult = await client.query(
            `SELECT * FROM reimbursements INNER JOIN users ON reimbursementId = userId
            WHERE userId = $1;`, [id]
        );
        for(let row of result.rows) {
            console.log(row.username);
        }
        return result.rows.map((u)=>{
            return new Reimbursement(u.reimbursementId, u.author, u.amount, u.dateSubmitted,
                u.dateResolved, u.description, u.resolver, u.status, u.type);
        });
    } catch (e) {
        throw new Error(`Failed to query reimbursement by user: ${e.message}`);
    } finally {
        client && client.release();
    }
}