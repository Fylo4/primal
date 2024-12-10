import { Routes } from '@angular/router';
import { CardsComponent } from './pages/cards/cards.component';
import { SynergyComponent } from './pages/synergy/synergy.component';
import { DecksComponent } from './pages/decks/decks.component';
import { PlayComponent } from './pages/play/play.component';

export const routes: Routes = [
    { path: 'cards', component: CardsComponent },
    { path: 'synergy', component: SynergyComponent },
    { path: 'decks', component: DecksComponent },
    { path: 'play', component: PlayComponent },
];
