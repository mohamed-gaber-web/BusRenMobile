import { environment } from "../../../environments/environment";

export const baseUrl = environment.baseUrl;

// Bus
export const addBusEmployee = `${baseUrl}api/Bus/AddBusEmployee`;
export const getBusesByEmployee = `${baseUrl}api/Bus/GetAllBusesByEmployee`;
export const busDetails = `${baseUrl}api/Bus/GetBusDetailsByEmployee`;
export const workOnBusDone = `${baseUrl}api/WorkOnBus/DoneWorkingOnBus`;
export const workOnBusReport = `${baseUrl}api/WorkOnBus/DoneWorkingOnBus`;
export const getListProblems = `${baseUrl}api/Problem/GetAllProblemsByLanguage`;
export const addReportProblemsBus = `${baseUrl}api/WorkOnBus/ReportProblemOnBus`;

// Attendance
export const checkAttendance = `${baseUrl}api/Attendence/AddCheckIn`;
export const checkoutAttendance = `${baseUrl}api/Attendence/AddCheckOut`;
export const todayAttendance = `${baseUrl}api/Attendence/TodayAttendence`;



// Company
export const getAllCompany = `${baseUrl}api/Company/GetAllCompaniesLookup`;

// Garage
export const getAllGarage = `${baseUrl}api/Garage/GetAllGaragesLookup`;

// Employee Profile
export const getEmployeeByPinCode = `${baseUrl}api/EmployeeProfile/GetEmployeeByPinCode`;
export const getAllEmployee = `${baseUrl}api/EmployeeProfile/GetAllEmployees`;

// Break time
export const takeBreakTime = `${baseUrl}api/BreakTime/TakeBreak`;
export const getBreakTime = `${baseUrl}api/BreakTime/BreakTime`;
export const backToWork = `${baseUrl}api/BreakTime/BackToWork`;

// working on bus
export const workingOnBus = `${baseUrl}api/WorkOnBus/WorkingOnBus`;
