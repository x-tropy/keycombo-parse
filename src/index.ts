export default function isKeyComboMatch(s: string, e: KeyboardEvent) {
	const keyCombo = parseKeyComboEvent(e)
	const expectedKeyCombo = parseKeyComboString(s)
	return deepEqual(keyCombo, expectedKeyCombo)
}

function capitalize(s: string): string {
	return s.charAt(0).toUpperCase() + s.slice(1)
}

export function standardKeyCombo(original: string | KeyboardEvent): string {
	let kc: KeyCombo
	if (typeof original === "string") {
		kc = parseKeyComboString(original)
	} else {
		kc = parseKeyComboEvent(original)
	}
	let result = ""
	if (kc.modifierKeys.includes("shift")) result += "⇧ "
	if (kc.modifierKeys.includes("ctrl")) result += "⌃ "
	if (kc.modifierKeys.includes("alt")) result += "⌥ "
	if (kc.modifierKeys.includes("meta")) result += "⌘ + "
	result += capitalize(kc.contentKey)
	if (kc.repeat) result += " " + capitalize(kc.contentKey)
	return result
}

type Modifier = "ctrl" | "shift" | "alt" | "meta"

type KeyCombo = {
	contentKey: string
	modifierKeys: Array<Modifier>
	repeat?: boolean
}

export function parseKeyComboEvent(e: KeyboardEvent): KeyCombo {
	const modifierKeys: Array<Modifier> = []
	if (e.ctrlKey) {
		modifierKeys.push("ctrl")
	}
	if (e.shiftKey) {
		modifierKeys.push("shift")
	}
	if (e.altKey) {
		modifierKeys.push("alt")
	}
	if (e.metaKey) {
		modifierKeys.push("meta")
	}
	const contentKey = contentKeyMapper(e.code)
	const repeat = e.repeat ? true : false
	return { contentKey, modifierKeys, repeat }
}

function contentKeyMapper(code: string): string {
	if (code.split(" ").length > 1) {
		throw new Error("Invalid code")
	}
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
		case "[":
			return "["
		case "bracketright":
		case "}":
		case "]":
			return "]"
		case "minus":
		case "_":
		case "-":
			return "-"
		case "equal":
		case "+":
		case "=":
			return "+"
		case "semicolon":
		case ":":
		case ";":
			return ";"
		case "comma":
		case ",":
		case "<":
			return "<"
		case "period":
		case ".":
		case ">":
			return ">"
		case "quote":
		case "'":
		case '"':
			return '"'
		case "backquote":
		case "~":
		case "`":
			return "`"
		case "backslash":
		case "\\":
		case "|":
			return "|"
		case "slash":
		case "?":
		case "/":
			return "?"
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
			return "delete"
		case "enter":
		case "return":
		case "⏎":
		case "↵":
		case "↩":
			return "enter"
		case "arrowup":
		case "↑":
		case "up":
			return "↑"
		case "arrowdown":
		case "↓":
		case "down":
			return "↓"
		case "arrowleft":
		case "←":
		case "left":
			return "←"
		case "arrowright":
		case "→":
		case "right":
			return "→"
		case "capslock":
		case "caps":
		case "cap":
		case "⇪":
			return "capsLock"
		default:
			return "unknown"
	}
}

export function parseKeyComboString(s: string): KeyCombo {
	s = s.toLowerCase()

	if (s.indexOf("+") !== -1) {
		const parts = s.split("+")
		const modifierKeys = extractModifiers(parts[0])
		const rawContentKey = parts[1].trim()
		let contentKey

		// detect repeat
		let repeat = false
		if (rawContentKey.length === 2 && rawContentKey[0] === rawContentKey[1]) {
			repeat = true
			contentKey = contentKeyMapper(rawContentKey[0])
		} else {
			contentKey = contentKeyMapper(rawContentKey)
		}
		return { contentKey, modifierKeys, repeat }
	}

	if (allModifiers.every(m => s.indexOf(m) === -1)) {
		// No modifiers
		return { contentKey: contentKeyMapper(s), modifierKeys: [] }
	} else {
		// Only modifiers
		const modifierKeys = extractModifiers(s)
		return { contentKey: "", modifierKeys }
	}
}

function extractModifiers(s: string): Array<Modifier> {
	return s
		.split(" ")
		.filter(p => p !== "")
		.map(modifier => {
			switch (modifier) {
				case "ctrl":
				case "control":
				case "⌃":
					return "ctrl"
				case "shift":
				case "⇧":
					return "shift"
				case "alt":
				case "option":
				case "⌥":
					return "alt"
				case "cmd":
				case "command":
				case "meta":
				case "⌘":
					return "meta"
				default:
					throw new Error(`Unknown modifier: ${modifier}`)
			}
		})
}

const allModifiers = ["ctrl", "control", "⌃", "shift", "⇧", "alt", "option", "⌥", "cmd", "command", "meta", "⌘"]

function deepEqual(a: KeyCombo, b: KeyCombo): boolean {
	return a.contentKey === b.contentKey && deepEqualArray(a.modifierKeys, b.modifierKeys) && a.repeat === b.repeat
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

// console.log(keyCombo("⇧ ⌃ ⌥ meta + Q", { ctrlKey: true, shiftKey: true, altKey: true, metaKey: false, code: "KeyQ" } as KeyboardEvent))
