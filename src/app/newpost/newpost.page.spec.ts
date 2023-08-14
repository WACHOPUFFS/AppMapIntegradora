import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NewpostPage } from './newpost.page';

describe('NewpostPage', () => {
  let component: NewpostPage;
  let fixture: ComponentFixture<NewpostPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(NewpostPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
