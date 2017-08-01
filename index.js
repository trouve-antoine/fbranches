"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var ensure_function = function ensure_function(v) {
  if (typeof v !== 'function') {
    throw new Error("Unexpected value of type" + (typeof v === "undefined" ? "undefined" : _typeof(v)) + ": expected a function");
  }
};

var is_function = function is_function(v) {
  return typeof v === 'function';
};

var fswitch = function fswitch(gk) {
  var the_cases = [];
  var the_default = {};

  var fcase = function fcase(k, v) {
    the_cases.push({ k: k, v: v });
    return that;
  };

  var fcase_f = function fcase_f(k, v) {
    ensure_function(v);
    the_cases.push({ k: k, v: v, exec: true });
    return that;
  };

  var unsafe_case = function unsafe_case(k, v) {
    if (is_function(v)) {
      return fcase_f(k, v);
    } else {
      return fcase(k, v);
    }
  };

  var fdefault = function fdefault(v) {
    the_default = { v: v };
    return that;
  };

  var fdefault_f = function fdefault_f(v) {
    ensure_function(v);
    the_default = { v: v, exec: true };
    return that;
  };

  var unsafe_default = function unsafe_default(v) {
    if (is_function(v)) {
      return fdefault_f(v);
    } else {
      return fdefault(v);
    }
  };

  var exec = function exec(k) {
    for (var _len = arguments.length, otherArgs = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      otherArgs[_key - 1] = arguments[_key];
    }

    var value = function value(kv) {
      if (kv.exec) {
        return kv.v.apply(kv, otherArgs);
      } else {
        return kv.v;
      }
    };

    var cond = function cond(kv) {
      if (k === undefined) {
        return kv.k;
      }
      return kv.k == k;
    };

    for (var i = 0; i < the_cases.length; i++) {
      var kv = the_cases[i];
      if (cond(kv)) {
        return value(kv);
      }
    }

    return value(the_default);
  };

  var _eval = function _eval() {
    for (var _len2 = arguments.length, otherArgs = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      otherArgs[_key2] = arguments[_key2];
    }

    return exec.apply(undefined, [gk].concat(otherArgs));
  };

  var that = {
    /* safe versions */
    fcase: fcase, fcase_f: fcase_f, fdefault: fdefault, fdefault_f: fdefault_f, exec: exec,
    /* user-friendly versions */
    case: unsafe_case, default: unsafe_default, eval: _eval
  };

  return that;
};

var fif = function fif(gk) {
  var then_kv = {};
  var else_kv = {};

  var fthen = function fthen(v) {
    then_kv = { v: v };
    return that;
  };

  var fthen_f = function fthen_f(v) {
    ensure_function(v);
    then_kv = { v: v, exec: true };
    return that;
  };

  var unsafe_then = function unsafe_then(v) {
    if (is_function(v)) {
      return fthen_f(v);
    } else {
      return fthen(v);
    }
  };

  var felse = function felse(v) {
    else_kv = { v: v };
    return that;
  };

  var felse_f = function felse_f(v) {
    ensure_function(v);
    else_kv = { v: v, exec: true };
    return that;
  };

  var unsafe_else = function unsafe_else(v) {
    if (is_function(v)) {
      return felse_f(v);
    } else {
      return felse(v);
    }
  };

  var exec = function exec(k) {
    for (var _len3 = arguments.length, otherArgs = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
      otherArgs[_key3 - 1] = arguments[_key3];
    }

    var shouldTakeBranch = gk ? k == gk : k;
    return exec_eval.apply(undefined, [shouldTakeBranch].concat(otherArgs));
  };

  var _eval = function _eval() {
    for (var _len4 = arguments.length, otherArgs = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
      otherArgs[_key4] = arguments[_key4];
    }

    return exec_eval.apply(undefined, [gk].concat(otherArgs));
  };

  var exec_eval = function exec_eval(shouldTakeBranch) {
    for (var _len5 = arguments.length, otherArgs = Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
      otherArgs[_key5 - 1] = arguments[_key5];
    }

    var value = function value(kv) {
      if (kv.exec) {
        return kv.v.apply(kv, otherArgs);
      } else {
        return kv.v;
      }
    };

    if (shouldTakeBranch) {
      return value(then_kv);
    } else {
      return value(else_kv);
    }
  };

  var that = {
    /* safe, original versions */
    fthen: fthen, fthen_f: fthen_f, felse: felse, felse_f: felse_f, exec: exec,
    /* user-friendly versions */
    eval: _eval, then: unsafe_then, else: unsafe_else
  };

  return that;
};

module.exports = { fif: fif, fswitch: fswitch };
