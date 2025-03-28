import { Injectable } from "@nestjs/common";

@Injectable()
export class EmployeesService {

    async getEmployees() {
        return ['John', 'Alice', 'Bob'];
    }

    async getEmployeeById(id: string) {
        return { id, name: `Employee ${id}` };
    }

    async createEmployee() {
        return { id: 1, name: 'Employee 1' };
    }

    async updateEmployee(id: string, employee: any) {
        return { id, name: `Employee ${id}` };
    }

    async deleteEmployee(id: string) {
        return { id };
    }
}