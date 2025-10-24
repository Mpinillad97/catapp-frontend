import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { BreedDetailsComponent } from './breed-details.component';
import { CatsApiService } from '../../../../core/services/cats-api.service';

describe('BreedDetailsComponent (Jest)', () => {
  let fixture: ComponentFixture<BreedDetailsComponent>;
  let component: BreedDetailsComponent;
  let api: jest.Mocked<CatsApiService>;

  beforeEach(async () => {
    api = {
      getBreeds: jest.fn(),
      getBreedById: jest.fn(),
      searchBreeds: jest.fn(),
      getImagesByBreed: jest.fn(),
    } as unknown as jest.Mocked<CatsApiService>;

    await TestBed.configureTestingModule({
      imports: [CommonModule, BreedDetailsComponent],
      providers: [{ provide: CatsApiService, useValue: api }]
    }).compileComponents();

    fixture = TestBed.createComponent(BreedDetailsComponent);
    component = fixture.componentInstance;
  });

  it('con breedId asignado, carga breed e imágenes y muestra el nombre', () => {
    api.getBreedById.mockReturnValue(of({ id: 'abys', name: 'Abyssinian', description: 'desc' } as any));
    api.getImagesByBreed.mockReturnValue(of([
      { id: 'img1', url: 'http://x/1.jpg' },
      { id: 'img2', url: 'http://x/2.jpg' },
    ] as any));

    component.breedId = 'abys';
    component.ngOnChanges();
    fixture.detectChanges();

    const el = fixture.nativeElement as HTMLElement;
    expect(api.getBreedById).toHaveBeenCalledWith('abys');
    expect(api.getImagesByBreed).toHaveBeenCalledWith('abys', 6);
    expect(el.textContent).toContain('Abyssinian');
  });
});
