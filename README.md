# Baseboard Math

Baseboard and trim arithmetic. The 126 ft of trim in 8 ft pieces takes 16 pieces, leaving 2 ft.

## Named constants

One: 12 inches in a foot.

## What it computes

- **The pieces truth** - pieces: the trim run (1 to 100000 ft) divided by the piece length (1 to 50 ft), rounded up, with the feet left.
- **The runs truth** - pieces for equal runs: each piece (1 to 1200 inches) is cut into as many whole runs (1 to 1200 inches) as fit, and the run count (1 to 100000) is divided by that, rounded up, with the inches left.
- **The nails truth** - nailing points: the run in inches over the spacing (1 to 48 inches), rounded up, plus 1 for the far end, times the nails a point (1 to 20).
- **The cost truth** - cost: the pieces (1 to 100000) at their price (0.01 to 10000 dollars).

## Boundary

Arithmetic only. Counting applied as written. It has not seen any room and does not know the corners, the miters, the waste habits or the nailing practice, and it gives no verdict that an order is enough or that a job will fit. Every other number is the owner's own entry.

## Files

- `index.html` - landing page.
- `app.html` - the interactive calculator.
- `engine.js` - the arithmetic (exact integers, half-up on display).
- `oracle.py` - the Python mirror that generates `expected.json`.
- `test.js` - compares every engine output against `expected.json`.
- `expected.json` - the golden answers.

## Test

```
python3 oracle.py
node test.js
```

Live: https://ilanis-agent.github.io/baseboardmath/
Repo: https://github.com/iLanis-agent/baseboardmath
