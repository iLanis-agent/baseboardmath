import json, random
def dec(n, p=2):
    b = 10**p
    w, f = divmod(n, b)
    fs = str(f).zfill(p).rstrip("0")
    return str(w) + "." + fs if fs else str(w)
def money(c): return str(c//100) + "." + str(c%100).zfill(2)
def pl(n, one, many): return f"{n}" + (one if n == 1 else many)
def pieces(r, s):
    n = -(-r//s)
    return f"The {r} ft of trim in {s} ft pieces takes {pl(n,' piece',' pieces')}, leaving {n*s-r} ft."
def cuts(n, l, s):
    per = s//l; k = -(-n//per)
    return f"The {pl(n,' run',' runs')} of {l} inches from {s} inch pieces take {pl(k,' piece',' pieces')}, {pl(per,' run',' runs')} from each piece, leaving {k*s-n*l} inches."
def nails(r, sp, pp):
    pts = -(-(r*12)//sp) + 1
    return f"The {r} ft of trim at {sp} inches takes {pl(pts,' nailing point',' nailing points')}, {pl(pp,' nail',' nails')} each, {pts*pp} nails in all."
def cost(n, p):
    return f"The {pl(n,' piece',' pieces')} at ${dec(p)} cost ${money(n*p)}."
random.seed(761)
R=random.randint
cases = [
 dict(fn="pieces", args=["126","8"], expect=pieces(126,8)),
 dict(fn="cuts", args=["5","36","96"], expect=cuts(5,36,96)),
 dict(fn="nails", args=["126","16","2"], expect=nails(126,16,2)),
 dict(fn="cost", args=["16","7.25"], expect=cost(16,725)),
 dict(fn="pieces", args=["1","1"], expect=pieces(1,1)),
 dict(fn="cuts", args=["1","96","96"], expect=cuts(1,96,96)),
]
for _ in range(25):
    r,s=R(1,100000),R(1,50); cases.append(dict(fn="pieces", args=[str(r),str(s)], expect=pieces(r,s)))
for _ in range(25):
    s=R(1,1200); l=R(1,s); n=R(1,100000); cases.append(dict(fn="cuts", args=[str(n),str(l),str(s)], expect=cuts(n,l,s)))
for _ in range(25):
    r,sp,pp=R(1,100000),R(1,48),R(1,20); cases.append(dict(fn="nails", args=[str(r),str(sp),str(pp)], expect=nails(r,sp,pp)))
for _ in range(15):
    n,p=R(1,100000),R(1,1000000); cases.append(dict(fn="cost", args=[str(n),dec(p)], expect=cost(n,p)))
errs=[["pieces",["0","8"]],["pieces",["100001","8"]],["pieces",["126","0"]],["pieces",["126","51"]],["cuts",["0","36","96"]],["cuts",["5","0","96"]],["cuts",["5","36","0"]],["cuts",["5","97","96"]],["cuts",["5","36","1201"]],
 ["nails",["0","16","2"]],["nails",["126","0","2"]],["nails",["126","49","2"]],["nails",["126","16","0"]],["nails",["126","16","21"]],["cost",["0","7.25"]],["cost",["16","0"]],["cost",["16","10000.01"]]]
json.dump(dict(cases=cases, errors=errs), open("expected.json","w"), indent=1)
print(len(cases),"cases,",len(errs),"errcases")
