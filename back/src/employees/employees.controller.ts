import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { EmployeesService } from "./employees.service";

@Controller('employees')
export class EmployeesController {
    constructor( private readonly employeesService: EmployeesService ) {}

    @Get()
    getEmployees() {
        return this.employeesService.getEmployees();
    }

    @Get(':id')
    getEmployeeById(@Param('id') id: string) {
        return this.employeesService.getEmployeeById(id);
    }

    @Post()
    createEmployee() {
        return this.employeesService.createEmployee();
    }

    @Put()
    updateEmployee(@Param('id') id: string, @Body() employee: any) {
        return this.employeesService.updateEmployee(id, employee);
    }

    @Delete(':id')
    deleteEmployee( @Param('id') id: string ) {
        return this.employeesService.deleteEmployee(id);
    }
}