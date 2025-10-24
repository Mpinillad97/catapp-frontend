import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BreedSelectorComponent } from './breed-selector.component';
import { By } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { CatsApiService } from '../../../../core/services/cats-api.service';
import { of } from 'rxjs';

describe('BreedSelectorComponent', () => {
  let component: BreedSelectorComponent;
  let fixture: ComponentFixture<BreedSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, BreedSelectorComponent],
      providers: [
        {
          provide: CatsApiService,
          useValue: {
            getBreeds: jest.fn().mockReturnValue(of([
              { id: 'abys', name: 'Abyssinian' },
              { id: 'beng', name: 'Bengal' },
            ])),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(BreedSelectorComponent);
    component = fixture.componentInstance;

    // si tu componente carga razas en ngOnInit, dispara det. cambios:
    fixture.detectChanges();
  });

  it('debe renderizar opciones y emitir breedSelected al cambiar', () => {
    const select: HTMLSelectElement = fixture.debugElement.query(By.css('select')).nativeElement;
    const handler = jest.fn();
    component.breedSelected.subscribe(handler);

    // selecciona la opción 2 (Bengal)
    select.value = select.options[2].value;
    select.dispatchEvent(new Event('change'));
    fixture.detectChanges();

    expect(handler).toHaveBeenCalledWith('beng');
  });
});

