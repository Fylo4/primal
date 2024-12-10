import { Component, computed, signal } from "@angular/core";
import { Deck } from "./decks.type";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { FormsModule } from "@angular/forms";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { PrimalCard, cards } from "../../data/cards.data";
import { CardRenderComponent } from "../../components/card-render/card-render";
import { TimesPipe } from "../../pipes/times.pipe";

@Component({
    selector: 'app-decks',
    templateUrl: './decks.component.html',
    styles: '',
    standalone: true,
    imports: [
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        MatAutocompleteModule,
        CardRenderComponent,
        TimesPipe,
    ],
})
export class DecksComponent {
    cards = cards;
    allDecks: Deck[] = [];
    mode: 'all' | 'view' | 'edit' = 'all';
    deckId = -1; // For viewing and editing a deck

    // While a card is being edited, a list of every card and its counts is generated
    cardsWithCounts: CardsWithCountsType[] = [];

    // For searching for cards to add to the deck
    cardName = signal('');
    nameAutocomplete = computed(() => {
        if (this.cardName() == '') return [];
        return this.cardsWithCounts.filter(c => c.card.printedName.toLowerCase().includes(this.cardName().toLowerCase()) || c.card.name?.toLowerCase().includes(this.cardName().toLowerCase()))
            .map(card => card.card.printedName);
    });
    selectedCard = computed(() => this.cardsWithCounts.find(c => c.card.printedName == this.cardName()));

    constructor() {
        this.allDecks = JSON.parse(localStorage.getItem('clickCounter') ?? '[]');
    }

    // {
    //   title: '', description: '', 
    //   decklist: '3A12,1S62,2C132,...',
    // }

    private getCardCode = (card: PrimalCard) => {
        // F, C, A, or S  +  number
        return card.type.substring(0, 1) + card.cardNumber;
    }

    editDeck(arrayIndex: number) {
        this.mode = 'edit';
        this.deckId = arrayIndex;
        let myDeck = this.allDecks[this.deckId]; // For brevity
        // Translate the string into an array of card names with their counts
        this.cardsWithCounts = this.cards.map(c => ({
            card: c,
            code: this.getCardCode(c),
            main: 0,
            side: 0,
        }));
        let myCards = (myDeck.decklist??'').split(',').map(codeCount => ({
            code: codeCount.substring(1),
            count: Number(codeCount.substring(0, 1)),
        }));
        for(let card of myCards) {
            let inArr = this.cardsWithCounts.find(x => x.code == card.code);
            if (inArr) inArr.main += card.count;
        }
        let mySide = (myDeck.sidedeck??'').split(',').map(codeCount => ({
            code: codeCount.substring(1),
            count: Number(codeCount.substring(0, 1)),
        }));
        for(let card of mySide) {
            let inArr = this.cardsWithCounts.find(x => x.code == card.code);
            if (inArr) inArr.side += card.count;
        }
    }

    createDeck() {
        this.allDecks.push({
            title: '',
            description: '',
            decklist: '',
            sidedeck: '',
        });
        this.editDeck(this.allDecks.length - 1)
    }

    changeMainCount(card: CardsWithCountsType, change: number) {
        card.main += change;
    }

    changeSideCount(card: CardsWithCountsType, change: number) {
        card.side += change;
    }
}

type CardsWithCountsType = {
    card: PrimalCard, code: string, main: number, side: number
}