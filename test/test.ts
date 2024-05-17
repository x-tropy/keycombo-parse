import keyCombo from "../src/index"

test("should be the same", () => {
	const result = keyCombo("⇧ ⌥ ⌘ + H", {
		shiftKey: true,
		altKey: true,
		metaKey: true,
		code: "KeyH"
	} as KeyboardEvent)
	expect(result).toBe(true)
})

test("should be the same", () => {
	const result = keyCombo("⇧ ⌥ ⌘ + g", {
		shiftKey: true,
		altKey: true,
		metaKey: true,
		code: "KeyG"
	} as KeyboardEvent)
	expect(result).toBe(true)
})

test("should not be the same", () => {
	const result = keyCombo("⇧ ⌘ + g", {
		shiftKey: true,
		altKey: false,
		metaKey: true,
		ctrlKey: true,
		code: "KeyG"
	} as KeyboardEvent)
	expect(result).toBe(false)
})
