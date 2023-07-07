import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecuperarPPage } from './recuperar-p.page';

describe('RecuperarPPage', () => {
  let component: RecuperarPPage;
  let fixture: ComponentFixture<RecuperarPPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(RecuperarPPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
