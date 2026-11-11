const { test, expect } = require('@playwright/test');
const { getEmployeeById } = require('../../database/employeeQueries');

test('Validate Employee from Database', async () => {

    const employee = await getEmployeeById(1);

    console.log(employee);

    expect(employee.length).toBe(1);

    expect(employee[0].empNumber).toBe(1);
    expect(employee[0].firstName).toBe("Ranjith");
    expect(employee[0].lastName).toBe("S");
    expect(employee[0].department).toBe("QA");

});