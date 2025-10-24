import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CatsApiService } from './cats-api.service';

describe('CatsApiService', () => {
  let service: CatsApiService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CatsApiService]
    });
    service = TestBed.inject(CatsApiService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('getBreeds debe hacer GET /api/breeds y devolver array', () => {
    const mock = [{ id: 'abys', name: 'Abyssinian' }];
    service.getBreeds().subscribe(res => {
      expect(res).toEqual(mock);
    });
    const req = http.expectOne('/api/breeds');
    expect(req.request.method).toBe('GET');
    req.flush(mock);
  });

  it('getImagesByBreed debe pasar breed_id y limit en querystring', () => {
    const mock = [{ id: 'img1', url: 'http://x/y.jpg' }];
    service.getImagesByBreed('abys', 3).subscribe(res => {
      expect(res).toHaveLength(1);
      expect(res[0].url).toContain('http');
    });
    const req = http.expectOne(r => r.url === '/api/imagesbybreedid' && r.params.get('breed_id') === 'abys' && r.params.get('limit') === '3');
    expect(req.request.method).toBe('GET');
    req.flush(mock);
  });
});
