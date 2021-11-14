import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Options } from '@angular-slider/ngx-slider';
@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {
  sliderPriceForm: FormGroup = new FormGroup({
    sliderControl: new FormControl([20, 80])
  });
  options: Options = {
    floor: 0,
    ceil: 100,
    step: 5
  };

  resetForm(): void {
    this.sliderPriceForm.reset({sliderControl: [20, 80]});
  }
submit(){
}
  ngOnInit(): void {
  }

}
