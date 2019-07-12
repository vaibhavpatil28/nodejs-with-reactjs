const express = require('express');
const FileUploader = require('../controller/file-upload');

const app = express();
const router = express.Router();

// Uploading a Single File
router.post('/createProject', (req, res, next) => {
    FileUploader.upload(req, res, next);
});
module.exports = router;