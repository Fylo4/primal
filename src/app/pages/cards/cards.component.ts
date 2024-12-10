import { Component, OnInit, computed, signal } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatSelectModule } from "@angular/material/select";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatFormFieldModule } from "@angular/material/form-field";
import { cards } from '../../data/cards.data';
import { CardRenderComponent } from "../../components/card-render/card-render";
import { MatInputModule } from "@angular/material/input";
import { MatAutocompleteModule } from "@angular/material/autocomplete";

@Component({
    selector: 'app-cards',
    styles: '',
    templateUrl: './cards.component.html',
    standalone: true,
    imports: [MatExpansionModule, MatSelectModule, FormsModule, MatFormFieldModule, CardRenderComponent, MatInputModule, MatAutocompleteModule],
})
export class CardsComponent implements OnInit {
    cards = cards;

    selectedTypes = signal<string[]>([]);
    cardTypes: valueCount[] = [];
    selectedRarities = signal<string[]>([]);
    // Hard-code rarity values for custom ordering
    cardRarities: valueCount[] = [
        {value: 'Starter', count: 0},
        {value: 'Common', count: 0},
        {value: 'Uncommon', count: 0},
        {value: 'Rare', count: 0},
        {value: 'Super Rare', count: 0},
    ];
    selectedElems = signal<string[]>([]);
    cardElems: valueCount[] = [];
    selectedSets = signal<string[]>([]);
    // Hard-code set values for custom ordering
    cardSets: valueCount[] = [
        {value: '1 - Awakened Primordials', count: 0},
        {value: 'ST01 - Sea Invasion', count: 0},
        {value: 'ST02 - Slayer Guild', count: 0},
        {value: 'ST03 - Zoltan Strike', count: 0},
    ];
    cardName = signal("");

    nameAutocomplete = computed(() => {
        if (this.cardName() == '') return [];
        return this.cards.filter(c => c.printedName.toLowerCase().includes(this.cardName().toLowerCase()) || c.name?.toLowerCase().includes(this.cardName().toLowerCase()))
            .map(card => card.printedName);
    })

    filteredCards = computed(() => {
        return this.cards.filter(c => 
            this.selectedTypes().includes(c.type) &&
            this.selectedRarities().includes(c.rarity) && 
            !!c.elements.find(e => this.selectedElems().includes(e)) &&
            (this.cardName() == "" || c.printedName.toLowerCase().includes(this.cardName().toLowerCase()) || c.name?.toLowerCase().includes(this.cardName().toLowerCase())) &&
            this.selectedSets().includes(c.set)
        );
    });

    ngOnInit(): void {
        this.cards.forEach(c => {
            // Get types
            let i = this.cardTypes.find(t => t.value == c.type);
            if (i) i.count ++;
            else this.cardTypes.push({value: c.type, count: 1}); 
            // Get rarities
            i = this.cardRarities.find(x => x.value == c.rarity);
            if (i) i.count ++;
            else this.cardRarities.push({value: c.rarity, count: 1});
            // Get elements
            // Each elem should only be on a card once, but just to make sure
            for(let elem of [...new Set(c.elements)]) {
                i = this.cardElems.find(x => x.value == elem);
                if (i) i.count ++;
                else this.cardElems.push({value: elem, count: 1});
            }
            // Get sets
            i = this.cardSets.find(x => x.value == c.set);
            if (i) i.count ++;
            else this.cardSets.push({value: c.set, count: 1});
        });
        const descSort = (a: valueCount, b: valueCount) => b.count - a.count;
        this.cardTypes.sort(descSort);
        this.cardElems.sort(descSort);
        // Rarities and sets have a set order - no need to sort
        // this.cardSets.sort(descSort);
        // this.cardRarities.sort(descSort);
        this.selectedTypes.set(this.cardTypes.map(x => x.value));
        this.selectedRarities.set(this.cardRarities.map(x => x.value));
        this.selectedElems.set(this.cardElems.map(x => x.value));
        this.selectedSets.set(this.cardSets.map(x => x.value));
    }
}

type valueCount = {value: string, count: number}