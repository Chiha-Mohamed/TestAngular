import {ActivatedRoute, Router} from '@angular/router';
import {ResidenceService} from './../services/residence.service';
import {Residence} from './../core/models/residence';
import {FormGroup, FormControl} from '@angular/forms';
import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-add-residence',
  templateUrl: './add-residence.component.html',
  styleUrls: ['./add-residence.component.css']
})
export class AddResidenceComponent implements OnInit {
  myForm!: FormGroup;
  r: Residence = new Residence();
  isUpdateMode: boolean = false;
  residenceId: number | null = null;

  constructor(
    private rservice: ResidenceService,
    private myRouter: Router,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.myForm = new FormGroup({
      name: new FormControl(""),
      adress: new FormControl(""),
      image: new FormControl(""),
      status: new FormControl("")
    });

    // Check if we are in update mode
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.isUpdateMode = true;
        this.residenceId = +id;
        this.loadResidenceData(this.residenceId);
      }
    });
  }

  loadResidenceData(id: number) {
    this.rservice.getResidenceById(id).subscribe(residence => {
      this.myForm.patchValue({
        name: residence.name,
        // adress: residence.adress,
        image: residence.image,
        status: residence.status
      });
    });
  }

  add() {
    if (this.isUpdateMode && this.residenceId !== null) {
      const updatedResidence = {id: this.residenceId, ...this.myForm.value};
      this.rservice.updateResidence(updatedResidence).subscribe(
        () => this.myRouter.navigateByUrl("home")
      );
    } else {
      this.rservice.addResidence(this.myForm.value).subscribe(
        () => this.myRouter.navigateByUrl("home")
      );
    }
  }
}