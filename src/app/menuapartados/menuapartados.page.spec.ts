import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MenuapartadosPage } from './menuapartados.page';

describe('MenuapartadosPage', () => {
  let component: MenuapartadosPage;
  let fixture: ComponentFixture<MenuapartadosPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MenuapartadosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
