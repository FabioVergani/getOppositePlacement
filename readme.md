
# getOppositePlacement

A lightweight JavaScript utility to get the opposite placement for a given positioning keyword,<br>
such as `top`, `start`, or `top-start`. 

Useful for UI positioning logic, such as tooltips, popovers, or menus.

## Supported Placements

**Sides**:
  - top
  - bottom
  - left
  - right

**Alignments**:
  - start
  - end

**Combinations**:
  - side-alignment (e.g.: top-start, right-end)

## Testing
Tests cover inputs:
<pre>
  Valid:
    -   Sides
    -   Alignments
    -   Side-alignment combinations
</pre>
<pre>
  Invalid:
    -   Falsy values
    -   Non-string inputs
    -   Unknown keywords
    -   Case-sensitive mismatches
    -   Malformed inputs
    -   Non-standard suffixes
</pre>


## Usage

Import the `getOppositePlacement` function and use it to get the opposite of a positioning keyword.

```javascript
import { getOppositePlacement } from 'get-opposite-placement';

// Single side
console.log(getOppositePlacement('top')); // 'bottom'
console.log(getOppositePlacement('left')); // 'right'

// Alignment
console.log(getOppositePlacement('start')); // 'end'
console.log(getOppositePlacement('end')); // 'start'

// Side-alignment combination
console.log(getOppositePlacement('top-start')); // 'bottom-start'
console.log(getOppositePlacement('right-end')); // 'left-end'

// Invalid input (throws error)
try {
  getOppositePlacement('lorem-ipsum');
} catch (error) {
  console.error(error.message);
}
```
## API

### getOppositePlacement
> #### Parameters
> -   placement (string): The original placement (e.g., top, start, top-start).
> 
> #### Returns
> -   string: The opposite placement (e.g., bottom, end, bottom-start).
> 
> #### Throws
> -   Error: If the placement is invalid (e.g., empty, non-string, unknown, or malformed).

### oppositeSides
> An object mapping sides to their opposites.

### oppositeAlignments
> An object mapping alignments to their opposites.
