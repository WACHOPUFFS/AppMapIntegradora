import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VerPublicacionPage } from './ver-publicacion.page';

describe('VerPublicacionPage', () => {
  let component: VerPublicacionPage;
  let fixture: ComponentFixture<VerPublicacionPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(VerPublicacionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
