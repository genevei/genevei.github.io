const r="5,070,602,400,912,917,605,986,812,821,504";
const canvas=document.getElementById("canvas");
const ctx=canvas.getContext("2d");
const numbers=["0","1","2","3","4","5","6","7","8"];
const letters=["a","c","e","i","j","k","n","q","r","t","w","y","z"];
const n=["B0","B1c","B1e","B2a","B2c","B2e","B2i","B2k","B2n","B3a","B3c","B3e","B3i","B3j","B3k","B3n","B3q","B3r","B3y","B4a","B4c","B4e","B4i","B4j","B4k","B4n","B4q","B4r","B4t","B4w","B4y","B4z","B5a","B5c","B5e","B5i","B5j","B5k","B5n","B5q","B5r","B5y","B6a","B6c","B6e","B6i","B6k","B6n","B7c","B7e","B8","S0","S1c","S1e","S2a","S2c","S2e","S2i","S2k","S2n","S3a","S3c","S3e","S3i","S3j","S3k","S3n","S3q","S3r","S3y","S4a","S4c","S4e","S4i","S4j","S4k","S4n","S4q","S4r","S4t","S4w","S4y","S4z","S5a","S5c","S5e","S5i","S5j","S5k","S5n","S5q","S5r","S5y","S6a","S6c","S6e","S6i","S6k","S6n","S7c","S7e","S8"];
const full=[[["0"],["0"]],[["1"],["1c","1e"]],[["2"],["2a","2c","2e","2i","2k","2n"]],[["3"],["3a","3c","3e","3i","3j","3k","3n","3q","3r","3y"]],[["4"],["4a","4c","4e","4i","4j","4k","4n","4q","4r","4t","4w","4y","4z"]],[["5"],["5a","5c","5e","5i","5j","5k","5n","5q","5r","5y"]],[["6"],["6a","6c","6e","6i","6k","6n"]],[["7"],["7c","7e"]],[["8"],["8"]]];
const hensel=[[['B0'], [0]], [['S0'], [16]], [['B1c'], [1, 4, 64, 256]], [['S1c'], [17, 20, 80, 272]], [['B1e'], [2, 8, 32, 128]], [['S1e'], [18, 24, 48, 144]], [['B2a'], [3, 6, 9, 36, 72, 192, 288, 384]], [['S2a'], [19, 22, 25, 52, 88, 208, 304, 400]], [['B2c'], [5, 65, 260, 320]], [['S2c'], [21, 81, 276, 336]], [['B3i'], [7, 73, 292, 448]], [['S3i'], [23, 89, 308, 464]], [['B2e'], [10, 34, 136, 160]], [['S2e'], [26, 50, 152, 176]], [['B3a'], [11, 38, 200, 416]], [['S3a'], [27, 54, 216, 432]], [['B2k'], [12, 33, 66, 96, 129, 132, 258, 264]], [['S2k'], [28, 49, 82, 112, 145, 148, 274, 280]], [['B3n'], [13, 37, 67, 193, 262, 328, 352, 388]], [['S3n'], [29, 53, 83, 209, 278, 344, 368, 404]], [['B3j'], [14, 35, 74, 137, 164, 224, 290, 392]], [['S3j'], [30, 51, 90, 153, 180, 240, 306, 408]], [['B4a'], [15, 39, 75, 201, 294, 420, 456, 480]], [['S4a'], [31, 55, 91, 217, 310, 436, 472, 496]], [['B2i'], [40, 130]], [['S2i'], [56, 146]], [['B3r'], [41, 44, 104, 131, 134, 194, 296, 386]], [['S3r'], [57, 60, 120, 147, 150, 210, 312, 402]], [['B3e'], [42, 138, 162, 168]], [['S3e'], [58, 154, 178, 184]], [['B4r'], [43, 46, 139, 166, 202, 232, 418, 424]], [['S4r'], [59, 62, 155, 182, 218, 248, 434, 440]], [['B4i'], [45, 195, 360, 390]], [['S4i'], [61, 211, 376, 406]], [['B5i'], [47, 203, 422, 488]], [['S5i'], [63, 219, 438, 504]], [['B2n'], [68, 257]], [['S2n'], [84, 273]], [['B3c'], [69, 261, 321, 324]], [['S3c'], [85, 277, 337, 340]], [['B3q'], [70, 76, 100, 196, 259, 265, 289, 385]], [['S3q'], [86, 92, 116, 212, 275, 281, 305, 401]], [['B4n'], [71, 77, 263, 293, 329, 356, 449, 452]], [['S4n'], [87, 93, 279, 309, 345, 372, 465, 468]], [['B4w'], [78, 228, 291, 393]], [['S4w'], [94, 244, 307, 409]], [['B5a'], [79, 295, 457, 484]], [['S5a'], [95, 311, 473, 500]], [['B3y'], [97, 133, 268, 322]], [['S3y'], [113, 149, 284, 338]], [['B3k'], [98, 140, 161, 266]], [['S3k'], [114, 156, 177, 282]], [['B4k'], [99, 141, 165, 225, 270, 330, 354, 396]], [['S4k'], [115, 157, 181, 241, 286, 346, 370, 412]], [['B4y'], [101, 197, 269, 323, 326, 332, 353, 389]], [['S4y'], [117, 213, 285, 339, 342, 348, 369, 405]], [['B4q'], [102, 204, 267, 417]], [['S4q'], [118, 220, 283, 433]], [['B5j'], [103, 205, 271, 331, 358, 421, 460, 481]], [['S5j'], [119, 221, 287, 347, 374, 437, 476, 497]], [['B4t'], [105, 135, 300, 450]], [['S4t'], [121, 151, 316, 466]], [['B4j'], [106, 142, 163, 169, 172, 226, 298, 394]], [['S4j'], [122, 158, 179, 185, 188, 242, 314, 410]], [['B5n'], [107, 143, 167, 233, 302, 428, 458, 482]], [['S5n'], [123, 159, 183, 249, 318, 444, 474, 498]], [['B4z'], [108, 198, 297, 387]], [['S4z'], [124, 214, 313, 403]], [['B5r'], [109, 199, 301, 361, 364, 391, 451, 454]], [['S5r'], [125, 215, 317, 377, 380, 407, 467, 470]], [['B5q'], [110, 206, 230, 236, 299, 395, 419, 425]], [['S5q'], [126, 222, 246, 252, 315, 411, 435, 441]], [['B6a'], [111, 207, 303, 423, 459, 486, 489, 492]], [['S6a'], [127, 223, 319, 439, 475, 502, 505, 508]], [['B4e'], [170]], [['S4e'], [186]], [['B5c'], [171, 174, 234, 426]], [['S5c'], [187, 190, 250, 442]], [['B5y'], [173, 227, 362, 398]], [['S5y'], [189, 243, 378, 414]], [['B6c'], [175, 235, 430, 490]], [['S6c'], [191, 251, 446, 506]], [['B5k'], [229, 334, 355, 397]], [['S5k'], [245, 350, 371, 413]], [['B6k'], [231, 237, 363, 366, 399, 429, 462, 483]], [['S6k'], [247, 253, 379, 382, 415, 445, 478, 499]], [['B6n'], [238, 427]], [['S6n'], [254, 443]], [['B7c'], [239, 431, 491, 494]], [['S7c'], [255, 447, 507, 510]], [['B4c'], [325]], [['S4c'], [341]], [['B5e'], [327, 333, 357, 453]], [['S5e'], [343, 349, 373, 469]], [['B6e'], [335, 359, 461, 485]], [['S6e'], [351, 375, 477, 501]], [['B6i'], [365, 455]], [['S6i'], [381, 471]], [['B7e'], [367, 463, 487, 493]], [['S7e'], [383, 479, 503, 509]], [['B8'], [495]], [['S8'], [511]]];
const rows=74;
const cols=202;
let simgrid=randgrid(0.5);
let title=1;
let rs=40n;
let cgolupd=1;
let alt=0;
function parse(r){
	let lettrs=new Set();
	let s="B";
	let idx=1;
	do {
		if ((numbers.includes(r[idx]) && (!((letters.includes(r[idx+1])) || r[idx+1]==="-")))){
			full[r[idx]][1].forEach(i=>{
				lettrs.add(s+i);
			});
			idx++;
		} else if (letters.includes(r[idx+1])){
			let h=r[idx];
			idx++;
			do {
				lettrs.add(s+h+r[idx]);
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
				lettrs.add(s+i);
				};
			});
		} else if (r[idx]==="/"){
			s="S";
			idx+=2;
		}
	} while (idx<r.length);
	return lettrs;
}
function bina(r){
	let h=new Array(102).fill(0);
	n.forEach(i=>{
		if (r.has(i)){
			h[n.indexOf(i)]=1;
		}
	});
	return h;
}
function calcint(r){
	let h=bina(r);
	fig=h.reverse().join('');
	return BigInt("0b"+fig);
}
function intinator(j){
	let h=new Array();
	let st="B";
	let k=(j.toString(2).padStart(102,"0")).split("").reverse().join("");
	for (let i=0;i<k.length;i++){
		if (k[i]==="1"){
			h.push(n[i]);
		}
	};
	let idx=0;
	let un=[];
	let hass=0;
	if (h.length===0){
		return "B/S";
	}
	do {
	let j=h[idx][0];
	let l=h[idx][1];
		if (h[idx][0]==="S" && hass===0){
			st+="/S";
			hass=1;
		}
		if (l==="0" || l==="8"){
			un.push(l);
			st+=l;
			idx++;
		} else {
			let un2=[];
			let un3=[];
			do {
				un2.push(l+h[idx][2]);
				idx++;
				if (idx===h.length){
					break;
				}
			} while (h[idx][1]===l && h[idx][0]===j);
			if (un2.length>((full[l][1].length)/2)){
				if (l==="4" && un2.length < 8){
					for (let i=0;i<un2.length;i++){
						un2[i]=un2[i][1]
					};
					st+=l+(un2.join(""));
				} else {
					full[l][1].forEach(i=>{
						if (!un2.includes(i)){
							un3.push(i[1]);
						};
					});
					if (!(un3.length===0)){
						st+=l+"-"+(un3.join(""));
					} else {
						st+=l;
					}
				}
			} else {
				for (let i=0;i<un2.length;i++){
					un2[i]=un2[i][1]
				};
				st+=l+(un2.join(""));
			}
		}
	} while (idx<h.length);
	if (!hass){
		st+="/S";
	}
	return st;
}
canvas.addEventListener("mousemove", function(e){
    const rect=canvas.getBoundingClientRect();
	mousex=e.clientX-rect.left;
	mousey=e.clientY-rect.top;
});
canvas.addEventListener("click",function(e){
	if (title===1){
		title=0;
	} else if (title===0){
		for (let i=0;i<n.length;i++){
			const width=20;
			const height=20;
			const x=(i%34)*24+4;
			const y=40*Math.floor(i/34)+395;
			if (mousex>=x&&mousex<=x+width&&mousey>=y&&mousey<=y+height){
				rs=BigInt(addtrans(intinator(rs),n[i]))
			};
		};
		if (mousex>=740&&mousex<=815&&mousey>=313&&mousey<=343){
			const p=prompt("Insert INT rulestring");
			rs=calcint(parse(p));
		}
		if (mousex>=685&&mousex<=735&&mousey>=313&&mousey<=343){
			const p=prompt("Insert rule integer");
			rs=BigInt(p);
			if (rs>=5070602400912917605986812821504n || rs<=0n){
				alert("Invalid rule");
			}
		}
		if (mousex>=620&&mousex<=680&&mousey>=313&&mousey<=343){
			simgrid=randgrid(0.5);
		}
	};
});
function addtrans(r,j){
	let p=parse(r);
	if (!p.has(j)){
		p.add(j);
	} else {
		p.delete(j);
	}
	return calcint(p);
}
function calculatetrans(r){
	let j=parse(r);
	let n=new Set();
	for (let i=0;i<hensel.length;i++){
		if (j.has(hensel[i][0].toString())){
			hensel[i][1].forEach(k=>{
				n.add(k);
			});
		}
	};
	return n;
}
function randgrid(d){
    let arr=[];
	for (let i=0; i<rows; i++){
	    let row=[];
	    for (let j=0; j<cols; j++){
		    row.push(Math.random() < d ? 0 : 1);
		}
		arr.push(row);
	}
	return arr;
}
function countn(r,c){
   /* (-1,1)  (0,1)  (1,1)
      (-1,0)  (0,0)  (1,0)
	  (-1,-1) (0,-1) (1,-1) */
    let count=0;
	let pt=1;
    for (let i=-1;i<=1;i++){
        for (let j=-1;j<=1;j++){
		   const ni=(r+i+rows)%rows;
		   const nj=(c+j+cols)%cols;
		   count+=(pt*simgrid[ni][nj]);
		   pt*=2;
	   }
   }
   return count;
}
function updategrid(r){
    let simgridnext=[];
	const j=calculatetrans(r);
    for (let r=0;r<rows;r++){
	    simgridnext[r]=[];
	    for(let c=0;c<cols;c++){
		    let n=countn(r,c);
			simgridnext[r][c]=(j.has(n) ? 1 : 0);
		}
	}
	simgrid=simgridnext;
}
function drawgrid(j){
	let b0=(j.has("B0"));
    for (let r=0; r<rows;r++){
	    for(let c=0; c<cols;c++){
		    if (simgrid[r][c]===1){
			    ctx.fillRect(c*4+6, r*4+6, 4, 4);
			}
		}
	}
}
function draw(){
	ctx.fillStyle="black";
	ctx.fillRect(0,0,canvas.width,canvas.height);
	if (title){
		ctx.fillStyle="white";
		ctx.shadowColor="#7f7f7f";
		ctx.shadowBlur=2;
		ctx.shadowOffsetX=5;
		ctx.shadowOffsetY=ctx.shadowOffsetX;
		ctx.font="bold 240pt Courier";
		ctx.fillText("2",245,336);
		ctx.font="bold 60pt Courier";
		ctx.fillText("102",422,129);
		ctx.shadowOffsetX=2;
		ctx.shadowOffsetY=ctx.shadowOffsetX;
		ctx.font="15pt Courier";
		ctx.fillText(r,159,384);
	} else {
	    ctx.font="10pt Courier";
		ctx.fillStyle="white";
		ctx.fillText(rs,0,325);
		nh=intinator(rs);
		ctx.fillText(nh,0,335);
		ctx.font="20pt Courier";
		ctx.fillText("TRANSITION KEYBOARD",253,370);
		ctx.fillStyle="#7f7f7f";
		ctx.fillRect(2,2,816,304);
		ctx.fillStyle="black";
		ctx.fillRect(6,6,808,296);
		let h=bina(parse(intinator(rs)));
		ctx.font="8pt Courier";
		ctx.shadowBlur=0;
		ctx.shadowOffsetX=0;
		ctx.shadowOffsetY=ctx.shadowOffsetX;
		for (let i=0;i<n.length;i++){
			ctx.fillStyle="white";
			ctx.fillText(n[i],(i%34)*24+4,40*Math.floor(i/34)+390);
			ctx.fillStyle=(h[i]===1 ? "#7f7f7f" : "#3f3f3f");
			ctx.fillRect((i%34)*24+4,(40*Math.floor(i/34)+395),20,20);
		};
		ctx.fillStyle="#7f7f7f";
		ctx.fillRect(740, 313, 75, 30);
		ctx.fillStyle="white";
		ctx.fillText("Rulestring", 745, 330);		
		ctx.fillStyle="#7f7f7f";
		ctx.fillRect(685, 313, 50, 30);
		ctx.fillStyle="white";
		ctx.fillText("Integer", 687, 330);		
		ctx.fillStyle="#7f7f7f";
		ctx.fillRect(620, 313, 60, 30);
		ctx.fillStyle="white";
		ctx.fillText("Randomize", 620, 330);
		if (cgolupd===1){
			updategrid(intinator(rs));
		};
		drawgrid(parse(intinator(rs)));
	};
	requestAnimationFrame(draw);
}
draw();
//parse("B012ce3-a/S3")
//console.log(parse("B2/S"))
//2¹⁰²
