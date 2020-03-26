const aws = require("aws-sdk");
const fs = require("fs");

let secrets;
// only need if-block if you wanna deploy to heroku
if (process.env.NODE_ENV == "production") {
    secrets = process.env; // in prod the secrets are environment variables
} else {
    secrets = require("./utils/secrets"); // in dev they are in secrets.json which is listed in .gitignore
}

//creating aws client
const s3 = new aws.S3({
    accessKeyId: secrets.AWS_KEY,
    secretAccessKey: secrets.AWS_SECRET
});

exports.upload = (req, res, next) => {
    // error handling (specify what to do if there's no file)
    if (!req.file) {
        console.log("no file");
        return res.sendStatus(500);
    }

    const { filename, mimetype, size, path } = req.file;

    const promise = s3
        // putObject = for put requests
        .putObject({
            // information about the file that's gonna be uploaded
            Bucket: "felix-bucket",
            ACL: "public-read",
            Key: filename,
            Body: fs.createReadStream(path),
            ContentType: mimetype,
            ContentLength: size
        })
        .promise();

    promise
        .then(() => {
            console.log("file upload successful!");
            next();
            // if you wanna delete the local copy of the file you've just uploaded
            // fs.unlink(path, () => {});
        })
        .catch(err => {
            console.log("err in put-object / file-upload", err);
            res.sendStatus(500);
        });
};
