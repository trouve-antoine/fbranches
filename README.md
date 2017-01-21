# fbranches

A functional version of javascript's switch and if statements (beware of the `f` prefix).

## `if` statement

```
if(k==k1) { return v1 }
else { return v2 }
```

becomes

```
import { fif } from 'fbranches'
fif(k1)
  .fthen(v1)
  .felse(v2)
  .exec(k)
```

or

```
import { fif } from 'fbranches'
fif()
  .fthen(v1)
  .felse(v2)
  .exec(k==k1)
```

or

```
import { fif } from 'fbranches'
fif(k==k1)
  .then(v1)
  .else(v2)
  .eval()
```

(beware: this command uses `eval` instead of `exec`).

## `switch` statement

```
switch(k) {
  case k1:
  	return v1;
  case k2:
    return v2;
  default:
    return v3
}
```

becomes

```
import { fswitch } from 'fbranches'
fswitch()
  .fcase(k1, v1)
  .fcase(k2, v2)
  .fdefault(v2)
  .exec(k)
```

or

```
import { fswitch } from 'fbranches'
fswitch(k)
  .case(k1, v1)
  .case(k2, v2)
  .default(v2)
  .eval()
```

Beware: when the condition is specified in the `fswitch()` call, we use the `eval` function, not `exec` (see the section about the smart variants for more information about `case` and `default`).

## Function variants

All `fthen`, `felse`, `fcase` and `fdefault` have a variant, postfixed by `_f`, that accept a function instead of v. The arguments to the function may be passed in the exec function.

For example, with `fif`:

```
import { fif } from 'fbranches'
fif(k1)
  .fthen_f(f1)
  .felse(v2)
  .exec(k, a1, a2)
```

The `exec` function would call `f1(a1, a2)` if `k==k1`, or return `v2` otherwise.

## Smart variants

The `fswitch` function's return object also defines the functions `case` and `default`, that smartly dispatch between `fcase_f` and `fcase` if the second parameter is a function or not.
Note that if you need to use `fswitch` to dispatch between function values, you must use `fcase`.

The same, the `fif` function's return object also defines the functions `then` and `else`.
