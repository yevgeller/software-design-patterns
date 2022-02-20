var SoMuchBetterWithAbstractFactory;
(function (SoMuchBetterWithAbstractFactory) {
    var FireChief = /** @class */ (function () {
        function FireChief() {
        }
        FireChief.prototype.command = function () {
            return "Get those hoses right there right away and gimme water!!";
        };
        return FireChief;
    }());
    var PoliceChief = /** @class */ (function () {
        function PoliceChief() {
        }
        PoliceChief.prototype.command = function () {
            return "I need this solved yesterday!";
        };
        return PoliceChief;
    }());
    var FireLieutenant = /** @class */ (function () {
        function FireLieutenant() {
        }
        FireLieutenant.prototype.manage = function () {
            return "Jeeves, get those two hoses right away! Wooster, turn on the water!";
        };
        return FireLieutenant;
    }());
    var PoliceLieutenant = /** @class */ (function () {
        function PoliceLieutenant() {
        }
        PoliceLieutenant.prototype.manage = function () {
            return "I put my two best men on this case.";
        };
        return PoliceLieutenant;
    }());
    var FireMan = /** @class */ (function () {
        function FireMan() {
        }
        FireMan.prototype.doStuff = function () {
            return "... (grumble-grumble)";
        };
        return FireMan;
    }());
    var PoliceUnitMember = /** @class */ (function () {
        function PoliceUnitMember() {
        }
        PoliceUnitMember.prototype.doStuff = function () {
            return "Pulling out magnifying glass, I'm on the case!";
        };
        return PoliceUnitMember;
    }());
    var FiremenUnitFactory = /** @class */ (function () {
        function FiremenUnitFactory() {
            this.makeChief();
            this.makeLieutenant();
            this.makeUnitMember();
        }
        FiremenUnitFactory.prototype.makeChief = function () {
            this.chief = new FireChief();
            return this.chief;
        };
        FiremenUnitFactory.prototype.makeLieutenant = function () {
            this.lt = new FireLieutenant();
            return this.lt;
        };
        FiremenUnitFactory.prototype.makeUnitMember = function () {
            this.unitMember = new FireMan();
            return this.unitMember;
        };
        return FiremenUnitFactory;
    }());
    var PoliceUnitFactory = /** @class */ (function () {
        function PoliceUnitFactory() {
            this.makeChief();
            this.makeLieutenant();
            this.makeUnitMember();
        }
        PoliceUnitFactory.prototype.makeChief = function () {
            this.chief = new PoliceChief();
            return this.chief;
        };
        PoliceUnitFactory.prototype.makeLieutenant = function () {
            this.lt = new PoliceLieutenant();
            return this.lt;
        };
        PoliceUnitFactory.prototype.makeUnitMember = function () {
            this.unitMember = new PoliceUnitMember();
            return this.unitMember;
        };
        return PoliceUnitFactory;
    }());
    var policeUnit = new PoliceUnitFactory();
    policeUnit.makeChief();
    console.log(policeUnit.chief.command());
    console.log(policeUnit.lt.manage());
    console.log(policeUnit.unitMember.doStuff());
    var fireUnit = new FiremenUnitFactory();
    console.log(fireUnit.chief.command());
    console.log(fireUnit.lt.manage());
    console.log(fireUnit.unitMember.doStuff());
})(SoMuchBetterWithAbstractFactory || (SoMuchBetterWithAbstractFactory = {}));
