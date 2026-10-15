const r="5070602400912917605986812821504";
const canvas=document.getElementById("canvas");
const ctx=canvas.getContext("2d");
const numbers=["0","1","2","3","4","5","6","7","8"];
const letters=["a","c","e","i","j","k","n","q","r","t","w","y","z"];
const full=[[["0"],["0"]],[["1"],["1c","1e"]],[["2"],["2a","2c","2e","2i","2k","2n"]],[["3"],["3a","3c","3e","3i","3j","3k","3n","3q","3r","3y"]]];
const hensel=[[["0"],[0]]];
let rs="B0/S0";
function parse(r){
	let lettrs=[];
	let s="B";
	let idx=1;
	do {
		console.log(r[idx]);
		if (numbers.includes(r[idx]) && !(letters.includes(r[idx+1]))){
			full[r[Number(idx)]][1].forEach(i=>{
				lettrs.push(s+i);
			});
			idx++;
		} else if (letters.includes(r[idx+1])){
			let h=r[idx];
			console.log(idx);
			do {
				letters.push(h+r[idx]);
				idx++;
			} while (!numbers.includes(r[idx]));
		} else {
			if (r[idx]==="/"){
				s="S";
				idx+=2;
			} else {
				let h=r[idx];
				let un=[];
				do {
					un.push(h+r[idx]);
					idx++;
				} while (!numbers.includes(r[idx]));
				full[r[Number(h)]][1].forEach(i=>{
					if (!un.includes(i)){
						lettrs.push(h+i);
					};
				});
			};
		};
	} while (idx<r.length);
	return lettrs;
}
//console.log(parse("B2/S"))