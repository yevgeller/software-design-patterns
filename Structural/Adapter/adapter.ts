class CSVProvider {
    public getData() : string {
        const header = "FirstName,LastName,Age";
        const line1 = "John,Smith,25";
        const line2 = "Mary,Smith,25";
        const line3 = "Jacob,Smith,3";
        const CRLF = "\n";
        const interimResult = [header, line1, line2, line3];
        return interimResult.join(CRLF);
    }
}