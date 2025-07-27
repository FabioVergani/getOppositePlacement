import { splitAtFirst } from '../splitAtFirst/splitAtFirst.mjs';

export const oppositeSides = {
	top: 'bottom',
	bottom: 'top',
	right: 'left',
	left: 'right'
};

export const oppositeAlignments = {
	start: 'end',
	end: 'start'
};

/**
 * Returns the opposite placement for a given keyword.
 * @param {string} placement - original
 * @returns {string|undefined} - opposite
 *
 * @example
 * ('top') ➝ 'bottom'
 * ('start') ➝ 'end'
 * ('top-start') ➝ 'bottom-start'
 */
export const getOppositePlacement = placement => {
	if (placement?.indexOf) {
		const [side, alignment] = splitAtFirst(placement, '-');
		if (side) {
			const oppositeSide = oppositeSides[side];
			if (alignment) {
				if (oppositeSide && oppositeAlignments[alignment]) {
					return `${oppositeSide}-${alignment}`;
				}
			} else if (side === placement) {
				if (oppositeSide) {
					return oppositeSide;
				}
				const oppositeAlignmentOnly = oppositeAlignments[side];
				if (oppositeAlignmentOnly) {
					return oppositeAlignmentOnly;
				}
			}
		}
	}
	console.warn('invalid:%o', { placement });
	return undefined;
};
