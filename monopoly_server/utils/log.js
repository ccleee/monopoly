var util = require('util');

// log level
var LEVEL = {
    ALL: Infinity,
    INFO: 3,
    WARN: 2,
    ERROR: 1,
    NONE: -Infinity
};

// log color
var COLOR = {
    RESET: '\u001b[0m',
    INFO: '\u001b[32m', // green
    WARN: '\u001b[33m', // yellow
    ERROR: '\u001b[31m' // red
}

// global log level
var globalLevel = LEVEL.ALL;

// whether log output should be colored
var coloredOutput = true;

function setLevel(level) {
    globalLevel = level;
}

function setColoredOutput(bool) {
    coloredOutput = bool;
}

function info() {
    if (LEVEL.INFO <= globalLevel) {
        log(LEVEL.INFO, util.format.apply(this, arguments));
    }
}

function warn() {
    if (LEVEL.WARN <= globalLevel) {
        log(LEVEL.WARN, util.format.apply(this, arguments));
    }
}

function error() {
    if (LEVEL.ERROR <= globalLevel) {
        log(LEVEL.ERROR, util.format.apply(this, arguments));
    }
}

function newPrepareStackTrace(error, structuredStack) {
    return structuredStack;
}

// must not be called directly due to stack trace
function log(level, message) {
    // get call stack and find the caller
    var oldPrepareStackTrace = Error.prepareStackTrace;
    Error.prepareStackTrace = newPrepareStackTrace;
    var structuredStack = new Error().stack;
    Error.prepareStackTrace = oldPrepareStackTrace;
    var caller = structuredStack[2];

    var lineSep = process.platform == 'win32' ? '\\' : '/';
    var fileNameSplited = caller.getFileName().split(lineSep);
    var fileName = fileNameSplited[fileNameSplited.length - 1];
    var lineNumber = caller.getLineNumber();
    var columnNumber = caller.getColumnNumber();
    // function name may be empty if it is a global call
    // var functionName = caller.getFunctionName();
    var levelString;
    switch (level) {
        case LEVEL.INFO:
            levelString = '[INFO]';
            break;
        case LEVEL.WARN:
            levelString = '[WARN]';
            break;
        case LEVEL.ERROR:
            levelString = '[ERROR]';
            break;
        default:
            levelString = '[]';
            break;
    }
    var output = util.format('%s %s(%d,%d) %s',
        levelString, fileName, lineNumber, columnNumber, message
    );
    if (!coloredOutput) {
        process.stdout.write(output + '\n');
    } else {
        switch (level) {
            case LEVEL.INFO:
                process.stdout.write(COLOR.INFO + output + COLOR.RESET + '\n');
                break;
            case LEVEL.WARN:
                process.stdout.write(COLOR.WARN + output + COLOR.RESET + '\n');
                break;
            case LEVEL.ERROR:
                process.stdout.write(COLOR.ERROR + output + COLOR.RESET + '\n');
                break;
            default:
                break;
        }
    }
}

module.exports = {
    info: info,
    warn: warn,
    error: error,
    LEVEL: LEVEL,
    setLevel: setLevel,
    setColoredOutput: setColoredOutput
};
