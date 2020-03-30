const express = require("express");
const app = express();
const compression = require("compression");
const cookieSession = require("cookie-session");
const csurf = require("csurf");
const secrets = require("./utils/secrets.json");
const s3 = require("./s3.js");
const { s3Url } = require("./config.json");
const db = require("./database.js");
const util = require("util");
const exec = util.promisify(require("child_process").exec);

////////////////////////////////////////////////
///// file upload boilerplate //////////////////
////////////////////////////////////////////////

const multer = require("multer");
const uidSafe = require("uid-safe");
const path = require("path");

const diskStorage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, __dirname + "/uploads");
    },
    // create unique identifier so you can upload one image multiple times without throwing errors
    filename: function(req, file, callback) {
        uidSafe(24)
            .then(function(uid) {
                callback(null, uid + path.extname(file.originalname));
            })
            .catch(err => {
                console.log("error in file upload: ", err);
            });
    }
});

const uploader = multer({
    storage: diskStorage,
    limits: {
        // 2 MB
        fileSize: 2097152
    }
});

////////////////////////////////////////////////
///// file upload boilerplate end //////////////
////////////////////////////////////////////////

app.use(compression());

app.use(express.static("./public"));

app.use(
    express.urlencoded({
        extended: false
    })
);

app.use(express.json());

app.use(
    cookieSession({
        secret: secrets["cookieSessionSecret"],
        maxAge: 1000 * 60 * 60 * 24 * 7 * 6
    })
);

app.use(csurf());

app.use(function(req, res, next) {
    res.locals.csrfToken = req.csrfToken();
    next();
});

app.use(function(req, res, next) {
    res.set("x-frame-option", "deny");
    res.cookie("mytoken", req.csrfToken());
    next();
});

if (process.env.NODE_ENV != "production") {
    app.use(
        "/bundle.js",
        require("http-proxy-middleware")({
            target: "http://localhost:8081/"
        })
    );
} else {
    app.use("/bundle.js", (req, res) => res.sendFile(`${__dirname}/bundle.js`));
}

////////////////////////////////////////////////////////////////////////////////
///////////////// post route for upload ////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
// multer stuff and then the function that's defined in s3.js
app.post("/upload", uploader.single("file"), s3.upload, (req, res) => {
    console.log("input: ", req.body);
    let url = s3Url + req.file.filename;
    console.log("url: ", url);
    if (req.file) {
        db.addFile(url, req.file.filename)
            .then(({ rows }) => {
                console.log("file was inserted");
                console.log("rows: ", rows);
                res.json({
                    rows
                });
            })
            .catch(err => {
                console.log("err insert failed", err);
            });
    } else {
        res.json({
            success: false
        });
    }
});
////////////////////////////////////////////////////////////////////////////////
///////////////// post route for upload ////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

// more routes here

app.get("/twostems/:filename", async function(req, res) {
    // console.log("req.params: ", req.params);
    let { filename } = req.params;
    const { stdout, stderr } = await exec(
        `spleeter separate -i uploads/${filename} -p spleeter:2stems -o public/output`
    );
    console.log("stdout: ", stdout);
    console.error("stderr: ", stderr);
    let directory = filename.slice(0, -4);
    res.json({
        directory,
        success: true
    });
});

app.get("/fourstems/:filename", async function(req, res) {
    // console.log("req.params: ", req.params);
    let { filename } = req.params;
    const { stdout, stderr } = await exec(
        `spleeter separate -i uploads/${filename} -p spleeter:4stems -o public/output`
    );
    console.log("stdout: ", stdout);
    console.error("stderr: ", stderr);
    let directory = filename.slice(0, -4);
    res.json({
        directory,
        success: true
    });
});

// more routes here

//////// DON'T TOUCH ///////////////////////////////////////////////////////////
app.get("*", function(req, res) {
    res.sendFile(__dirname + "/index.html");
});
//////// DON'T TOUCH ///////////////////////////////////////////////////////////

app.listen(8080, function() {
    console.log("I'm listening.");
});
