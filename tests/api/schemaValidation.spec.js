const { test } = require('@playwright/test');

const ApiValidator =
    require('../../utils/api/apiValidator');

const employeeSchema =
    require('../../utils/api/schemas/employeeSchema');


test(
    'Schema validation should fail when required field is missing',
    async () => {

        // Intentionally invalid response
        const invalidResponse = {

            data: {

                empNumber: 100,

                // firstName intentionally missing

                lastName: 'Engineer',

                employeeId: 'AU100'
            },

            meta: [],

            rels: []
        };

        const apiValidator =
            new ApiValidator();

        apiValidator.validateSchema(
            employeeSchema,
            invalidResponse
        );

    }
);