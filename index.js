const ensure_function = (v) => {
  if(typeof(v) !== 'function') { throw new Error("Unexpected value of type" + typeof(v) + ": expected a function") }
}

const fswitch = function() {
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

  const fdefault = (v) => {
    the_default = { v }
    return that
  }

  const fdefault_f = (v) => {
    ensure_function(v)
    the_default = { v, exec: true }
    return that
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

  const that = { fcase, fcase_f, fdefault, fdefault_f, exec }

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

    if(k==the_k) {
      return value(then_kv)
    } else {
      return value(else_kv)
    }
  }

  const that = { fthen, fthen_f, felse, felse_f, exec }

  return that
}

module.exports = { fif, fswitch }