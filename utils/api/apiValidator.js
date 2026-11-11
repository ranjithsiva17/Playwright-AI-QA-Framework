const Ajv = require('ajv');

class ApiValidator {

    constructor() {
        this.ajv = new Ajv();
    }

    getValueByPath(object, instancePath) {

        if (!instancePath) {
            return object;
        }

        const pathParts = instancePath
            .split('/')
            .slice(1)
            .map(part => part.replace(/~1/g, '/')
                            .replace(/~0/g, '~'));

        let currentValue = object;

        for (const part of pathParts) {

            if (
                currentValue === null ||
                currentValue === undefined
            ) {
                return undefined;
            }

            currentValue = currentValue[part];
        }

        return currentValue;
    }

    getValueType(value) {

        if (value === null) {
            return 'null';
        }

        if (Array.isArray(value)) {
            return 'array';
        }

        return typeof value;
    }

    validateSchema(schema, response) {

        const validate = this.ajv.compile(schema);

        const isValid = validate(response);

        if (!isValid) {

            const formattedErrors =
                validate.errors
                    .map(error => {

                        if (error.keyword === 'type') {

                            const receivedValue =
                                this.getValueByPath(
                                    response,
                                    error.instancePath
                                );

                            const receivedType =
                                this.getValueType(
                                    receivedValue
                                );

                            return `
Field: ${error.instancePath || 'root'}
Expected Type: ${error.params.type}
Received: ${JSON.stringify(receivedValue)}
Received Type: ${receivedType}
Validation Error: ${error.message}
                            `.trim();
                        }

                        if (error.keyword === 'required') {

                            return `
Object: ${error.instancePath || 'root'}
Missing Required Field: ${error.params.missingProperty}
Validation Error: ${error.message}
                            `.trim();
                        }

                        return `
Field: ${error.instancePath || 'root'}
Validation Rule: ${error.keyword}
Validation Error: ${error.message}
                        `.trim();

                    })
                    .join('\n\n');

            throw new Error(
                `Schema Validation Failed\n\n${formattedErrors}`
            );
        }

        return true;
    }
}

module.exports = ApiValidator;