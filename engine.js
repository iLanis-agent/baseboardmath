// Baseboard Math engine: the pieces a run of baseboard or trim takes, the runs a piece yields, the nails along a run, and the cost. Exact integers, half-up on display only. Named constant: 12 inches in a foot. Every other number is the owner's own entry.
function _i(t, err, digits, lo, hi) {
  t = typeof t === "string" ? t.trim() : "";
  if (!new RegExp("^[0-9]{1," + digits + "}$").test(t)) throw new Error(err);
  var v = parseInt(t, 10);
  if (v < lo || v > hi) throw new Error(err);
  return v;
}
function _p(t, err, intDigits, places, lo, hi) {
  t = typeof t === "string" ? t.trim() : "";
  var m = new RegExp("^([0-9]{1," + intDigits + "})(?:\\.([0-9]{1," + places + "}))?$").exec(t);
  if (!m) throw new Error(err);
  var v = parseInt(m[1], 10) * Math.pow(10, places) + (m[2] ? parseInt(m[2].padEnd(places, "0"), 10) : 0);
  if (v < lo || v > hi) throw new Error(err);
  return v;
}
var _RUN = "the trim run must be from 1 to 100000 ft with no decimal places";
var _STK = "the piece length must be from 1 to 50 ft with no decimal places";
var _NR = "the run count must be from 1 to 100000 with no decimal places";
var _LEN = "the run length must be from 1 to 1200 inches with no decimal places";
var _PIN = "the piece length must be from 1 to 1200 inches with no decimal places";
var _LONG = "a run must not be longer than a piece";
var _SP = "the spacing must be from 1 to 48 inches with no decimal places";
var _PP = "the nails a point must be from 1 to 20 with no decimal places";
var _NP = "the piece count must be from 1 to 100000 with no decimal places";
var _PRICE = "the price must be from 0.01 to 10000 dollars with at most two decimal places";
function _dec(v, places) {
  var base = Math.pow(10, places);
  var s = String(Math.floor(v / base)), f = String(v % base).padStart(places, "0").replace(/0+$/, "");
  return f ? s + "." + f : s;
}
function _money(c) { return Math.floor(c / 100) + "." + String(c % 100).padStart(2, "0"); }
function _pl(n, one, many) { return n + (n === 1 ? one : many); }

function piecesTruth(run, stock) {
  var r = _i(run, _RUN, 6, 1, 100000), s = _i(stock, _STK, 2, 1, 50);
  var n = Math.floor((r + s - 1) / s), spare = n * s - r;
  return "The " + r + " ft of trim in " + s + " ft pieces takes " + _pl(n, " piece", " pieces") + ", leaving " + spare + " ft.";
}
function cutsTruth(count, len, stock) {
  var n = _i(count, _NR, 6, 1, 100000), l = _i(len, _LEN, 4, 1, 1200), s = _i(stock, _PIN, 4, 1, 1200);
  if (l > s) throw new Error(_LONG);
  var per = Math.floor(s / l), k = Math.floor((n + per - 1) / per), left = k * s - n * l;
  return "The " + _pl(n, " run", " runs") + " of " + l + " inches from " + s + " inch pieces take " + _pl(k, " piece", " pieces") + ", " + _pl(per, " run", " runs") + " from each piece, leaving " + left + " inches.";
}
function nailsTruth(run, spacing, per) {
  var r = _i(run, _RUN, 6, 1, 100000), sp = _i(spacing, _SP, 2, 1, 48), pp = _i(per, _PP, 2, 1, 20);
  var pts = Math.floor((r * 12 + sp - 1) / sp) + 1;
  return "The " + r + " ft of trim at " + sp + " inches takes " + _pl(pts, " nailing point", " nailing points") + ", " + _pl(pp, " nail", " nails") + " each, " + pts * pp + " nails in all.";
}
function costTruth(pieces, price) {
  var n = _i(pieces, _NP, 6, 1, 100000), p = _p(price, _PRICE, 5, 2, 1, 1000000);
  return "The " + _pl(n, " piece", " pieces") + " at $" + _dec(p, 2) + " cost $" + _money(n * p) + ".";
}
