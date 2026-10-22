const fs = require("fs");
eval(fs.readFileSync("engine.js", "utf8"));
const exp = JSON.parse(fs.readFileSync("expected.json", "utf8"));
const fns = { pieces: piecesTruth, cuts: cutsTruth, nails: nailsTruth, cost: costTruth };
let fail = 0;
for (const c of exp.cases) {
  const got = fns[c.fn](...c.args);
  if (got !== c.expect) { fail++; console.log("MISMATCH", c.fn, c.args, "\n got:", got, "\n exp:", c.expect); }
}
const ERRS = ["the trim run must be from 1 to 100000 ft with no decimal places",
  "the piece length must be from 1 to 50 ft with no decimal places",
  "the run count must be from 1 to 100000 with no decimal places",
  "the run length must be from 1 to 1200 inches with no decimal places",
  "the piece length must be from 1 to 1200 inches with no decimal places",
  "a run must not be longer than a piece",
  "the spacing must be from 1 to 48 inches with no decimal places",
  "the nails a point must be from 1 to 20 with no decimal places",
  "the piece count must be from 1 to 100000 with no decimal places",
  "the price must be from 0.01 to 10000 dollars with at most two decimal places"];
for (const [fn, args] of exp.errors) {
  let threw = null;
  try { fns[fn](...args); } catch (e) { threw = e.message; }
  if (!threw || !ERRS.includes(threw)) { fail++; console.log("ERRCASE FAIL", fn, args, "->", threw); }
}
console.log(fail ? `${fail} FAILURES` : "all green");
process.exit(fail ? 1 : 0);
