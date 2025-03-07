import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ResidenceService } from './../services/residence.service';
import { Residence } from './../core/models/residence';

@Component({
  selector: 'app-add-residence',
  templateUrl: './add-residence.component.html',
  styleUrls: ['./add-residence.component.css']
})
export class AddResidenceComponent implements OnInit {
  myForm!: FormGroup;
  residenceId: number | null = null;
  isEditMode: boolean = false;

  constructor(
    private rservice: ResidenceService,
    public myRouter: Router,  
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.myForm = new FormGroup({
      name: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      image: new FormControl(''),
      status: new FormControl('', Validators.required)
    });

    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.isEditMode = true;
        this.residenceId = +id; 
        this.loadResidenceData(this.residenceId);
      } else {
        this.isEditMode = false;
      }
    });
  }

  // Fetch the residence data for editing
  loadResidenceData(id: number): void {
    this.rservice.getResidenceById(id).subscribe(res => {
      this.myForm.patchValue(res);
    });
  }

  save(): void {
    if (this.myForm.invalid) return;

    const residence: Residence = { ...this.myForm.value, id: this.residenceId };

    if (this.isEditMode) {
      this.rservice.updateResidence(residence).subscribe(() => {
        this.myRouter.navigateByUrl('/home');
      });
    } else {
      this.rservice.addResidence(this.myForm.value).subscribe(() => {
        this.myRouter.navigateByUrl('/home');
      });
    }
  }
}
