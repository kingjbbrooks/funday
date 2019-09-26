import { Employee } from './employee';
import { Project } from './project';

export class Company {
  _id: string;
  name: string;
  owner: Employee;
  deparments: [string];
  employees: [Employee];
  projects: [Project];
}
