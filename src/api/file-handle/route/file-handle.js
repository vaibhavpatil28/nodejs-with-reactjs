const express = require('express');
const fileUploader = require('../controller/file-upload');
const ExcelReader = require('../controller/excel-reader');

const app = express();
const router = express.Router();

// Uploading a Single File
router.post('/upload', (req, res, next) => {
    fileUploader.upload(req, res, next);
});
router.get('/excelRead', (req, res)=> {
    const excelData = new ExcelReader().readExcel();
    res.status(200).json({ 
        "message": "Excel Read successfully.",
        'response': excelData
 });

})
module.exports = router;