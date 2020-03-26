const spicedPg = require("spiced-pg");

const db = spicedPg(
    "postgres://postgres:postgres@localhost:5432/social-network"
);

exports.addFile = function(url) {
    return db.query(
        `INSERT INTO files (file) VALUES
        ($1)
        RETURNING *`,
        [url || null]
    );
};
