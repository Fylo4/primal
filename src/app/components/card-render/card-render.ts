import { Component, Input } from "@angular/core";
import { PrimalCard } from "../../data/cards.data";
import { NarrowestImgPipe } from "./narrowest-img.pipe";

@Component({
    selector: 'app-card-render',
    templateUrl: './card-render.html',
    styles: '',
    standalone: true,
    imports: [NarrowestImgPipe],
})
export class CardRenderComponent {
    @Input() card!: PrimalCard;
    @Input() display: 'image' | 'construct' = 'image';
    @Input() width: number = 200;
}