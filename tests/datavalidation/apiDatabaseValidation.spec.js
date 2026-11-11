const { test, expect } = require('@playwright/test');
const { getEmployeeById } = require('../../database/employeeQueries');

test('API Response should match Database', async () => {

    // Simulated API Response

    const apiResponse = {
        empNumber:1,
        firstName:"Ranjith",
        lastName:"S",
        email:"ranjith@gmail.com",
        department:"QA"
    };

    // Database

    const dbEmployee = await getEmployeeById(apiResponse.empNumber);

    expect(dbEmployee.length).toBe(1);

    expect(apiResponse.firstName).toBe(dbEmployee[0].firstName);

    expect(apiResponse.lastName).toBe(dbEmployee[0].lastName);

    expect(apiResponse.email).toBe(dbEmployee[0].email);

    expect(apiResponse.department).toBe(dbEmployee[0].department);

});