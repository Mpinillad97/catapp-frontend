import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CatsApiService } from '../../../../core/services/cats-api.service';
import { Breed } from '../../../../core/models/cats';

@Component({
  selector: 'app-breeds-table-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './breeds-table.page.html',
  styleUrls: ['./breeds-table.page.scss']
})
export class BreedsTablePage implements OnInit {
  breeds: Breed[] = [];
  q = '';

  constructor(private api: CatsApiService) {}

  ngOnInit(): void { this.loadAll(); }
  loadAll(){ this.api.getBreeds().subscribe(b => this.breeds = b); }
  search(){
    const term = this.q.trim();
    if(!term){ this.loadAll(); return; }
    this.api.searchBreeds(term).subscribe(b => this.breeds = b);
  }
}
