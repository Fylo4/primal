import { Component, computed, effect, signal } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { PrimalCard, cards } from "../../data/cards.data";
import { CardRenderComponent } from "../../components/card-render/card-render";

@Component({
    selector: 'app-synergy',
    templateUrl: './synergy.component.html',
    styles: '',
    standalone: true,
    imports: [MatFormFieldModule, MatInputModule, MatAutocompleteModule, FormsModule, CardRenderComponent],
})
export class SynergyComponent {
    cards = cards;
    cardName = signal("");

    nameAutocomplete = computed(() => {
        if (this.cardName() == '') return [];
        return this.cards.filter(c => c.printedName.toLowerCase().includes(this.cardName().toLowerCase()) || c.name?.toLowerCase().includes(this.cardName().toLowerCase()))
            .map(card => card.printedName);
    });

    selectedCard = computed(() => this.cards.find(c => c.printedName == this.cardName()));

    mySynergies = signal<{selector: Function, text: string, cards: PrimalCard[]}[]>([]);

    constructor() {
        effect(() => {
            if (this.selectedCard()) {
                let synergies = this.selectedCard()?.synergies?.map(s => ({...s, cards: this.cards.filter(c => s.selector(c))})) ?? [];
                this.mySynergies.set(synergies);
            }
        }, {allowSignalWrites: true})
    }
}