import { ReimbursementStatus } from "../models/ReimbursementStatus";
import { PoolClient, QueryResult } from "pg";
import { connectionPool } from ".";
import { Reimbursement } from "../models/Reimbursement";



export async function findReimbursementByStatus(id: number): Promise<Reimbursement[]> {
    let client : PoolClient;
    client = await connectionPool.connect();
    try {
        let result : QueryResult = await client.query(
            `SELECT * FROM reimbursements
            INNER JOIN reimbursement_status
            ON statusId = reimbursements.status
            WHERE statusId = $1;`, [id]
        );
        for(let row of result.rows) {
            //console.log(row.author);
        }
        return result.rows;
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
            `SELECT * FROM reimbursements
            INNER JOIN users
            ON reimbursementId = userId
            WHERE userId = $1;`, [id]
        );
        for(let row of result.rows) {
            console.log(row.username);
        }
        console.log(result.rows);
        return result.rows;
    } catch (e) {
        throw new Error(`Failed to query reimbursement by user: ${e.message}`);
    } finally {
        client && client.release();
    }
}

// This handles both updating and submitting reimbursements.
// If a reimbursementId already exists, it will update it;
// if it does not exist, it will insert a new row.
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
        console.log(result.rows);
        return result.rows;
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
        console.log(result.rows);
        return result.rows;
    } finally {
        client && client.release();
    }
};