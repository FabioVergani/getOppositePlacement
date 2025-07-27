import { oppositeSides, getOppositePlacement } from './getOppositePlacement.mjs';

describe('getOppositePlacement', () => {
	describe('core behavior', () => {
		describe('sides', () => {
			[
				['left', 'right'],
				['right', 'left'],
				['bottom', 'top'],
				['top', 'bottom']
			].forEach(([input, expected]) => {
				const titler = `"${input}" ⇄ "${expected}"`;
				test(titler, () => {
					const result = getOppositePlacement(input);
					expect(result).toBe(expected);
				});
				test(titler, () => {
					const result = oppositeSides[input];
					expect(result).toBe(expected);
				});
			});
		});
		describe('sides-alignments', () => {
			[
				['top-start', 'bottom-start'],
				['top-end', 'bottom-end'],
				['bottom-start', 'top-start'],
				['bottom-end', 'top-end'],
				['left-start', 'right-start'],
				['left-end', 'right-end'],
				['right-start', 'left-start'],
				['right-end', 'left-end']
			].forEach(([input, expected]) => {
				test(`"${input}" ⇄ "${expected}"`, () => {
					const result = getOppositePlacement(input);
					expect(result).toBe(expected);
				});
			});
		});
		describe('alignments', () => {
			[
				['start', 'end'],
				['end', 'start']
			].forEach(([input, expected]) => {
				test(`"${input}" ⇄ "${expected}"`, () => {
					const result = getOppositePlacement(input);
					expect(result).toBe(expected);
				});
			});
		});
	});
	describe('invalid inputs', () => {
		let consoleWarnSpy;
		beforeAll(() => {
			consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation();
		});
		afterEach(() => {
			consoleWarnSpy.mockClear();
		});
		afterAll(() => {
			consoleWarnSpy.mockRestore();
		});
		describe('trigger warn and return "undefined"', () => {
			const titler = '"%s" ➝ 𝘶𝘯𝘥𝘦𝘧𝘪𝘯𝘦𝘥';
			const tester = input => {
				const result = getOppositePlacement(input);
				expect(result).toBeUndefined();
				expect(consoleWarnSpy).toHaveBeenCalledWith('invalid:%o', { placement: input });
			};
			describe('falsy', () => {
				test.each(['', 0, null, false, undefined])(titler, tester);
			});
			describe('non-string', () => {
				test.each([
					123,
					{},
					[],
					[1, 2, 3],
					Symbol() //,...
				])(titler, tester);
			});
			describe('unknown', () => {
				test.each([
					'side',
					'side-start',
					'-end',
					'esotic',
					'£' //,...
				])(titler, tester);
			});
			describe('wrong', () => {
				test.each([
					'top-EnD',
					'TOP-End',
					'Top-end',
					'TOP' //,...
				])(titler, tester);
			});
			describe('malformed', () => {
				test.each([
					'-',
					'-start',
					'--',
					'-end',
					'left-',
					'top--' //,...
				])(titler, tester);
			});
			describe('non-standard suffixes', () => {
				test.each([
					'left-@special#',
					'top-123',
					'right-value',
					'left-multi-dash',
					'top-custom-alignment',
					'right-start-custom-extra'
					//,...
				])(titler, tester);
			});
		});
		describe('throws error', () => {
			test('when input is truthy but not a string', () => {
				try {
					// noinspection JSCheckFunctionSignatures
					getOppositePlacement({ indexOf: true });
				} catch (error) {
					expect(error).toBeInstanceOf(Error);
					expect(error.message.endsWith('.indexOf is not a function')).toBe(true);
				}
			});
		});
	});
});
