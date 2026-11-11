const employeesListSchema = {

    type: 'object',

    properties: {

        data: {

            type: 'array',

            items: {

                type: 'object',

                properties: {

                    empNumber: {
                        type: 'number'
                    },

                    lastName: {
                        type: 'string'
                    },

                    firstName: {
                        type: 'string'
                    },

                    middleName: {
                        type: 'string'
                    },

                    employeeId: {
                        type: ['string', 'null']
                    },

                    terminationId: {
                        type: 'null'
                    }

                },

                required: [
                    'empNumber',
                    'lastName',
                    'firstName',
                    'middleName',
                    'employeeId',
                    'terminationId'
                ]

            }

        },

        meta: {

            type: 'object',

            properties: {

                total: {
                    type: 'number'
                }

            },

            required: [
                'total'
            ]

        },

        rels: {
            type: 'array'
        }

    },

    required: [
        'data',
        'meta',
        'rels'
    ]

};

module.exports = employeesListSchema;