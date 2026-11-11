const employeeSchema = {

    type: 'object',

    properties: {

        data: {

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
                    type: 'string'
                },

                terminationId: {
                    type: 'null'
                }

            },

            required: [
                'empNumber',
                'firstName',
                'lastName',
                'employeeId'
            ]

        },

        meta: {
            type: 'array'
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

module.exports = employeeSchema;