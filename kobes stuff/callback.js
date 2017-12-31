function query(q, callback) {
    // Run q in DB
    var success = true;
    if (success) {
        callback(null, rows);
    } else {
        callback(new Error('not success'));
    }
}