const spicedPg = require("spiced-pg");

const db = spicedPg("postgres://postgres:postgres@localhost:5432/spleeter");

exports.addFile = function(url, filename) {
    return db.query(
        `INSERT INTO files (file, filename) VALUES
        ($1, $2)
        RETURNING *`,
        [url || null, filename || null]
    );
};
