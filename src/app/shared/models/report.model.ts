export class Report {
    pinCode: string;
    busId: string;
    busProblems: BusProblems[]
}

export class BusProblems {
    text: string;
    problemId: string;
}