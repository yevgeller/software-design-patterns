namespace TemplateMethod {
  abstract class Email {
    compose(): void {
      this.salutation();
      this.summary();
      this.discussion();
      this.figures();
      this.closingStatements();
      this.signature();
      this.contactInfo();
    }
    protected abstract salutation(): void; //needs to be overwritten in child class
    protected summary(): void {}
    protected abstract discussion(): void; //needs to be overwritten in child class
    protected figures(): void {}
    protected closingStatements(): void {}
    protected signature(): void {}
    protected contactInfo(): void {}
  }

  class EmailToCEO extends Email {
    salutation(): void {
      console.log("Dear Mr. CEO");
    }
    summary(): void {
      console.log("Everything is great");
    }
    discussion(): void {
      console.log(
        "Since you have been our CEO and making such great decisions, our profits increased."
      );
    }
    figures(): void {
      console.log(
        "Here are three tables that show how much more money we are making."
      );
    }
    closingStatements(): void {
      console.log("In summary, all is well");
    }
    signature(): void {
      console.log("Sincerely yours, your best worker.");
    }
    contactInfo(): void {
      console.log("You can contact me at 555-5555");
    }
  }

  class EmailToFriend extends Email {
    salutation(): void {
      console.log("yo!");
    }
    discussion(): void {
      console.log("let's have a party!");
    }
    contactInfo(): void {
      console.log;
    }
  }
  console.log("Email to CEO:");
  let c = new EmailToCEO();
  c.compose();
  console.log("\nEmail to a friend:");
  let f = new EmailToFriend();
  f.compose();
}
