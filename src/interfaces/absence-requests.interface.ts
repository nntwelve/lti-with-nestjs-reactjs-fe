export interface AbsenceRequestGetParams {
  keyword?: string;
  limit?: number;
  offset?: number;
}

export enum ABSENCE_REQUEST_STATUS {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}

export interface ICreateAbsenceRequestDto {
  reason: string;
  date: Date;
}

export interface IAbsenceRequest {
  _id: string;

  reason: string;

  course_id: number;

  student_id: number;

  student_name: string;

  status: ABSENCE_REQUEST_STATUS;

  date: Date;

  confirmed_by_id?: number;

  confirmed_by_name?: string;
}

export interface ICreateAbsenceRequestDto {
  reason: string;
  date: Date;
}

export interface IUpdateAbsenceRequestDto {
  is_approve: boolean;
}
