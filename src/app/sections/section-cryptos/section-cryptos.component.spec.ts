import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionCryptosComponent } from './section-cryptos.component';

describe('SectionCryptosComponent', () => {
  let component: SectionCryptosComponent;
  let fixture: ComponentFixture<SectionCryptosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SectionCryptosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionCryptosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
