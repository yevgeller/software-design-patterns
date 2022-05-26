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
        var properties = context.input.split(',');
        properties.forEach(function (element) {
            var name = _this.extractName(element);
            var type = _this.extractType(element);
            var defaultValue = _this.extractDefaultConstraint(element);
        });
    };
    OracleToEFExpression.prototype.extractName = function (input) {
        var firstQuote = input.indexOf('"');
        var nextQuote = input.indexOf('"', firstQuote + 1);
        if (firstQuote >= 0 && nextQuote > firstQuote) {
            return input.substring(firstQuote, input.length - nextQuote);
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
            return null;
        return '';
    };
    return OracleToEFExpression;
}());
