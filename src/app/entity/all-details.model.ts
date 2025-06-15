export interface Address {
  street: string;
  barangay: string;
  region: string;
  province: string;
  city: string;
  zipCode: string;
}

export interface EducationBackground {
  elementarySchool: string;
  elementarySchoolAddress: string;
  yearGraduatedElementarySchool: number;

  juniorHighSchool: string;
  juniorHighSchoolAddress: string;
  yearGraduatedJuniorHighSchool: number;

  seniorHighSchoolType: string; // Public or Private
  seniorHighSchool: string;
  seniorHighSchoolAddress: string;
  yearGraduatedSeniorHighSchool: number;

  collegeType: string; // Public or Private
  collegeAddress: string;
  yearGraduatedCollege: number;

  graduateSchool: string;
  graduateSchoolAddress: string;
  yearGraduatedGraduateSchool: number;

  scholarshipProgram: string;
  scholarshipOfficeAddress: string;
  contactNumber: string;
}

export interface EmergencyContact {
  firstName: string;
  middleName: string;
  lastName: string;
  address: Address;
  contactNumber: string;
}

export enum Indicators {
  FIRST_GENERATION_COLLEGE_STUDENT = 'FIRST_GENERATION_COLLEGE_STUDENT',
  FOUR_Ps_BENEFICIARY = 'FOUR_Ps_BENEFICIARY',
  SOLO_PARENT = 'SOLO_PARENT',
  RAISED_BY_A_SINGLE_OR_SOLO_PARENT = 'RAISED_BY_A_SINGLE_OR_SOLO_PARENT',
  ORPHAN = 'ORPHAN',
  PERSON_WITH_DISABILITY = 'PERSON_WITH_DISABILITY',
  LIVING_IN_A_GEOGRAPHICALLY_ISOLATED_AND_DISADVANTAGED_AREA = 'LIVING_IN_A_GEOGRAPHICALLY_ISOLATED_AND_DISADVANTAGED_AREA',
  MEMBER_OF_INDIGENOUS_PEOPLE = 'MEMBER_OF_INDIGENOUS_PEOPLE',
  BELONGS_TO_A_FAMILY_OF_SUBSISTENCE_FARMERS_OR_FISHERFOLKS = 'BELONGS_TO_A_FAMILY_OF_SUBSISTENCE_FARMERS_OR_FISHERFOLKS',
  BELONGS_TO_A_FAMILY_OF_REBEL_RETURNEES = 'BELONGS_TO_A_FAMILY_OF_REBEL_RETURNEES'
}

export interface EquityTargetIndicators {
  indicatorName: Indicators;
  details: string;
}

export interface Family {
  familySize: number;
  monthlyGrossIncome: number;

  firstGenerationStudent: boolean;
  memberOfIndigenousPeople: boolean;
  memberOfIndigenousCulturalCommunity: boolean;
  indigenousCommunity: string;
}

export interface Father {
  lastName: string;
  firstName: string;
  middleName: string;
  extension: string;
  birthDate: Date;
  citizenship: string;
  occupation: string;
  address: Address;
  highestEducationAttainment: string;
}

export interface Mother {
  lastName: string;
  firstName: string;
  middleName: string;
  occupation: string;
  address: Address;
  birthDate: Date;
  citizenship: string;
  highestEducationAttainment: string;
}

export interface Student {
  lrn: string;
  campus: string;
  course: string;
  dateAdmitted: Date;
  semester: string;
  academicYear: string;

  firstName: string;
  middleName: string;
  lastName: string;
  extensionName: string;

  birthDate: Date;
  birthPlace: string;
  gender: string;
  civilStatus: string;
  emailAddress: string;
  citizenship: string;
  religion: string;
  mobileNumber: string;

  address: Address;
  father: Father;
  mother: Mother;
  family: Family;
  educationBackground: EducationBackground;
  emergencyContact: EmergencyContact;
  equityTargetIndicators: EquityTargetIndicators[];
}

export interface AllDetailsRequest {
  student: Student;
  equityTargetIndicators: EquityTargetIndicators[];
}