import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocisComponent } from './docis.component';

describe('DocisComponent', () => {
  let component: DocisComponent;
  let fixture: ComponentFixture<DocisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocisComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DocisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
