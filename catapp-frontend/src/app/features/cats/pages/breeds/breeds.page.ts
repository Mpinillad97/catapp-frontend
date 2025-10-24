import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreedSelectorComponent } from '../../components/breed-selector/breed-selector.component';
import { BreedDetailsComponent } from '../../components/breed-details/breed-details.component';

@Component({
  selector: 'app-breeds-page',
  standalone: true,
  imports: [CommonModule, BreedSelectorComponent, BreedDetailsComponent],
  templateUrl: './breeds.page.html',
  styleUrls: ['./breeds.page.scss']
})
export class BreedsPage {
  selectedId = '';
  onBreed(id: string) { this.selectedId = id; }
}
