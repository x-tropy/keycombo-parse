# How to use

When `alt` key is involved in to key combination, the value of `e.key` becomes strange. For example, hitting `⌥ + A`, you'll get `å` as `e.key` value. The `e.code` value is accurate in this case: `KeyA`, but a bit lengthy.

While registering a keyboard shorcut event, devolopers want something like this:

```js
import kc from "keycombo-parse"

document.addEventListener("keydown", e => {
	if (kc("⇧ ⌥ ⌘ + C", e)) {
		// shortcut activated
	}
})
```

The key combination string: `⇧ ⌥ ⌘ + C`, is quite succinct, but might be hard to type for those not using a text expander such as espanso. In this package we also support key combo string in plain text: `shift alt meta + C`.

A few things to note:

- We use space as separator, so spaces are necessary
- We recognize `alt` rather than `option`
- We recognize `meta` rather than `command`
- We recognize `ctrl` rather than `control`
- We avoid differentiating modifier keys on the right side, so `ShiftLeft` and `ShiftRight` are treated as the same
- Case-insensitive, so `Alt` and `alt` are both acceptable
- Key combination should always end with a non-modifier key, for example: `+ C`, `+ 1`, or `+ [`
