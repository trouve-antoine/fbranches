const ensure_function = (v) => {
  if(typeof(v) !== 'function') { throw new Error("Unexpected value of type" + typeof(v) + ": expected a function") }
}

const is_function = (v) => {
  return typeof(v) === 'function'
}

const fswitch = function(gk) {
  const the_cases = []
  let the_default = {}

  const fcase = (k, v) => {
    the_cases.push({ k, v })
    return that
  }

  const fcase_f = (k, v) => {
    ensure_function(v)
    the_cases.push({ k, v, exec: true })
    return that
  }

  const unsafe_case = (k,v) => {
    if(is_function(v)) {
      return fcase_f(k,v)
    } else {
      return fcase(k,v)
    }
  }

  const fdefault = (v) => {
    the_default = { v }
    return that
  }

  const fdefault_f = (v) => {
    ensure_function(v)
    the_default = { v, exec: true }
    return that
  }

  const unsafe_default = (v) => {
    if(is_function(v)) {
      return fdefault_f(v)
    } else {
      return fdefault(v)
    }
  }

  const exec = (k, ...otherArgs) => {
    const value = (kv) => {
      if(kv.exec) { return kv.v(...otherArgs) }
      else { return kv.v }
    }

    for(let i=0; i<the_cases.length; i++) {
      const kv = the_cases[i]
      if(kv.k == k) { return value(kv) }
    }

    return value(the_default)
  }

  const eval = (...otherArgs) => {
    return exec(gk, ...otherArgs)
  }

  const that = {
    /* safe versions */
    fcase, fcase_f, fdefault, fdefault_f, exec,
    /* user-friendly versions */
    case: unsafe_case, default: unsafe_default, eval
  }

  return that
}

const fif = function(k) {
  const the_k = k
  let then_kv = {}
  let else_kv = {}

  const fthen = (v) => {
    then_kv = { v }
    return that
  }

  const fthen_f = (v) => {
    ensure_function(v)
    then_kv = { v, exec: true }
    return that
  }

  const felse = (v) => {
    else_kv = { v }
    return that
  }

  const felse_f = (v) => {
    ensure_function(v)
    else_kv = { v, exec: true }
    return that
  }

  const exec = (k, ...otherArgs) => {
    const value = (kv) => {
      if(kv.exec) { return kv.v(...otherArgs) }
      else { return kv.v }
    }

		const shouldTakeBranch = the_k ? (k==the_k) : k

    if(shouldTakeBranch) {
      return value(then_kv)
    } else {
      return value(else_kv)
    }
  }

  const that = { fthen, fthen_f, felse, felse_f, exec }

  return that
}

module.exports = { fif, fswitch }
