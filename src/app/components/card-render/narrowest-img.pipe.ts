import {PipeTransform, Pipe} from '@angular/core';
import { PrimalCard } from '../../data/cards.data';

@Pipe({name: 'NarrowestImg', standalone: true})
export class NarrowestImgPipe implements PipeTransform {
  // Finds the lowest-resolution image that is at least as wide as 'width'
  transform(card: PrimalCard, width: number): any {
    width *= 2; // Double the resolution per pixel to sharpen the image
    if (!card.imageUrls?.length) return;
    // sortedUrls[0] is big, sortedUrls[5] is small
    var sortedUrls = card.imageUrls.sort((a, b) => b.width - a.width);
    // If the widest image is too small, return it
    if (sortedUrls[0].width < width) return sortedUrls[0].url;
    // If there are images with sufficient width, return the smallest of them
    let goodImages = card.imageUrls.filter(i => i.width >= width);
    return goodImages[goodImages.length - 1].url;
  }
}