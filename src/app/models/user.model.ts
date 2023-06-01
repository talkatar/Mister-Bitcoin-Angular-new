export class User {
  constructor(
    public _id: string,
    public name: string,
    public coins: number,
    public moves: Move[]  ) {}
}

export interface Move {
  toId: string;
  to: string;
  at: string;
  amount: number;
}