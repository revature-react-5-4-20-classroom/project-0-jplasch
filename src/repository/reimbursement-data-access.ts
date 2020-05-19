import { ReimbursementStatus } from "../models/ReimbursementStatus";
import { PoolClient, QueryResult } from "pg";
import { connectionPool } from ".";



export async function findReimbursementByStatus(): Promise<ReimbursementStatus[]> {
    let client : PoolClient;
    client = await connectionPool.connect();
    try {
        let result : QueryResult = await client.query(
            `SELECT reimbursement_status.statusId, reimbursement_status.status
            FROM reimbursement_status;`
        );
        for(let row of result.rows) {
            console.log(row.username);
        }
        return result.rows.map((u)=>{
            return new ReimbursementStatus(u.statusId, u.status);
        });
    } catch (e) {
        throw new Error(`Failed to query reimbursement status: ${e.message}`);
    } finally {
        client && client.release();
    }
}