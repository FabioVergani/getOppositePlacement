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
		const oppositePlacement = oppositeSides[placement] || oppositeAlignments[placement];
		if (oppositePlacement) {
			return oppositePlacement;
		}
		const [side, alignment] = splitAtFirst(placement, '-');
		if (side) {
			const oppositeSide = oppositeSides[side];
			if (alignment) {
				if (oppositeSide && oppositeAlignments[alignment]) {
					return `${oppositeSide}-${alignment}`;
				}
			}
		}
	}
	console.warn('invalid:%o', { placement });
};
