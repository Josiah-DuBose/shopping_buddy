exports.createError = function(code, title, detail) {
    const error = new Error();
    error.statusCode = code;
    error.title = title;
    error.detail = detail;
    return error;
}
