import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
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
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-student-data',
  templateUrl: './student-data.component.html',
  styleUrls: ['./student-data.component.css'],
})
export class StudentDataComponent implements OnInit {
  regionOptions: any[] = [];
  provinceOptions: any[] = [];
  cityOptions: any[] = [];
  barangayOptions: any[] = [];
  selectedRegion: any;
  selectedProvince: any;
  selectedCity: any;
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
    'NOT_APPLICABLE',
  ];
  suffixOptions: string[] = [
  'Jr.',
  'Sr.',
  'II',
  'III',
  'IV',
  'V',
  'PhD',
  'MD',
  'Esq.'
];
ageOptions: number[] = Array.from({ length: 100 }, (_, i) => i + 1); // 1 to 100

  sexualOrientations: string[] = [
    'Male',
    'Female',
    'Heterosexual',
    'Lesbian',
    'Gay',
    'Bisexual',
    'Transgender',
    'Rather not to say',
    'Others',
  ];
  isOtherGenderSelected = false;
  heightOptions: number[] = Array.from({ length: 121 }, (_, i) => i + 100); // 100 to 220 cm
  weightOptions: number[] = Array.from({ length: 121 }, (_, i) => i + 30); // 30 to 150 kg
  religionOptions: string[] = [
    'Roman Catholic',
    'Protestant',
    'Christian (Non-Catholic)',
    'Iglesia ni Cristo',
    'Seventh-day Adventist',
    "Jehovah's Witness",
    'Islam',
    'Buddhism',
    'Hinduism',
    'Judaism',
    'Atheist',
    'Agnostic',
    'Animism',
    'Sikhism',
    'Taoism',
    'Baháʼí Faith',
    'Shinto',
    'Orthodox Christianity',
    'Evangelical',
    'Latter-day Saints (Mormon)',
    'Unitarian Universalism',
    'Zoroastrianism',
    'Rastafarianism',
    'Paganism',
    'Other',
  ];
  citizenshipOptions: string[] = [
    'Afghan',
    'Albanian',
    'Algerian',
    'American',
    'Andorran',
    'Angolan',
    'Antiguan and Barbudan',
    'Argentine',
    'Armenian',
    'Australian',
    'Austrian',
    'Azerbaijani',
    'Bahamian',
    'Bahraini',
    'Bangladeshi',
    'Barbadian',
    'Belarusian',
    'Belgian',
    'Belizean',
    'Beninese',
    'Bhutanese',
    'Bolivian',
    'Bosnian and Herzegovinian',
    'Botswanan',
    'Brazilian',
    'Bruneian',
    'Bulgarian',
    'Burkinabé',
    'Burmese',
    'Burundian',
    'Cabo Verdean',
    'Cambodian',
    'Cameroonian',
    'Canadian',
    'Central African',
    'Chadian',
    'Chilean',
    'Chinese',
    'Colombian',
    'Comoran',
    'Congolese',
    'Costa Rican',
    'Croatian',
    'Cuban',
    'Cypriot',
    'Czech',
    'Danish',
    'Djiboutian',
    'Dominican',
    'Dutch',
    'East Timorese',
    'Ecuadorean',
    'Egyptian',
    'Emirati',
    'Equatoguinean',
    'Eritrean',
    'Estonian',
    'Eswatini',
    'Ethiopian',
    'Fijian',
    'Finnish',
    'French',
    'Gabonese',
    'Gambian',
    'Georgian',
    'German',
    'Ghanaian',
    'Greek',
    'Grenadian',
    'Guatemalan',
    'Guinean',
    'Guinea-Bissauan',
    'Guyanese',
    'Haitian',
    'Honduran',
    'Hungarian',
    'Icelandic',
    'Indian',
    'Indonesian',
    'Iranian',
    'Iraqi',
    'Irish',
    'Israeli',
    'Italian',
    'Ivorian',
    'Jamaican',
    'Japanese',
    'Jordanian',
    'Kazakhstani',
    'Kenyan',
    'Kiribati',
    'Kuwaiti',
    'Kyrgyzstani',
    'Lao',
    'Latvian',
    'Lebanese',
    'Liberian',
    'Libyan',
    'Liechtensteiner',
    'Lithuanian',
    'Luxembourgish',
    'Macedonian',
    'Malagasy',
    'Malawian',
    'Malaysian',
    'Maldivian',
    'Malian',
    'Maltese',
    'Marshallese',
    'Mauritanian',
    'Mauritian',
    'Mexican',
    'Micronesian',
    'Moldovan',
    'Monégasque',
    'Mongolian',
    'Montenegrin',
    'Moroccan',
    'Mozambican',
    'Namibian',
    'Nauruan',
    'Nepalese',
    'New Zealander',
    'Nicaraguan',
    'Nigerien',
    'Nigerian',
    'North Korean',
    'Norwegian',
    'Omani',
    'Pakistani',
    'Palauan',
    'Palestinian',
    'Panamanian',
    'Papua New Guinean',
    'Paraguayan',
    'Peruvian',
    'Philippines',
    'Polish',
    'Portuguese',
    'Qatari',
    'Romanian',
    'Russian',
    'Rwandan',
    'Saint Kitts and Nevis',
    'Saint Lucian',
    'Saint Vincentian',
    'Samoan',
    'San Marinese',
    'Sao Tomean',
    'Saudi',
    'Senegalese',
    'Serbian',
    'Seychellois',
    'Sierra Leonean',
    'Singaporean',
    'Slovak',
    'Slovenian',
    'Solomon Islander',
    'Somali',
    'South African',
    'South Korean',
    'South Sudanese',
    'Spanish',
    'Sri Lankan',
    'Sudanese',
    'Surinamese',
    'Swedish',
    'Swiss',
    'Syrian',
    'Taiwanese',
    'Tajikistani',
    'Tanzanian',
    'Thai',
    'Togolese',
    'Tongan',
    'Trinidadian and Tobagonian',
    'Tunisian',
    'Turkish',
    'Turkmen',
    'Tuvaluan',
    'Ugandan',
    'Ukrainian',
    'Uruguayan',
    'Uzbekistani',
    'Vanuatuan',
    'Vatican',
    'Venezuelan',
    'Vietnamese',
    'Yemeni',
    'Zambian',
    'Zimbabwean',
  ];

  campusCourses: {
    [key: string]: Array<string | { course: string; majors: string[] }>;
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
      {
        course: 'B of Secondary Education',
        majors: ['English', 'Filipino', 'Mathematics', 'Science'],
      },
      'B of Special Needs Education',
      {
        course: 'B of Technology & Livelihood Education',
        majors: ['Home Economics', 'Industrial Arts'],
      },
      {
        course: 'B of Industrial Technology',
        majors: [
          'Architectural Drafting Technology',
          'Automotive Technology',
          'Electrical Technology',
          'Electronics Technology',
          'Apparel and Fashion Technology',
          'Culinary Technology',
          'Mechanical Technology',
          'Heating, Ventilating, Air Conditioning and Refrigeration Technology',
        ],
      },
      {
        course: 'BS in Industrial Technology',
        majors: [
          'Architectural Drafting Technology',
          'Automative Technology',
          'Electrical Technology',
          'Electronics Technology',
          'Fashion and Apparel Technology',
          'Foods Trade Technology',
          'Mechanical Technology',
          'Refrig and Air Conditioning Technology',
        ],
      },
      'BS in Hospitality Management',
      'BS in Information Systems',
      'BS in Civil Engineering',
    ],
    Alijis: [
      {
        course: 'B of Technical Vocational Educ',
        majors: ['Electronics Technology', 'Electrical Technology'],
      },
      'BS in Computer Engineering',
      'BS in Electronics Engineering',
      {
        course: 'B of Industrial Technology',
        majors: [
          'Architectural Drafting Techonology',
          'Automotive Technology',
          'Computer Technology',
          'Electrical Technology',
          'Electronics Technology',
          'Foods Trade Technology',
          'Mechanical Technology',
        ],
      },
      'BS in Informations System',
      'BS in Information Technology',
    ],

    'Fortune Towne': [
      'BS in Accountancy',
      'BS in Business Administration',
      'BS in Entrepreneurship',
      'BS in Information Systems',
      'BS in Management Accounting',
      'BS in Office Administration',
    ],
    Binalbagan: [
      'B of Elementary Education',
      'B of Secondary Education (Science)',
      'B of Technology & Livelihood Educ',
      'BS in Business Administration',
      'BS in Criminology',
      'BS in Fisheries',
      'BS in Information Technology',
    ],
  };
  studentTypes = [
    { label: 'Shiftee', value: 'SHIFTEE' },
    { label: 'Returnee', value: 'RETURNEE' },
    { label: 'Fresh Graduate', value: 'FRESH_GRADUATE' },
  ];
  yearLevels = [
    { label: 'First Year', value: '1' },
    { label: 'Second Year', value: '2' },
    { label: 'Third Year', value: '3' },
    { label: 'Fourth Year', value: '4' },
  ];
  natureOfResidenceOptions: string[] = [
    'Family Home',
    'Boarding House',
    'Rented Room',
    "Relative's House",
    'Rented Apartment',
    'Dorm',
    'House of Married Sibling',
  ];
  parentsMaritalStatusOptions: string[] = [
    'Married and Living Together',
    'Single Parent',
    'Annulled',
    'Married but Separated',
    'Not married but living together',
  ];
  selectedMaritalStatus: string = '';
  ordinalPositions: string[] = Array.from({ length: 20 }, (_, i) => {
    const number = i + 1;
    const suffix =
      number === 1 ? 'st' : number === 2 ? 'nd' : number === 3 ? 'rd' : 'th';
    return `${number}${suffix} Child`;
  });
  sponsorOptions = [
    { label: 'Parents', value: 'Parents' },
    { label: 'Spouse', value: 'Spouse' },
    { label: 'Sibling(s)', value: 'Siblings' },
    { label: 'Relative', value: 'Relative' },
    {
      label: 'Scholarship, Please Specify',
      value: 'Scholarship',
      placeholder: 'Enter scholarship name',
    },
    {
      label: 'Self-supporting/working student, Please Specify',
      value: 'Self-supporting',
      placeholder: 'Enter how you support yourself',
    },
    {
      label: 'Others, please specify',
      value: 'Others',
      placeholder: 'Enter other source',
    },
  ];
  incomeRanges: string[] = [
    'Less than ₱10,957',
    '₱10,958 - ₱21,193',
    '₱21,194 - ₱43,823',
    '₱43,824 - ₱76,668',
    '₱76,669 - ₱131,483',
    '₱131,484 - ₱219,139',
    '₱219,140 and above',
  ];
