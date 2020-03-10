"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function parseIntNoNaN(val, defaultVal) {
    var v = parseInt(val);
    if (isNaN(v)) {
        return defaultVal;
    }
    return v;
}
exports.parseIntNoNaN = parseIntNoNaN;
function getDerivationPath(derivationStandard, purposeValue, coinValue, accountValue, changeValue) {
    if (derivationStandard === 'sep5') {
        var purpose = parseIntNoNaN(purposeValue, 44);
        var coin = parseIntNoNaN(coinValue, 0);
        var account = parseIntNoNaN(accountValue, 0);
        var path = 'm/';
        path += purpose + "'/";
        path += coin + "'/";
        path += account + "'";
        return path;
    }
    else if (derivationStandard === 'bip44') {
        var purpose = parseIntNoNaN(purposeValue, 44);
        var coin = parseIntNoNaN(coinValue, 0);
        var account = parseIntNoNaN(accountValue, 0);
        var change = parseIntNoNaN(changeValue, 0);
        var path = 'm/';
        path += purpose + "'/";
        path += coin + "'/";
        path += account + "'/";
        path += change;
        return path;
    }
    else if (derivationStandard === 'bip49') {
        var purpose = parseIntNoNaN(purposeValue, 49);
        var coin = parseIntNoNaN(coinValue, 0);
        var account = parseIntNoNaN(accountValue, 0);
        var change = parseIntNoNaN(changeValue, 0);
        var path = 'm/';
        path += purpose + "'/";
        path += coin + "'/";
        path += account + "'/";
        path += change;
        return path;
    }
    else if (derivationStandard === 'bip84') {
        var purpose = parseIntNoNaN(purposeValue, 84);
        var coin = parseIntNoNaN(coinValue, 0);
        var account = parseIntNoNaN(accountValue, 0);
        var change = parseIntNoNaN(changeValue, 0);
        var path = 'm/';
        path += purpose + "'/";
        path += coin + "'/";
        path += account + "'/";
        path += change;
        return path;
    }
    else if (derivationStandard === 'bip32') {
        return null;
    }
    else if (derivationStandard === 'bip141') {
        return null;
    }
    else {
        console.log('Unknown derivation path');
    }
}
exports.getDerivationPath = getDerivationPath;
function findDerivationPathErrors(path) {
    // TODO is not perfect but is better than nothing
    // Inspired by
    // https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki#test-vectors
    // and
    // https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki#extended-keys
    var maxDepth = 255; // TODO verify this!!
    var maxIndexValue = Math.pow(2, 31); // TODO verify this!!
    if (path[0] != 'm') {
        return "First character must be 'm'";
    }
    if (path.length > 1) {
        if (path[1] != '/') {
            return "Separator must be '/'";
        }
        var indexes = path.split('/');
        if (indexes.length > maxDepth) {
            return 'Derivation depth is ' + indexes.length + ', must be less than ' + maxDepth;
        }
        for (var depth = 1; depth < indexes.length; depth++) {
            var index = indexes[depth];
            var invalidChars = index.replace(/^[0-9]+'?$/g, '');
            if (invalidChars.length > 0) {
                return 'Invalid characters ' + invalidChars + ' found at depth ' + depth;
            }
            var indexValue = parseInt(index.replace("'", ''));
            if (isNaN(depth)) {
                return 'Invalid number at depth ' + depth;
            }
            if (indexValue > maxIndexValue) {
                return ('Value of ' + indexValue + ' at depth ' + depth + ' must be less than ' + maxIndexValue);
            }
        }
    }
    return false;
}
exports.findDerivationPathErrors = findDerivationPathErrors;
