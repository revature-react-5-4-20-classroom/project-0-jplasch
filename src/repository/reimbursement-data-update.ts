import { Reimbursement } from "../models/Reimbursement";
import { PoolClient, QueryResult } from "pg";
import { connectionPool } from ".";



export async function updateReimbursement(reimbursementId: number, author: number, amount: number,
    dateSubmitted: number, dateResolved: number, description: string, resolver: number,
    status: number, type: number): Promise<Reimbursement[]> {
    let client : PoolClient;
    client = await connectionPool.connect();
    try {
        let result : QueryResult = await client.query(
            `INSERT INTO reimbursements
            VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9);`, [reimbursementId, author, amount, dateSubmitted,
                dateResolved, description, resolver, status, type]
        );
        return result.rows.map((u)=>{
            return new Reimbursement(u.reimbursementId, u.author, u.amount, u.dateSubmitted,
                u.dateResolved, u.description, u.resolver, u.status, u.type);
        });
    } catch (e) {
        let result : QueryResult = await client.query(
            `UPDATE reimbursements
            SET reimbursementId = $1,
                author = $2,
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
    } finally {
        client && client.release();
    }
};