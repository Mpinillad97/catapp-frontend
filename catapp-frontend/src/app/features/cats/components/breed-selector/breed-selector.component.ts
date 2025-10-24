import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatsApiService } from '../../../../core/services/cats-api.service';
import { Breed } from '../../../../core/models/cats';

@Component({
  selector: 'app-breed-selector',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './breed-selector.component.html',
  styleUrls: ['./breed-selector.component.scss']
})
export class BreedSelectorComponent implements OnInit {
  @Output() breedSelected = new EventEmitter<string>();
  breeds: Breed[] = [];

  constructor(private api: CatsApiService) {}

  ngOnInit(): void {
    this.api.getBreeds().subscribe(b => this.breeds = b);
  }
  onSelect(id: string) { this.breedSelected.emit(id); }
}
