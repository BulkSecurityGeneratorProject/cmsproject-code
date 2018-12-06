/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { AuthorizedSignatoryService } from 'app/entities/authorized-signatory/authorized-signatory.service';
import { IAuthorizedSignatory, AuthorizedSignatory } from 'app/shared/model/authorized-signatory.model';

describe('Service Tests', () => {
    describe('AuthorizedSignatory Service', () => {
        let injector: TestBed;
        let service: AuthorizedSignatoryService;
        let httpMock: HttpTestingController;
        let elemDefault: IAuthorizedSignatory;
        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HttpClientTestingModule]
            });
            injector = getTestBed();
            service = injector.get(AuthorizedSignatoryService);
            httpMock = injector.get(HttpTestingController);

            elemDefault = new AuthorizedSignatory(0, 'AAAAAAA', 'AAAAAAA', 'AAAAAAA', 'AAAAAAA', 'AAAAAAA', 'AAAAAAA');
        });

        describe('Service methods', async () => {
            it('should find an element', async () => {
                const returnedFromService = Object.assign({}, elemDefault);
                service
                    .find(123)
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: elemDefault }));

                const req = httpMock.expectOne({ method: 'GET' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should create a AuthorizedSignatory', async () => {
                const returnedFromService = Object.assign(
                    {
                        id: 0
                    },
                    elemDefault
                );
                const expected = Object.assign({}, returnedFromService);
                service
                    .create(new AuthorizedSignatory(null))
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'POST' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should update a AuthorizedSignatory', async () => {
                const returnedFromService = Object.assign(
                    {
                        signatoryName: 'BBBBBB',
                        signatoryFatherName: 'BBBBBB',
                        signatoryDesignation: 'BBBBBB',
                        address: 'BBBBBB',
                        email: 'BBBBBB',
                        panCardNumber: 'BBBBBB'
                    },
                    elemDefault
                );

                const expected = Object.assign({}, returnedFromService);
                service
                    .update(expected)
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'PUT' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should return a list of AuthorizedSignatory', async () => {
                const returnedFromService = Object.assign(
                    {
                        signatoryName: 'BBBBBB',
                        signatoryFatherName: 'BBBBBB',
                        signatoryDesignation: 'BBBBBB',
                        address: 'BBBBBB',
                        email: 'BBBBBB',
                        panCardNumber: 'BBBBBB'
                    },
                    elemDefault
                );
                const expected = Object.assign({}, returnedFromService);
                service
                    .query(expected)
                    .pipe(
                        take(1),
                        map(resp => resp.body)
                    )
                    .subscribe(body => expect(body).toContainEqual(expected));
                const req = httpMock.expectOne({ method: 'GET' });
                req.flush(JSON.stringify([returnedFromService]));
                httpMock.verify();
            });

            it('should delete a AuthorizedSignatory', async () => {
                const rxPromise = service.delete(123).subscribe(resp => expect(resp.ok));

                const req = httpMock.expectOne({ method: 'DELETE' });
                req.flush({ status: 200 });
            });
        });

        afterEach(() => {
            httpMock.verify();
        });
    });
});
