import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { atLeastOneSelectedValidator } from 'src/app/custom/atLeastOneSelectedValidator';
import { Indicators } from 'src/app/entity/all-details.model';
import {
  AllDetailsRequest,
  SavingService,
} from 'src/app/services/saving.service';
import { DataPrivacyComponent } from '../data-privacy/data-privacy.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-data',
  templateUrl: './student-data.component.html',
  styleUrls: ['./student-data.component.css'],
})
export class StudentDataComponent implements OnInit {
  studentForm!: FormGroup;
  memberOfIndigenousPeople!: FormControl;
  memberOfIndigenousCulturalCommunity!: FormControl;
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
  campusCourses: {
  [key: string]: Array<string | { course: string; majors: string[] }>
} = {
  Talisay: [
    'BA in English Language',
    'BA Social Science',
    'BS Psychology',
    'B of Public Administration',
    'BS in Applied Mathematics',
    'B of Elementary Education',
    'B of Early Childhood Educ',
    'B of Physical Education',
    { course: 'B of Secondary Education', majors: ['English', 'Filipino', 'Mathematics', 'Science'] },
    'B of Special Needs Education',
    { course: 'B of Technology & Livelihood Education', majors:['Home Economics','Industrial Arts']},
    { course: 'B of Industrial Technology', majors:['Architectural Drafting Technology','Automotive Technology','Electrical Technology','Electronics Technology','Apparel and Fashion Technology','Culinary Technology','Mechanical Technology','Heating, Ventilating, Air Conditioning and Refrigeration Technology']},
    { course: 'BS in Industrial Technology',majors:['Architectural Drafting Technology','Automative Technology','Electrical Technology','Electronics Technology','Fashion and Apparel Technology','Foods Trade Technology','Mechanical Technology','Refrig and Air Conditioning Technology']},
    'BS in Hospitality Management',
    'BS in Information Systems',
    'BS in Civil Engineering'
  ],
  Alijis: [
    { course: 'B of Technical Vocational Educ',majors:['Electronics Technology','Electrical Technology']},
    'BS in Computer Engineering',
    'BS in Electronics Engineering',
    { course: 'B of Industrial Technology',majors:['Architectural Drafting Techonology','Automotive Technology','Computer Technology','Electrical Technology','Electronics Technology','Foods Trade Technology','Mechanical Technology']},
    'BS in Informations System',
    'BS in Information Technology'
  ],

  'Fortune Towne': [
    'BS in Accountancy',
    'BS in Business Administration',
    'BS in Entrepreneurship',
    'BS in Information Systems',
    'BS in Management Accounting',
    'BS in Office Administration'
  ],
  Binalbagan: [
    'B of Elementary Education',
    'B of Secondary Education (Science)',
    'B of Technology & Livelihood Educ',
    'BS in Business Administration',
    'BS in Criminology',
    'BS in Fisheries',
    'BS in Information Technology'
  ],
};
filteredCourses: { course: string; majors: string[] }[] = [];
availableMajors: string[] = [];
showMajorField = false;
  constructor(private fb: FormBuilder, private savingService: SavingService,private dialog: MatDialog, private snackbar:MatSnackBar, private router:Router) { }
ngAfterViewInit(): void {
    if (!sessionStorage.getItem('privacyAccepted')) {
      this.dialog.open(DataPrivacyComponent, {
        width: '500px',
        disableClose: true
      });
    }
  }
  ngOnInit() {

    this.initForm();
    const studentRequest = this.studentForm.get('studentRequest');

  studentRequest?.get('campus')?.valueChanges.subscribe((campus) => {
    const courses = this.campusCourses[campus] || [];

    this.filteredCourses = courses.map(item =>
      typeof item === 'string' ? { course: item, majors: [] } : item
    );

    studentRequest.get('course')?.reset();
    studentRequest.get('major')?.reset();
    this.showMajorField = false;
  });

  studentRequest?.get('course')?.valueChanges.subscribe((selectedCourse) => {
    const match = this.filteredCourses.find(c => c.course === selectedCourse);
    if (match && match.majors.length) {
      this.availableMajors = match.majors;
      this.showMajorField = true;
      studentRequest.get('major')?.setValidators(Validators.required);
    } else {
      this.availableMajors = [];
      this.showMajorField = false;
      studentRequest.get('major')?.clearValidators();
    }
    studentRequest.get('major')?.updateValueAndValidity();
  });
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
        major: [''],
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
          firstGenerationStudent: [false],
          memberOfIndigenousPeople: [false],
          memberOfIndigenousCulturalCommunity: [false],
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
        this.snackbar.open('Data Saved Successfully','Close',{duration:3000})
        this.studentForm.reset();
        this.router.navigate(['thank-you'])
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
      genderControl?.setValue('');
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
  openDataPrivacyModal(){

  }


}
