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

        busboy.on("file", function (fieldname, file, filename, encoding, mimetype) {

            // path to file upload
            const saveTo = path.join((path.join(__dirname, "/../../../../uploads/" + filename)));
            console.log('saveTo', saveTo);
            file.pipe(fs.createWriteStream(saveTo));
        });

        busboy.on("finish", function () {
            res.status(200).json({ "message": "File uploaded successfully." });
        });
        req.pipe(busboy);

    }
}

module.exports = FileUploader;