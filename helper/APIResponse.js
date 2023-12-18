function Response() {
    this.code = 200;
    this.success = true;
    this.message = "";
    this.data = [];
    this.err = [];
}

function ResponseGet() {
    this.code = 200;
    this.success = true;
    this.message = "";
    this.data = {};
    this.err = {};
    this.pagination = {};
}


function successGetResponse(message, payload, err, pagination) {
    let response = new ResponseGet();
    response.code = 200;
    response.success = true;
    response.message = message;
    response.data = payload;
    response.err = err;
    response.pagination = pagination
    return response;

}


function successCreateResponse(message, payload, err) {
    let res = new Response();
    res.code = 201;
    res.success = true;
    res.message = message;
    res.data = payload;
    res.err = err;
    return res;
}


function successResponse(message, payload, err) {
    let res = new Response();
    res.code = 200;
    res.success = true;
    res.message = message;
    res.data = payload;
    res.err = err
    return res;
}


function failResponse(message, payload, err) {
    let res = new Response();
    res.code = 400;
    res.success = false;
    res.message = message;
    res.data = payload;
    res.err = err;
    return res;
}


function resObj(code, message) {
    let resObj = {
        "code": code,
        "msg": message,
    };

    return resObj;
}

module.exports = {
    successResponse,
    failResponse,
    successCreateResponse,
    successGetResponse,
    resObj
}