yearOfDeathOptions: number[] = Array.from({ length: new Date().getFullYear() - 1899 }, (_, i) => new Date().getFullYear() - i);
  selectedSponsors: string[] = [];
  showInput: { [key: string]: boolean } = {};
  extraDetails: { [key: string]: string } = {};
  selectedMaritalStatuses: string[] = [];
  selectedResidences: string[] = [];
  othersSelected = false;
  othersText = '';
  familySizes: number[] = Array.from({ length: 15 }, (_, i) => i + 1);
  filteredCourses: { course: string; majors: string[] }[] = [];
  availableMajors: string[] = [];
  showMajorField = false;
  academicYear!: string;
  semester!: string;
  constructor(
    private fb: FormBuilder,
    private savingService: SavingService,
    private dialog: MatDialog,
    private snackbar: MatSnackBar,
    private router: Router,
    private http: HttpClient
  ) {}
  ngAfterViewInit(): void {
    if (!sessionStorage.getItem('privacyAccepted')) {
      this.dialog.open(DataPrivacyComponent, {
        width: '500px',
        disableClose: true,
      });
    }
  }
  ngOnInit() {
    this.loadRegions();
    this.initForm();
    const studentRequest = this.studentForm.get('studentRequest');

    studentRequest?.get('campus')?.valueChanges.subscribe((campus) => {
      const courses = this.campusCourses[campus] || [];

      this.filteredCourses = courses.map((item) =>
        typeof item === 'string' ? { course: item, majors: [] } : item
      );

      studentRequest.get('course')?.reset();
      studentRequest.get('major')?.reset();
      this.showMajorField = false;
    });

    studentRequest?.get('course')?.valueChanges.subscribe((selectedCourse) => {
      const match = this.filteredCourses.find(
        (c) => c.course === selectedCourse
      );
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
    this.studentForm
      .get('studentRequest.educationBackground.studentType')
      ?.valueChanges.subscribe((value) => {
        const collegeControls = [
          'collegeType',
          'collegeName',
          'collegeAddress',
          'yearGraduatedCollege',
        ];

        collegeControls.forEach((field) => {
          const control = this.studentForm.get(
            `studentRequest.educationBackground.${field}`
          );
          if (value === 'Transferee') {
            control?.setValidators([Validators.required]);
          } else {
            control?.clearValidators();
            control?.setValue('');
          }
          control?.updateValueAndValidity();
        });
      });
    this.savingService.getEnrollmentDetails(1).subscribe({
      next: (response) => {
        this.studentForm.patchValue({
          studentRequest: {
            academicYear: response.academicYear,
            semester: response.semester,
          },
        });
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  initForm() {
    const indicatorsArray = this.fb.array(
      this.indicatorOptions.map((indicator) => {
        const group = this.fb.group({
          indicatorName: [indicator],
          selected: [false],
          details: [''],
        });

        group
          .get('selected')
          ?.valueChanges.subscribe((isSelected: boolean | null) => {
            const detailsControl = group.get('details');
            if (isSelected) {
              // detailsControl?.setValidators([Validators.required]);
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
        studentType: ['', Validators.required],
        lastSchoolAttended: ['', Validators.required],
        yearLevel: ['', Validators.required],
        campus: ['', Validators.required],
        course: ['', Validators.required],
        major: [''],
        dateAdmitted: ['', Validators.required],
        semester: [''],
        academicYear: [''],
        firstName: ['', Validators.required],
        middleName: [''],
        lastName: ['', Validators.required],
        extensionName: [''],
        birthDate: ['', Validators.required],
        birthPlace: ['', Validators.required],
        gender: ['', Validators.required],
        otherGender: [''],
        placeToStudy: [false],
        roomIsShared: [false],
        discussWithGuidanceCounselor: [false],
        isPwd: [false],
        pwdDetails: ['', Validators.required],
        educationalNeeds: [],
        consultedPsych: [],
        concerns: [],
        height: [null, Validators.required],
        weight: [null, Validators.required],
        civilStatus: ['', Validators.required],
        emailAddress: ['', Validators.email],
        citizenship: ['', Validators.required],
        religion: ['', Validators.required],
        mobileNumber: [
          '',
          [Validators.pattern(/^09\d{9}$/), Validators.maxLength(11)],
        ],
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
          age: ['', Validators.required],
          mobileNumber: [''],
          extension: [''],
          lifeStatus: [''],
          birthPlace: [''],
          religion: [''],
          birthDate: ['', Validators.required],
          citizenship: ['', Validators.required],
          occupation: ['', Validators.required],
          causeOfDeath: ['', Validators.required],
          yearOfDeath: ['', Validators.required],
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
          age: [''],
          mobileNumber: [''],
          birthPlace: [''],
          religion: [''],
          citizenship: ['', Validators.required],
          occupation: ['', Validators.required],
          highestEducationAttainment: ['', Validators.required],
          lifeStatus: ['', Validators.required],
          causeOfDeath: [''],
          yearOfDeath: [''],
          address: this.fb.group({
            street: ['', Validators.required],
            barangay: ['', Validators.required],
            region: ['', Validators.required],
            province: ['', Validators.required],
            city: ['', Validators.required],
            zipCode: ['', Validators.required],
          }),
        }),

        family: this.fb.group({
          familySize: ['', Validators.required],
          monthlyGrossIncome: ['', Validators.required],
          natureOfResidence: ['', Validators.required],
          otherNatureOfResidence: [''],
          parentsMaritalStatus: ['', Validators.required],
          ordinalPosition: ['',Validators.required],
          siblings: this.fb.array([]),
          siblingsCount: [0,Validators.required], // this is optional if you want to trigger the generation
          educationSponsor: ['',Validators.required],
          weeklyAllowance: ['',Validators.required],
          firstGenerationStudent: [false],
          memberOfIndigenousPeople: [false],
          memberOfIndigenousCulturalCommunity: [false],
          indigenousCommunity: [''],
          indigenousCulturalCommunityDetails: [''],
        }),

        educationBackground: this.fb.group({
          studentType: ['', Validators.required],
          elementarySchool: ['', Validators.required],
          elementarySchoolAddress: ['', Validators.required],
          yearGraduatedElementarySchool: ['', Validators.required],
          juniorHighSchool: ['', Validators.required],
          juniorHighSchoolAddress: ['', Validators.required],
          yearGraduatedJuniorHighSchool: ['', Validators.required],
          generalAverageJS: [''],

          seniorHighSchoolType: ['', Validators.required],
          seniorHighSchool: ['', Validators.required],
          seniorHighSchoolAddress: ['', Validators.required],
          yearGraduatedSeniorHighSchool: ['', Validators.required],
          generalAverageSHS: [''],

          collegeType: ['', Validators.required],
          collegeName: ['', Validators.required],
          collegeAddress: ['', Validators.required],
          yearGraduatedCollege: ['', Validators.required],
          generalAverageCollege: [''],

          scholarshipProgram: [''],
          scholarshipOfficeAddress: [''],
          contactNumber: [
            '',
            [
              Validators.pattern(/^09\d{9}$/),
              Validators.minLength(11),
              Validators.maxLength(11),
            ],
          ],
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
          contactNumber: [
            '',
            [
              Validators.pattern(/^09\d{9}$/),
              Validators.minLength(11),
              Validators.maxLength(11),
            ],
          ],
        }),
        equityTargetIndicatorsRequest: indicatorsArray,
      }),
    });
    this.studentForm
      .get('studentRequest.gender')
      ?.valueChanges.subscribe((value) => {
        this.toggleOtherGenderField(value);
      });
  }
  onGenderChange() {
    const selected = this.studentForm.get('studentRequest.gender')?.value;
    this.toggleOtherGenderField(selected);
  }

  toggleOtherGenderField(value: string) {
    const otherGenderControl = this.studentForm.get(
      'studentRequest.otherGender'
    );

    if (value === 'Others') {
      this.isOtherGenderSelected = true;
      otherGenderControl?.setValidators([Validators.required]);
    } else {
      this.isOtherGenderSelected = false;
      otherGenderControl?.clearValidators();
      otherGenderControl?.setValue('');
    }

    otherGenderControl?.updateValueAndValidity();
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
    return this.studentForm.get(
      'studentRequest.equityTargetIndicatorsRequest'
    ) as FormArray;
  }
  formatIndicatorLabel(value: string): string {
    return value
      .replace(/_/g, ' ')
      .toLowerCase()
      .replace(/\b\w/g, (char) => char.toUpperCase());
  }

  onSubmit() {
    // 🔒 Check if the form is invalid first
    if (this.studentForm.invalid) {
      this.studentForm.markAllAsTouched(); // Mark fields as touched to trigger validation messages
      this.snackbar.open(
        'Please fill out all required fields correctly.',
        'Close',
        {
          duration: 4000,
        }
      );
      return;
    }

    // ✅ Process and format the dates
    const rawAdmitionDate = this.studentForm.get(
      'studentRequest.dateAdmitted'
    )?.value;
    const rawPersonalBirthDate = this.studentForm.get(
      'studentRequest.birthDate'
    )?.value;
    const rawFatherBirthDate = this.studentForm.get(
      'studentRequest.father.birthDate'
    )?.value;
    const rawMotherBirthDate = this.studentForm.get(
      'studentRequest.mother.birthDate'
    )?.value;

    const formattedAdmitiondate = rawAdmitionDate
      ? this.formatDateToDDMMYYYY(new Date(rawAdmitionDate))
      : null;
    const formattedPersonalBirthDate = rawPersonalBirthDate
      ? this.formatDateToDDMMYYYY(new Date(rawPersonalBirthDate))
      : null;
    const formattedFatherBirthDate = rawFatherBirthDate
      ? this.formatDateToDDMMYYYY(new Date(rawFatherBirthDate))
      : null;
    const formattedMotherBirthDate = rawMotherBirthDate
      ? this.formatDateToDDMMYYYY(new Date(rawMotherBirthDate))
      : null;

    // ✅ Handle conditional gender value
    const gender = this.studentForm.get('studentRequest.gender')?.value;
    const otherGender = this.studentForm.get(
      'studentRequest.otherGender'
    )?.value;
    const resolvedGender = gender === 'Others' ? otherGender : gender;

    // ✅ Get selected indicators
    const selectedIndicators = this.equityTargetIndicators.value
      .filter((indicator: any) => indicator.selected)
      .map((indicator: any) => ({
        indicatorName: indicator.indicatorName,
        details: indicator.details,
      }));

    // ✅ Prepare the payload
    const payload = {
      ...this.studentForm.value,
      studentRequest: {
        ...this.studentForm.value.studentRequest,
        equityTargetIndicators: selectedIndicators,
        gender: resolvedGender, // 👈 final gender value
        dateAdmitted: formattedAdmitiondate,
        birthDate: formattedPersonalBirthDate,
        father: {
          ...this.studentForm.value.studentRequest.father,
          birthDate: formattedFatherBirthDate,
        },
        mother: {
          ...this.studentForm.value.studentRequest.mother,
          birthDate: formattedMotherBirthDate,
        },
      },
    };

    // ✅ Send data
    this.savingService.saveStudentDetails(payload).subscribe({
      next: (response) => {
        this.snackbar.open('Data Saved Successfully', 'Close', {
          duration: 3000,
        });
        this.studentForm.reset();
        this.router.navigate(['thank-you']);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  formatDateToDDMMYYYY(date: Date): string {
    const dd = String(date.getDate()).padStart(2, '0');
    const mm = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const yyyy = date.getFullYear();

    return `${dd}/${mm}/${yyyy}`;
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
    const civilStatusControl = this.studentForm.get(
      'studentRequest.civilStatus'
    );
    const currentValue = civilStatusControl?.value;

    if (currentValue === value) {
      civilStatusControl?.setValue('');
    } else {
      civilStatusControl?.setValue(value);
    }
  }
  openDataPrivacyModal() {}
  isNumberKey(event: KeyboardEvent): boolean {
    const charCode = event.charCode ? event.charCode : event.keyCode;
    return charCode >= 48 && charCode <= 57;
  }

  preventNonNumericPaste(event: ClipboardEvent): void {
    const pastedInput = event.clipboardData?.getData('text') ?? '';
    if (!/^\d+$/.test(pastedInput)) {
      event.preventDefault();
    }
  }
  // Called when a checkbox is clicked
  onNatureOfResidenceChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const value = input.value;

    if (input.checked) {
      this.selectedResidences.push(value);
    } else {
      this.selectedResidences = this.selectedResidences.filter(
        (item) => item !== value
      );
    }

    this.updateFormControl();
  }

  // Toggle Others field
  toggleOthers(event: Event): void {
    this.othersSelected = (event.target as HTMLInputElement).checked;
    if (!this.othersSelected) {
      this.othersText = '';
    }
    this.updateFormControl();
  }

  // Sync 'Others' input to the form
  updateOthers(): void {
    this.updateFormControl();
  }

  // Update the actual form control value
  updateFormControl(): void {
    const allSelections = [...this.selectedResidences];
    if (this.othersSelected && this.othersText.trim()) {
      allSelections.push(this.othersText.trim());
    }

    this.studentForm
      .get('studentRequest.family.natureOfResidence')
      ?.setValue(allSelections);
    this.studentForm
      .get('studentRequest.family.natureOfResidence')
      ?.markAsTouched();
  }

  // Checkbox change handler
  onMaritalStatusCheckboxChange(status: string) {
    if (this.selectedMaritalStatus === status) {
      // uncheck it
      this.selectedMaritalStatus = '';
      this.studentForm
        .get('studentRequest.family.parentsMaritalStatus')
        ?.setValue('');
    } else {
      // set the selected one and uncheck others
      this.selectedMaritalStatus = status;
      this.studentForm
        .get('studentRequest.family.parentsMaritalStatus')
        ?.setValue(status);
    }
  }

  get siblingsArray(): FormArray {
    return this.studentForm.get('studentRequest.family.siblings') as FormArray;
  }

  // Called when input value changes
  generateSiblingFields(value: string): void {
    const num = parseInt(value, 10);
    const array = this.siblingsArray;
    array.clear();

    if (!isNaN(num) && num > 0) {
      for (let i = 0; i < num; i++) {
        array.push(
          this.fb.group({
            firstName: [''],
            middleName: [''],
            lastName: [''],
            gender: [''],
          })
        );
      }
    }
  }
  onSponsorChange(event: any, option: any): void {
    const checked = event.target.checked;
    const value = option.value;

    if (checked) {
      this.selectedSponsors.push(value);
      if (option.placeholder) this.showInput[value] = true;
    } else {
      this.selectedSponsors = this.selectedSponsors.filter((s) => s !== value);
      this.showInput[value] = false;
      delete this.extraDetails[value];
    }

    this.updateEducationSponsor();
  }

  updateEducationSponsor(): void {
    const parts = this.selectedSponsors.map((value) => {
      if (this.extraDetails[value]) {
        return `${value}: ${this.extraDetails[value]}`;
      }
      return value;
    });

    const sponsorControl = this.studentForm.get(
      'studentRequest.family.educationSponsor'
    );
    sponsorControl?.setValue(parts.join(', '));
  }
  loadRegions() {
    this.http
      .get<any[]>('https://psgc.gitlab.io/api/regions/')
      .subscribe((data) => {
        this.regionOptions = data;
      });
  }

  onRegionChange(event: Event) {
    const regionCode = (event.target as HTMLSelectElement).value;
    this.provinceOptions = [];
    this.cityOptions = [];
    this.barangayOptions = [];

    this.http
      .get<any[]>(`https://psgc.gitlab.io/api/regions/${regionCode}/provinces/`)
      .subscribe((data) => {
        this.provinceOptions = data;
      });
  }

  onProvinceChange(event: Event) {
    const provinceCode = (event.target as HTMLSelectElement).value;
    this.cityOptions = [];
    this.barangayOptions = [];

    this.http
      .get<any[]>(
        `https://psgc.gitlab.io/api/provinces/${provinceCode}/cities-municipalities/`
      )
      .subscribe((data) => {
        this.cityOptions = data;
      });
  }

  onCityChange(event: Event) {
    const cityCode = (event.target as HTMLSelectElement).value;
    this.barangayOptions = [];

    this.http
      .get<any[]>(
        `https://psgc.gitlab.io/api/cities-municipalities/${cityCode}/barangays/`
      )
      .subscribe((data) => {
        this.barangayOptions = data;
      });
  }
}
