const r="5070602400912917605986812821504";
const canvas=document.getElementById("canvas");
const ctx=canvas.getContext("2d");
const numbers=["0","1","2","3","4","5","6","7","8"];
const letters=["a","c","e","i","j","k","n","q","r","t","w","y","z"];
const hensel=[[["0"],[0]]];
let rs="B0/S0";
function parse(r){
	const full=[[["0"],["0"]],[["1"],["1c","1e"]],[["2"],["2a","2c","2e","2i","2k","2n"]],[["3"],["3a","3c","3e","3i","3j","3k","3n","3q","3r","3y"]],[["4"],["4a","4c","4e","4i","4j","4k","4n","4q","4r","4t","4w","4y","4z"]],[["5"],["5a","5c","5e","5i","5j","5k","5n","5q","5r","5y"]],[["6"],["6a","6c","6e","6i","6k","6n"]],[["7"],["7c","7e"]],[["8"],["8"]]];
	let lettrs=[];
	let s="B";
	let idx=1;
	do {
		if ((numbers.includes(r[idx]) && (!((letters.includes(r[idx+1])) || r[idx+1]==="-")))){
			full[r[idx]][1].forEach(i=>{
				lettrs.push(s+i);
			});
			idx++;
		} else if (letters.includes(r[idx+1])){
			let h=r[idx];
			idx++;
			do {
				lettrs.push(s+h+r[idx]);
				idx++;
			} while (letters.includes(r[idx]));
		} else if (r[idx+1]==="-"){
			let h=r[idx];
			idx++;
			let un=[];
			do {
				un.push(h+r[idx]);
				idx++;
			} while (letters.includes(r[idx]));
			full[h][1].forEach(i=>{
				if (!un.includes(i)){
				lettrs.push(s+i);
				};
			});
		} else if (r[idx]==="/"){
			s="S";
			idx+=2;
		}
	} while (idx<r.length);
	return lettrs;
}
function calcint(r){
	let h=new Array(102);
	let n=["B0","B1c","B1e","B2a","B2c","B2e","B2i","B2k","B2n","B3a","B3c","B3e","B3i","B3j","B3k","B3n","B3q","B3r","B3y","B4a","B4c","B4e","B4i","B4j","B4k","B4n","B4q","B4r","B4t","B4w","B4y","B4z","B5y","B5r","B5q","B5n","B5k","B5j","B5i","B5e","B5c","B5a","B6n","B6k","B6i","B6e","B6c","B6a","B7e","B7c","B8","S0","S1c","S1e","S2a","S2c","S2e","S2i","S2k","S2n","S3a","S3c","S3e","S3i","S3j","S3k","S3n","S3q","S3r","S3y","S4a","S4c","S4e","S4i","S4j","S4k","S4n","S4q","S4r","S4t","S4w","S4y","S4z","S5y","S5r","S5q","S5n","S5k","S5j","S5i","S5e","S5c","S5a","S6n","S6k","S6i","S6e","S6c","S6a","S7e","S7c","S8"];
	n.forEach(i=>{
		console.l
		if (r.includes(i)){
			h[n.indexOf(i)]=1;
		} else {
			h[n.indexOf(i)]=0;
		}
	});
	fig=h.reverse().join('');
	console.log(BigInt("0b"+fig));
}
calcint(parse("B3/S23"))
//parse("B012ce3-a/S3")
//console.log(parse("B2/S"))
//2¹⁰²