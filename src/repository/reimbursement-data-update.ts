import { Reimbursement } from "../models/Reimbursement";
import { PoolClient, QueryResult } from "pg";
import { connectionPool } from ".";



export async function updateReimbursement(reimbursementId: number, author: string, amount: number,
    dateSubmitted: number, dateResolved: number, description: string, resolver: string,
    status: number, type: number): Promise<Reimbursement[]> {
    let client : PoolClient;
    client = await connectionPool.connect();
    try {
        let result : QueryResult = await client.query(
            `UPDATE reimbursements
            SET author = $2,
                amount = $3,
                dateSubmitted = $4,
                dateResolved = $5,
                description = $6,
                resolver = $7,
                status = $8,
                "type" = $9
            WHERE reimbursementId = $1;`, [reimbursementId, author, amount, dateSubmitted,
                dateResolved, description, resolver, status, type]
        );
        return result.rows.map((u)=>{
            return new Reimbursement(u.reimbursementId, u.author, u.amount, u.dateSubmitted,
                u.dateResolved, u.description, u.resolver, u.status, u.type);
        });
    } catch (e) {
        throw new Error(`Failed to update user: ${e.message}`);
    } finally {
        client && client.release();
    }
};