import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { atLeastOneSelectedValidator } from 'src/app/custom/atLeastOneSelectedValidator';
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
  memberOfIndigenousPeople!: FormControl;
  memberOfIndigenousCulturalCommunity!: FormControl;
  captchaToken: string | null = null;
  indicatorOptions: string[] = [
    'FIRST_GENERATION_COLLEGE_STUDENT',
    'FOUR_Ps_BENEFICIARY',
    'SOLO_PARENT',
    'RAISED_BY_A_SINGLE_OR_SOLO_PARENT',
    'ORPHAN',
    'PERSON_WITH_DISABILITY',
    'LIVING_IN_A_GEOGRAPHICALLY_ISOLATED_AND_DISADVANTAGED_AREA',
    'MEMBER_OF_INDIGENOUS_PEOPLE',
    'BELONGS_TO_A_FAMILY_OF_SUBSISTENCE_FARMERS_OR_FISHERFOLKS',
    'BELONGS_TO_A_FAMILY_OF_REBEL_RETURNEES',
    'NOT_APPLICABLE'
  ];

  constructor(private fb: FormBuilder, private savingService: SavingService) { }

  ngOnInit() {
    this.initForm();
    this.memberOfIndigenousPeople = this.studentForm.get(
      'studentRequest.family.memberOfIndigenousPeople'
    ) as FormControl;

    this.memberOfIndigenousCulturalCommunity = this.studentForm.get(
      'studentRequest.family.memberOfIndigenousCulturalCommunity'
    ) as FormControl;
    this.studentForm.get('studentRequest.educationBackground.studentType')?.valueChanges.subscribe(value => {
      const collegeControls = [
        'collegeType',
        'collegeName',
        'collegeAddress',
        'yearGraduatedCollege',
      ];

      collegeControls.forEach(field => {
        const control = this.studentForm.get(`studentRequest.educationBackground.${field}`);
        if (value === 'Transferee') {
          control?.setValidators([Validators.required]);
        } else {
          control?.clearValidators();
          control?.setValue('');
        }
        control?.updateValueAndValidity();
      });
    });


  }

  initForm() {
    const indicatorsArray = this.fb.array(
      this.indicatorOptions.map(indicator => {
        const group = this.fb.group({
          indicatorName: [indicator],
          selected: [false],
          details: ['']
        });

        group.get('selected')?.valueChanges.subscribe((isSelected: boolean | null) => {
          const detailsControl = group.get('details');
          if (isSelected) {
            detailsControl?.setValidators([Validators.required]);
          } else {
            detailsControl?.clearValidators();
          }
          detailsControl?.updateValueAndValidity();
        });

        return group;
      }),
      atLeastOneSelectedValidator // custom validator for at least one selected
    );

    this.studentForm = this.fb.group({
      studentRequest: this.fb.group({
        lrn: ['', Validators.required],
        campus: ['', Validators.required],
        course: ['', Validators.required],
        dateAdmitted: ['', Validators.required],
        semester: ['', Validators.required],
        academicYear: ['', Validators.required],
        firstName: ['', Validators.required],
        middleName: [''],
        lastName: ['', Validators.required],
        extensionName: [''],
        birthDate: ['', Validators.required],
        birthPlace: ['', Validators.required],
        gender: ['', Validators.required],
        civilStatus: ['', Validators.required],
        emailAddress: ['', Validators.email],
        citizenship: ['', Validators.required],
        religion: ['', Validators.required],
        mobileNumber: ['', [Validators.pattern(/^09\d{9}$/), Validators.minLength(11), Validators.maxLength(11)]],
        address: this.fb.group({
          street: [''],
          barangay: ['', Validators.required],
          region: ['', Validators.required],
          province: ['', Validators.required],
          city: ['', Validators.required],
          zipCode: [''],
        }),
        father: this.fb.group({
          lastName: ['', Validators.required],
          firstName: ['', Validators.required],
          middleName: ['', Validators.required],
          extension: [''],
          birthDate: ['', Validators.required],
          citizenship: ['', Validators.required],
          occupation: ['', Validators.required],
          address: this.fb.group({
            street: ['', Validators.required],
            barangay: ['', Validators.required],
            region: ['', Validators.required],
            province: ['', Validators.required],
            city: ['', Validators.required],
            zipCode: ['', Validators.required],
          }),
          highestEducationAttainment: ['', Validators.required],
        }),
        mother: this.fb.group({
          lastName: ['', Validators.required],
          firstName: ['', Validators.required],
          middleName: ['', Validators.required],
          birthDate: ['', Validators.required],
          citizenship: ['', Validators.required],
          occupation: ['', Validators.required],
          address: this.fb.group({
            street: ['', Validators.required],
            barangay: ['', Validators.required],
            region: ['', Validators.required],
            province: ['', Validators.required],
            city: ['', Validators.required],
            zipCode: ['', Validators.required],
          }),
          highestEducationAttainment: ['', Validators.required],
        }),
        family: this.fb.group({
          familySize: [''],
          monthlyGrossIncome: [''],
          firstGenerationStudent: [false, Validators.required],
          memberOfIndigenousPeople: [false, Validators.required],
          memberOfIndigenousCulturalCommunity: [false, Validators.required],
          indigenousCommunity: [''],
          indigenousCulturalCommunityDetails: ['']
        }),
        educationBackground: this.fb.group({
          studentType: ['', Validators.required],
          elementarySchool: ['', Validators.required],
          elementarySchoolAddress: ['', Validators.required],
          yearGraduatedElementarySchool: ['', Validators.required],

          juniorHighSchool: ['', Validators.required],
          juniorHighSchoolAddress: ['', Validators.required],
          yearGraduatedJuniorHighSchool: ['', Validators.required],

          seniorHighSchoolType: ['', Validators.required],
          seniorHighSchool: ['', Validators.required],
          seniorHighSchoolAddress: ['', Validators.required],
          yearGraduatedSeniorHighSchool: ['', Validators.required],

          collegeType: ['', Validators.required],
          collegeName: ['', Validators.required],
          collegeAddress: ['', Validators.required],
          yearGraduatedCollege: ['', Validators.required],

          scholarshipProgram: [''],
          scholarshipOfficeAddress: [''],
          contactNumber: ['', [Validators.pattern(/^09\d{9}$/), Validators.minLength(11), Validators.maxLength(11)]],
        }),
        emergencyContact: this.fb.group({
          firstName: ['', Validators.required],
          middleName: [''],
          lastName: ['', Validators.required],
          address: this.fb.group({
            street: ['', Validators.required],
            barangay: ['', Validators.required],
            region: ['', Validators.required],
            province: ['', Validators.required],
            city: ['', Validators.required],
            zipCode: ['', Validators.required],
          }),
          contactNumber: ['', [Validators.pattern(/^09\d{9}$/), Validators.minLength(11), Validators.maxLength(11)]],
        }),
        equityTargetIndicatorsRequest: indicatorsArray,
      }),
       captchaToken: [null, Validators.required]
    });
  }


  addEquityTargetIndicator() {
    const indicatorsArray = this.studentForm.get(
      'studentRequest.equityTargetIndicatorsRequest'
    ) as FormArray;
    indicatorsArray.push(
      this.fb.group({
        indicatorName: [''],
        details: [''],
      })
    );
  }
  get equityTargetIndicators(): FormArray {
    return this.studentForm.get('studentRequest.equityTargetIndicatorsRequest') as FormArray;
  }
  formatIndicatorLabel(value: string): string {
    return value
      .replace(/_/g, ' ')
      .toLowerCase()
      .replace(/\b\w/g, char => char.toUpperCase());
  }

  onSubmit() {
    if (!this.captchaToken) {
      // Show error to user
      alert('Please complete the CAPTCHA before submitting.')
      return;
    }
    const selectedIndicators = this.equityTargetIndicators.value
      .filter((indicator: any) => indicator.selected)
      .map((indicator: any) => ({
        indicatorName: indicator.indicatorName,
        details: indicator.details
      }));

    const payload = {
      ...this.studentForm.value,
      studentRequest: {
        ...this.studentForm.value.studentRequest,
        equityTargetIndicators: selectedIndicators
      }
    };
    this.savingService.saveStudentDetails(payload).subscribe({
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
  onCivilStatusCheck(value: string): void {
    const civilStatusControl = this.studentForm.get('studentRequest.civilStatus');
    const currentValue = civilStatusControl?.value;

    if (currentValue === value) {
      civilStatusControl?.setValue('');
    } else {
      civilStatusControl?.setValue(value);
    }
  }
  onCaptchaResolved(token: string | null): void {
    if (token) {
      console.log(token);
      this.captchaToken = token;
      this.studentForm.patchValue({ captchaToken: token });
    } else {
      this.captchaToken = null;
      console.warn('reCAPTCHA token was null.');
    }
  }



}
