import { Component, OnInit } from "@angular/core";
import { CardRenderComponent } from "../../components/card-render/card-render";
import { cards } from "../../data/cards.data";
import { BoardState } from "../../game-classes/board-state";
import { NarrowestImgPipe } from "../../components/card-render/narrowest-img.pipe";
import { HydroelectricFished } from "../../data/saved-decks.data";

@Component({
    selector: 'app-play',
    templateUrl: './play.component.html',
    styleUrl: './play.component.scss',
    standalone: true,
    imports: [
        CardRenderComponent,
        NarrowestImgPipe,
    ]
})
export class PlayComponent implements OnInit {
    allCards = cards;
    canvasWidth = 1200;

    board: BoardState = new BoardState();

    ngOnInit(): void {
        let p1Deck = [...HydroelectricFished.cards];
        for (let a = 0; a < 6; a ++) {
            let index = Math.floor(Math.random()*p1Deck.length);
            let card = this.allCards.find(c => c.cardNumber == p1Deck[index]);
            if (card) this.board.p1Hand.push({...card});
            p1Deck.splice(index, 1);
        }
        setTimeout(() => this.render(), 1000);
    }

    render() {
        let cardSize = this.canvasWidth * 0.1;
        console.log("Rendering")
        let canvas = document.getElementById('gameCanvas') as HTMLCanvasElement;
        let ctx = canvas?.getContext('2d');
        if (!ctx) return;

        this.board.p1Hand.forEach((card, index) => {
            console.log("*")
            let image = document.getElementById(card.cardNumber) as HTMLImageElement;
            let size = 50;
            if (image) ctx!.drawImage(image, index*50, 0, 2.5*size, 3.5*size);
            else console.log("E")
            index ++;
        });

        let image = document.getElementById('card-back') as HTMLImageElement;
        if (image) ctx.drawImage(image, 50, 50)

        
    }
}