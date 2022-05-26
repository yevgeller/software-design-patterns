class Context {
    input: string;
    output: string;
    constructor(input: string) {
        this.input = input;
        this.output = '';
    }
}

abstract class Expression {
    Interpret(context: Context): void { }
}

class OracleToEFExpression implements Expression {
    Interpret(context: Context): void {
        let properties = context.input.split('\n');
        properties.forEach(element => {
            if (element.length > 0) {
                let name = this.extractName(element);
                let type = this.extractType(element)
                let specifiedDefaultValue = this.extractDefaultConstraint(element);
                let determinedDefaultValue = this.convertDefaultValue(specifiedDefaultValue, type);
                context.output += `public ${type} ${this.convertNameToCamelCase(name)} { get; set; }`;
                if (determinedDefaultValue.length > 0)
                    context.output += ` = ${determinedDefaultValue};`
                context.output += '\n'
            }
        });

        console.log(context.output)
    }

    extractName(input: string): string {
        let firstQuote = input.indexOf('"');
        let nextQuote = input.indexOf('"', firstQuote + 1)
        if (firstQuote >= 0 && nextQuote > firstQuote) {
            return input.substring(firstQuote + 1, nextQuote)
        }
        return 'NO_NAME_FOUND'
    }

    extractType(input: string): string {
        //VARCHAR2(6 BYTE)
        //NUMBER(15,0)
        //CHAR(1 BYTE)
        //TIMESTAMP (6)        
        let firstQuote = input.indexOf('"');
        let nextQuote = input.indexOf('"', firstQuote + 1)
        if (input.indexOf('VARCHAR2') > nextQuote) { //not in the name
            return 'string'
        } else if (input.indexOf('NUMBER') > nextQuote) {
            return 'int'
        } else if (input.indexOf('CHAR') > nextQuote) {
            return 'bool'
        } else if (input.indexOf('TIMESTAMP') > nextQuote) {
            return 'DateTime'
        }
        return 'int'
    }

    extractDefaultConstraint(input: string): string {
        let defaultConstraintStartsAt = input.indexOf(' DEFAULT ');
        if (defaultConstraintStartsAt < 0)
            return '';
        return input.substring(defaultConstraintStartsAt, input.length);
    }

    convertDefaultValue(input: string, determinedDataType: string): string {

        if (determinedDataType === 'string')
            return 'string.Empty'
        if (input.trim().length === 0)
            return '';
        if (determinedDataType === 'int') {
            let ret = input.replace('DEFAULT', '');
            return ret.substring(0, ret.indexOf(','))
        }
        if (determinedDataType === 'bool')
            return input.indexOf('0') >= 0 ? 'false' : 'true';

        return '';
    }

    convertNameToCamelCase(input: string): string {
        let parts = input.split('_');
        parts.forEach((p, i) => parts[i] = this.camelCaseString(p));
        return parts.join('_');
    }

    camelCaseString(input: string): string {
        return input[0] + input.substring(1, input.length).toLocaleLowerCase()
    }
}

let c = new Context(`
"ID" NUMBER(15,0), 
    "EMPLOYEE_CODE" VARCHAR2(6 BYTE), 
    "COMPANY_ID" NUMBER(15,0), 
    "FIRST_NAME" VARCHAR2(50 BYTE),
    "LAST_NAME" VARCHAR2(50 BYTE),
    "IS_ACTIVE" CHAR(1 BYTE) = '1',
    "HIRE_DATE" TIMESTAMP (6)`);


let oef = new OracleToEFExpression();
oef.Interpret(c)