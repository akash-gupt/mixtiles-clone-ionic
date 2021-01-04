import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CropComponent } from './crop.component';

describe('CropComponent', () => {
  let component: CropComponent;
  let fixture: ComponentFixture<CropComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CropComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CropComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
