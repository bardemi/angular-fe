/* eslint-disable no-magic-numbers */

export enum HttpStatus {
    OK = 200,
    NOT_FOUND = 404,
    BAD_REQUEST = 400,
    FORBIDDEN = 403,
    UNAUTHORIZED = 401,
    CLIENT_CLOSED_REQUEST = 499,
    METHOD_NOT_ALLOWED = 405,
    REQUEST_TIMEOUT = 406,
    PROXY_AUTHENTIFICATION_REQUIRED = 407,
}
