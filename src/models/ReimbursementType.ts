//Used to track what kind of reimbursement is submitted.
// Type posibliites are 'Lodging', 'Travel', 'Food', or 'Other'.

export class ReimbursementType {
    typeId: number; // primary key
    type: string;   // not null, unique

    constructor(typeId: number, type: string) {
        this.typeId = typeId;
        this.type = type;
    }
}