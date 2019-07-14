const path = require('path');
const XLSX = require('xlsx');

class Person {
    constructor(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
    }
    readExcel() {
        const filePath = path.join((path.join(__dirname, "/../../../../uploads/", 'ListofInnerPages.ods')));
        console.log(`${filePath}`);
        const workbook = XLSX.readFile(filePath);
        console.log('workbook', workbook);
        const sheet_name_list = workbook.SheetNames;
        console.log(XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]));
        const excel = {}
        sheet_name_list.forEach(sheetName => {
            excel[sheetName] = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
        });
        return excel;
    }
}

module.exports = Person;