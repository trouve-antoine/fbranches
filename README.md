# fbranches
functional version of javascript's switch and if statements

## `if` statement

```
if(k==k1) { return v1 }
else { return v2 }
```

becomes

```
import { fif } from 'fbranches'
fif(k1)
  .then(v1)
  .else(v2)
  .exec(k)
```

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

## Function variants

All `fthen`, `felse`, `fcase` and `fdefault` have a variant, postfixed by `_f`, that accept a function instead of v. The arguments to the function may be passed in the exec function.

For example, with `fif`:

```
import { fif } from 'fbranches'
fif(k1)
  .then_f(f1)
  .else(v2)
  .exec(k, a1, a2)
```

The `exec` function would call `f1(a1, a2)` if `k==k1`, or return `v2` otherwise.