/*
"ID" NUMBER(15,0), 
    "CODE" VARCHAR2(6 BYTE), 
    "CMPNY_ID" NUMBER(15,0), 
    "SITE_NAME" VARCHAR2(50 BYTE), 
    "USR_LIMIT" NUMBER(15,0), 
    "BRAND_ID" NUMBER(15,0), 
    "IS_MAINTENANCE_MODE" CHAR(1 BYTE), 
    "IS_MANAGER_SITE" CHAR(1 BYTE), 
    "IS_SUP_DENIED" CHAR(1 BYTE), 
    "CREATED_TMS" TIMESTAMP (6), 
    "CREATED_USR_ID" NUMBER(15,0), 
    "UPDATED_TMS" TIMESTAMP (6), 
    "UPDATED_USR_ID" NUMBER(15,0), 
    "THEME_ID" NUMBER(15,0) DEFAULT NULL, 
    "IS_MANAGER_X" CHAR(1 BYTE), 
    "CTX_CLIENT_ID" NUMBER(15,0), 
    "IS_SENSITIVE" CHAR(1 BYTE), 
    "ASSIGNED_BYTES" NUMBER(18,0) DEFAULT 0, 
    "USED_BYTES" NUMBER(18,0) DEFAULT 0, 
    "EMAIL_NOTE_TEXT" VARCHAR2(4000 BYTE), 
    "EMAIL_NOTE_RICH" VARCHAR2(4000 BYTE), 
    "EMAIL_SUBJECT" VARCHAR2(4000 BYTE), 
    "IS_SUSPEND_WARNING" CHAR(1 CHAR) DEFAULT '0', 
    "IS_CLOSED_ACCESS_ALLOWED" CHAR(1 CHAR) DEFAULT '0', 
    "SOCIAL_RCP_ID" NUMBER(15,0) DEFAULT 1, 
    "BRANDING_ID" NUMBER(15,0), 
    "GG_DATETIME" TIMESTAMP (6), 
    "NS_CUSTOMER_ID" NUMBER(15,0), 
    "IS_MSTR_USED" CHAR(1 CHAR) DEFAULT '1', 
    "MFA_OPTION_TYPE" NUMBER(15,0) DEFAULT 0, 
    "ENFORCE_USER_LIMIT" CHAR(1 CHAR) DEFAULT '0'
    */

class Context {
    input: string;
    output: string;
    constructor(input: string) {
        this.input = input;
    }
}

abstract class Expression {
    Interpret(context: Context): void { }
}

class OracleToEFExpression implements Expression {
    Interpret(context: Context): void {
        let properties = context.input.split(',');

        properties.forEach(element => {
            let name = this.extractName(element)
            let type = this.extractType(element)
            let defaultValue = this.extractDefaultConstraint(element)

            //commit, print out each line
            //figure out eslint setting on the other computer
            //set it only on this project
        });
    }

    extractName(input: string): string {
        let firstQuote = input.indexOf('"');
        let nextQuote = input.indexOf('"', firstQuote + 1)
        if (firstQuote >= 0 && nextQuote > firstQuote) {
            return input.substring(firstQuote, input.length - nextQuote)
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
            return null;
        return input.substring(defaultConstraintStartsAt, input.length);
    }
}