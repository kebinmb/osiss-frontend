import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Indicators } from 'src/app/entity/all-details.model';
import {
  AllDetailsRequest,
  SavingService,
} from 'src/app/services/saving.service';

@Component({
  selector: 'app-student-data',
  templateUrl: './student-data.component.html',
  styleUrls: ['./student-data.component.css'],
})
export class StudentDataComponent implements OnInit {
  studentForm!: FormGroup;

  constructor(private fb: FormBuilder, private savingService: SavingService) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.studentForm = this.fb.group({
      studentRequest: this.fb.group({
        lrn: [''],
        campus: [''],
        course: [''],
        dateAdmitted: [''],
        semester: [''],
        academicYear: [''],

        firstName: [''],
        middleName: [''],
        lastName: [''],
        extensionName: [''],
        birthDate: [''],
        birthPlace: [''],
        gender: [''],
        civilStatus: [''],
        emailAddress: ['',Validators.email],
        citizenship: [''],
        religion: [''],
        mobileNumber: ['',Validators.pattern(/^09\d{9}$/)],
        address: this.fb.group({
          street: [''],
          barangay: [''],
          region: [''],
          province: [''],
          city: [''],
          zipcode: [''],
        }),
        father: this.fb.group({
          lastName: [''],
          firstName: [''],
          middleName: [''],
          extension: [''],
          birthDate: [''],
          citizenship: [''],
          occupation: [''],
          address: this.fb.group({
            street: [''],
            barangay: [''],
            region: [''],
            province: [''],
            city: [''],
            zipcode: [''],
          }),
          highestEducationAttainment: [''],
        }),
        mother: this.fb.group({
          lastName: [''],
          firstName: [''],
          middleName: [''],
          birthDate: [''],
          citizenship: [''],
          occupation: [''],
          address: this.fb.group({
            street: [''],
            barangay: [''],
            region: [''],
            province: [''],
            city: [''],
            zipcode: [''],
          }),
          highestEducationalAttainment: [''],
        }),
        family: this.fb.group({
          familySize: [''],
          monthlyGrossIncome: [''],
          firstGenerationStudent: [''],
          memberOfIndigenousPeople: [''],
          memberOfIndigenousCulturalCommunity: [''],
          indigenousCommunity: [''],
        }),
        educationBackground: this.fb.group({
          elementarySchool: [''],
          elementarySchoolAddress: [''],
          yearGraduatedElementarySchool: [''],
          juniorHighSchool: [''],
          juniorHighSchoolAddress: [''],
          yearGraduatedJuniorHighSchool: [''],
          seniorHighSchoolType: [''],
          seniorHighSchool: [''],
          seniorHighSchoolAddress: [''],
          yearGraduatedSeniorHighSchool: [''],
          collegeType: [''],
          collegeAddress: [''],
          yearGraduatedCollege: [''],
          graduateSchool: [''],
          graduateSchoolAddress: [''],
          yearGraduatedGraduateSchool: [''],
          scholarshipProgram: [''],
          scholarshipOfficeAddress: [''],
          contactNumber: [''],
        }),
        emergencyContact: this.fb.group({
          firstName: [''],
          middleName: [''],
          lastName: [''],
          address: this.fb.group({
            street: [''],
            barangay: [''],
            region: [''],
            province: [''],
            city: [''],
            zipcode: [''],
          }),
          contactNumber: [''],
        }),
        equityTargetIndicators: this.fb.array([]), // you can push FormGroups into this later
      }),

      // Duplicates for "Request" parts outside of studentRequest
      addressRequest: this.fb.group({
        street: [''],
        barangay: [''],
        region: [''],
        province: [''],
        city: [''],
        zipcode: [''],
      }),
      educationBackgroundRequest: this.fb.group({
        elementarySchool: [''],
        elementarySchoolAddress: [''],
        yearGraduatedElementarySchool: [''],
        juniorHighSchool: [''],
        juniorHighSchoolAddress: [''],
        yearGraduatedJuniorHighSchool: [''],
        seniorHighSchoolType: [''],
        seniorHighSchool: [''],
        seniorHighSchoolAddress: [''],
        yearGraduatedSeniorHighSchool: [''],
        collegeType: [''],
        collegeAddress: [''],
        yearGraduatedCollege: [''],
        graduateSchool: [''],
        graduateSchoolAddress: [''],
        yearGraduatedGraduateSchool: [''],
        scholarshipProgram: [''],
        scholarshipOfficeAddress: [''],
        contactNumber: [''],
      }),
      emergencyContactRequest: this.fb.group({
        firstName: [''],
        middleName: [''],
        lastName: [''],
        address: this.fb.group({
          street: [''],
          barangay: [''],
          region: [''],
          province: [''],
          city: [''],
          zipcode: [''],
        }),
        contactNumber: [''],
      }),
      equityTargetIndicatorsRequest: this.fb.array([]), // add as needed
      familyRequest: this.fb.group({
        familySize: [''],
        monthlyGrossIncome: [''],
        firstGenerationStudent: [''],
        memberOfIndigenousPeople: [''],
        memberOfIndigenousCulturalCommunity: [''],
        indigenousCommunity: [''],
      }),
      fatherRequest: this.fb.group({
        lastName: [''],
        firstName: [''],
        middleName: [''],
        extension: [''],
        birthDate: [''],
        citizenship: [''],
        occupation: [''],
        address: this.fb.group({
          street: [''],
          barangay: [''],
          region: [''],
          province: [''],
          city: [''],
          zipcode: [''],
        }),
        highestEducationAttainment: [''],
      }),
      motherRequest: this.fb.group({
        lastName: [''],
        firstName: [''],
        middleName: [''],
        occupation: [''],
        birthDate: [''],
        citizenship: [''],
        address: this.fb.group({
          street: [''],
          barangay: [''],
          region: [''],
          province: [''],
          city: [''],
          zipcode: [''],
        }),
        highestEducationalAttainment: [''],
      }),
    });
  }

  addEquityTargetIndicator() {
    const indicatorsArray = this.studentForm.get(
      'studentRequest.equityTargetIndicators'
    ) as FormArray;
    indicatorsArray.push(
      this.fb.group({
        indicatorName: [''],
        details: [''],
      })
    );
  }
  get equityTargetIndicators(): FormArray {
    return this.studentForm?.get(
      'studentRequest.equityTargetIndicators'
    ) as FormArray;
  }

  onSubmit() {
    this.savingService.saveStudentDetails(this.studentForm.value).subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
  onGenderCheckboxChange(value: string): void {
  const genderControl = this.studentForm.get('studentRequest.gender');
  const currentValue = genderControl?.value;

  if (currentValue === value) {
    genderControl?.setValue(''); // uncheck if same is clicked
  } else {
    genderControl?.setValue(value);
  }
}
onCivilStatusCheck(value:string):void{
  const civilStatusControl = this.studentForm.get('studentRequest.civilStatus');
  const currentValue = civilStatusControl?.value;

  if(currentValue === value){
    civilStatusControl?.setValue('');
  }else{
    civilStatusControl?.setValue(value);
  }
}

}
