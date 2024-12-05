"use strict";
// class ClientError extends Error {
//     status: number;
//     constructor(message: string, status: number = 400) {
//       super(message);
//       this.name = 'ClientError';
//       this.status = status;
//       // Maintain proper stack trace in V8 (only in Node.js)
//       if (Error.captureStackTrace) {
//         Error.captureStackTrace(this, ClientError);
//       }
//     }
// }
class ServerError extends Error {
    constructor(message, status = 500) {
        super(message);
        this.name = 'ServerError';
        this.status = status;
        
        // Maintain proper stack trace in V8 (only in Node.js)
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, ServerError);
        }
    }
}
module.exports = {
    //ClientError,
    ServerError
};
