//Used to track status of reimbursements.
// Possibilities include 'Pending', 'Approved', or 'Denied'.

export class ReimbursementStatus {
    statusId: number; // primary key
    status: string; // not null, unique

    constructor(statusId: number, status: string) {
        this.statusId = statusId;
        this.status = status;
    }
}