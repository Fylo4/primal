import { PrimalCard } from "../data/cards.data";

export class BoardState {
    turnCounters = [0, 0]; // [p1, p2]
    p1Turn = true;
    p1Hand: PrimalCard[] = [];
    p2Hand: PrimalCard[] = [];
}

export class CardInPlay {
    card: PrimalCard;
    injured = false;
    plusOneCounters = 0;
    minusOneCounters = 0;
    attachedCards: PrimalCard[] = [];

    constructor(fromCard: PrimalCard) {
        this.card = fromCard;
    }
}

export class CardTeam {
    leader?: PrimalCard;
    supporters?: PrimalCard[] = [];
}