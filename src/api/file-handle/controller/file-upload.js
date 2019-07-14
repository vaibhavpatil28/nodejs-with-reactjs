const Busboy = require('busboy');
const path = require('path');
const fs = require('fs');

/**
 * Code for file uploads.
 *
 * @class FileUploader
 */
const FileUploader = {

    // method for file upload to server.
    upload: function (req, res, next) {

        const busboy = Busboy({ headers: req.headers });

        busboy.on('file', function (fieldname, file, filename, encoding, mimetype) {

            // path to file upload
            const uploadsDirectory = path.join(__dirname, '/../../../../uploads/');
            const filesDirectory = path.join(uploadsDirectory,'/files/');
            // ensure uploads directory exists
            fs.existsSync(uploadsDirectory) || fs.mkdirSync(uploadsDirectory);
            // ensure files directory exists
            fs.existsSync(filesDirectory) || fs.mkdirSync(filesDirectory);
            const saveTo = path.join((path.join(filesDirectory + filename)));
            console.log('saveTo', saveTo);
            checkIsFileAlreadyExist(saveTo);
            file.pipe(fs.createWriteStream(saveTo));
        });

        busboy.on('finish', function () {
            res.status(200).json({ 'message': 'File uploaded successfully.' });
        });
        req.pipe(busboy);

    }
}
function checkIsFileAlreadyExist(path) {
    const fs = require('fs');
    fs.access(path, fs.F_OK, (err) => {
        if (err) {
            console.error('File Access', err);
            return
        }
        console.log('File Exist **************************************');

        //file exists
    })
}

module.exports = FileUploader;