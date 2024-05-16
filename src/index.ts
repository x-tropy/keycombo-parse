export default function keyCombo(s: string, e: KeyboardEvent) {
	const keyCombo = parseKeyComboEvent(e)
	const expectedKeyCombo = parseKeyComboString(s)
	return deepEqual(keyCombo, expectedKeyCombo)
}

enum Modifier {
	ctrl = "ctrl",
	shift = "shift",
	alt = "alt",
	meta = "meta"
}

type KeyCombo = {
	contentKey: string
	modifierKeys: Array<Modifier>
}

function parseKeyComboEvent(e: KeyboardEvent): KeyCombo {
	const modifierKeys = []
	if (e.ctrlKey) {
		modifierKeys.push(Modifier.ctrl)
	}
	if (e.shiftKey) {
		modifierKeys.push(Modifier.shift)
	}
	if (e.altKey) {
		modifierKeys.push(Modifier.alt)
	}
	if (e.metaKey) {
		modifierKeys.push(Modifier.meta)
	}
	const contentKey = contentKeyMapper(e.code)
	return { contentKey, modifierKeys }
}

function contentKeyMapper(code: string): string {
	code = code.toLowerCase()
	switch (code) {
		case "keyq":
		case "q":
			return "q"
		case "keyw":
		case "w":
			return "w"
		case "keye":
		case "e":
			return "e"
		case "keyr":
		case "r":
			return "r"
		case "keyt":
		case "t":
			return "t"
		case "keyy":
		case "y":
			return "y"
		case "keyu":
		case "u":
			return "u"
		case "keyi":
		case "i":
			return "i"
		case "keyo":
		case "o":
			return "o"
		case "keyp":
		case "p":
			return "p"
		case "keya":
		case "a":
			return "a"
		case "keys":
		case "s":
			return "s"
		case "keyd":
		case "d":
			return "d"
		case "keyf":
		case "f":
			return "f"
		case "keyg":
		case "g":
			return "g"
		case "keyh":
		case "h":
			return "h"
		case "keyj":
		case "j":
			return "j"
		case "keyk":
		case "k":
			return "k"
		case "keyl":
		case "l":
			return "l"
		case "keyz":
		case "z":
			return "z"
		case "keyx":
		case "x":
			return "x"
		case "keyc":
		case "c":
			return "c"
		case "keyv":
		case "v":
			return "v"
		case "keyb":
		case "b":
			return "b"
		case "keyn":
		case "n":
			return "n"
		case "keym":
		case "m":
			return "m"
		case "digit0":
		case "0":
		case ")":
			return "0"
		case "digit1":
		case "1":
		case "!":
			return "1"
		case "digit2":
		case "2":
		case "@":
			return "2"
		case "digit3":
		case "3":
		case "#":
			return "3"
		case "digit4":
		case "4":
		case "$":
			return "4"
		case "digit5":
		case "5":
		case "%":
			return "5"
		case "digit6":
		case "6":
		case "^":
			return "6"
		case "digit7":
		case "7":
		case "&":
			return "7"
		case "digit8":
		case "8":
		case "*":
			return "8"
		case "digit9":
		case "9":
		case "(":
			return "9"
		case "bracketleft":
		case "{":
			return "["
		case "bracketright":
		case "}":
			return "]"
		case "minus":
		case "_":
			return "-"
		case "equal":
		case "+":
			return "="
		case "semicolon":
		case ":":
			return ";"
		case "comma":
		case "<":
			return ","
		case "period":
		case ">":
			return "."
		case "quote":
		case '"':
			return "'"
		case "backquote":
		case "~":
			return "`"
		case "backslash":
		case "|":
			return "\\"
		case "slash":
		case "?":
			return "/"
		case "space":
		case "␣":
			return "space"
		case "tab":
		case "⇥":
			return "tab"
		case "escape":
		case "esc":
			return "esc"
		case "backspace":
		case "⌫":
		case "delete":
		case "del":
			return "del"
		case "enter":
		case "return":
		case "⏎":
		case "↵":
		case "↩":
			return "enter"
		case "arrowup":
		case "↑":
		case "up":
			return "up"
		case "arrowdown":
		case "↓":
		case "down":
			return "down"
		case "arrowleft":
		case "←":
		case "left":
			return "left"
		case "arrowright":
		case "→":
		case "right":
			return "right"
		case "capslock":
		case "caps":
		case "cap":
		case "⇪":
			return "cap"
		default:
			return "unknown"
	}
}

function parseKeyComboString(s: string): KeyCombo {
	s = s.toLowerCase()
	const parts = s.split("+")
	const modifierKeys = parts[0]
		.split(" ")
		.filter(p => p !== "")
		.map(modifier => {
			switch (modifier) {
				case "ctrl":
				case "control":
				case "⌃":
					return Modifier.ctrl
				case "shift":
				case "⇧":
					return Modifier.shift
				case "alt":
				case "option":
				case "⌥":
					return Modifier.alt
				case "cmd":
				case "command":
				case "meta":
				case "⌘":
					return Modifier.meta
				default:
					throw new Error(`Unknown modifier: ${modifier}`)
			}
		})
	const contentKey = contentKeyMapper(parts[1].trim())
	return { contentKey, modifierKeys }
}

function deepEqual(a: KeyCombo, b: KeyCombo): boolean {
	return a.contentKey === b.contentKey && deepEqualArray(a.modifierKeys, b.modifierKeys)
}

function deepEqualArray(a: Array<Modifier>, b: Array<Modifier>): boolean {
	if (a.length !== b.length) {
		return false
	}
	a = a.sort()
	b = b.sort()
	for (let i = 0; i < a.length; i++) {
		if (a[i] !== b[i]) {
			return false
		}
	}
	return true
}

// console.log(keyCombo("⇧ ⌃ ⌥ ⌘ + Q", { ctrlKey: true, shiftKey: true, altKey: true, metaKey: true, code: "KeyQ" } as KeyboardEvent))
