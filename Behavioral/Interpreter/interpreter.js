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
var Context = /** @class */ (function () {
    function Context(input) {
        this.input = input;
        this.output = '';
    }
    return Context;
}());
var Expression = /** @class */ (function () {
    function Expression() {
    }
    Expression.prototype.Interpret = function (context) { };
    return Expression;
}());
var OracleToEFExpression = /** @class */ (function () {
    function OracleToEFExpression() {
    }
    OracleToEFExpression.prototype.Interpret = function (context) {
        var _this = this;
        var properties = context.input.split('\n');
        properties.forEach(function (element) {
            if (element.length > 0) {
                var name_1 = _this.extractName(element);
                var type = _this.extractType(element);
                var specifiedDefaultValue = _this.extractDefaultConstraint(element);
                var determinedDefaultValue = _this.convertDefaultValue(specifiedDefaultValue, type);
                context.output += "public ".concat(type, " ").concat(_this.convertNameToCamelCase(name_1), " { get; set; }");
                if (determinedDefaultValue.length > 0)
                    context.output += " = ".concat(determinedDefaultValue, ";");
                context.output += '\n';
            }
        });
        console.log(context.output);
    };
    OracleToEFExpression.prototype.extractName = function (input) {
        var firstQuote = input.indexOf('"');
        var nextQuote = input.indexOf('"', firstQuote + 1);
        if (firstQuote >= 0 && nextQuote > firstQuote) {
            return input.substring(firstQuote + 1, nextQuote);
        }
        return 'NO_NAME_FOUND';
    };
    OracleToEFExpression.prototype.extractType = function (input) {
        //VARCHAR2(6 BYTE)
        //NUMBER(15,0)
        //CHAR(1 BYTE)
        //TIMESTAMP (6)        
        var firstQuote = input.indexOf('"');
        var nextQuote = input.indexOf('"', firstQuote + 1);
        if (input.indexOf('VARCHAR2') > nextQuote) { //not in the name
            return 'string';
        }
        else if (input.indexOf('NUMBER') > nextQuote) {
            return 'int';
        }
        else if (input.indexOf('CHAR') > nextQuote) {
            return 'bool';
        }
        else if (input.indexOf('TIMESTAMP') > nextQuote) {
            return 'DateTime';
        }
        return 'int';
    };
    OracleToEFExpression.prototype.extractDefaultConstraint = function (input) {
        var defaultConstraintStartsAt = input.indexOf(' DEFAULT ');
        if (defaultConstraintStartsAt < 0)
            return '';
        return input.substring(defaultConstraintStartsAt, input.length);
    };
    OracleToEFExpression.prototype.convertDefaultValue = function (input, determinedDataType) {
        if (determinedDataType === 'string')
            return 'string.Empty';
        if (input.trim().length === 0)
            return '';
        if (determinedDataType === 'int') {
            var ret = input.replace('DEFAULT', '');
            return ret.substring(0, ret.indexOf(','));
        }
        if (determinedDataType === 'bool')
            return input.indexOf('0') >= 0 ? 'false' : 'true';
        return '';
    };
    OracleToEFExpression.prototype.convertNameToCamelCase = function (input) {
        var _this = this;
        var parts = input.split('_');
        parts.forEach(function (p, i) { return parts[i] = _this.camelCaseString(p); });
        return parts.join('_');
    };
    OracleToEFExpression.prototype.camelCaseString = function (input) {
        return input[0] + input.substring(1, input.length).toLocaleLowerCase();
    };
    return OracleToEFExpression;
}());
var c = new Context("\n\"ID\" NUMBER(15,0), \n    \"EMPLOYEE_CODE\" VARCHAR2(6 BYTE), \n    \"COMPANY_ID\" NUMBER(15,0), \n    \"FIRST_NAME\" VARCHAR2(50 BYTE),\n    \"LAST_NAME\" VARCHAR2(50 BYTE),\n    \"IS_ACTIVE\" CHAR(1 BYTE) = '1',\n    \"HIRE_DATE\" TIMESTAMP (6)");
var oef = new OracleToEFExpression();
oef.Interpret(c);
