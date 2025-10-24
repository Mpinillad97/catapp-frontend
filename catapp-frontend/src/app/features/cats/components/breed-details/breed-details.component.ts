import { Component, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatsApiService } from '../../../../core/services/cats-api.service';
import { Breed, CatImage } from '../../../../core/models/cats';

@Component({
  selector: 'app-breed-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './breed-details.component.html',
  styleUrls: ['./breed-details.component.scss']
})
export class BreedDetailsComponent implements OnChanges {
  @Input() breedId = '';
  breed?: Breed;
  images: CatImage[] = [];
  current = 0;

  constructor(private api: CatsApiService) {}

  ngOnChanges(): void {
    if (!this.breedId) { this.breed = undefined; this.images = []; return; }
    this.api.getBreedById(this.breedId).subscribe(b => this.breed = b);
    this.api.getImagesByBreed(this.breedId, 6).subscribe(imgs => { this.images = imgs; this.current = 0; });
  }

  prev(){ if(this.images.length) this.current = (this.current - 1 + this.images.length) % this.images.length; }
  next(){ if(this.images.length) this.current = (this.current + 1) % this.images.length; }
  goTo(i: number){ if(this.images.length) this.current = i; }
}
