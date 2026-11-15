let objs;
let zq="";
let zz="";
let p;
const cnv=document.getElementById("canvas");
const ctx=cnv.getContext("2d");
let nams=new Map();
var mousex=0;
var mousey=0;
let done=[];
let objs1="";
let objs2="";
let objs1c=0;
let objs2c=0;
let max;
let loss=0;
let selct;
let score=0;
let trans=0;
let transx=0;
let transop=1;
let objd=1;
let orre=1;
async function load(){ // Idfk bro
    const resp=await fetch("data.txt");
    const txt=await resp.text();
	const lns=txt.trim().split("\n");
    objs=lns.map(ln=>{ // albert einstein
        const [apg,val]=ln.split(",");
        return [apg, parseInt(val,10)];
    });
	objs.sort((a,b)=>b[1]-a[1]); // actually genius?
	return objs;
}
async function objnames(){
	const resp=await fetch("names.txt");
	const txt=await resp.text();
	const lns=txt.trim().split("\n");
	let names=new Map();
	lns.forEach(ln=>{
		let n=ln.split(": ");
		names.set(n[0],n[1]);
	});
	return names;
}
function roundrect(x,y,w,h,r,stroke,fill){
    ctx.beginPath();
	ctx.roundRect(x,y,w,h,r);
	if (fill===1){ctx.fill()};
	if (stroke===1){ctx.stroke()};
}
function drawobj(apg,size,startx,side){
    ctx.fillStyle="#000000";
	ctx.globalAlpha=0.8;
    if (apg[0] != "m" && apg[0] != "y"){
	    let code = apg.split("_")[1];
		let x=startx;
		let y=150-(size*5); //2: 0; 3: 50; 4: 75;
		for (let i=0; i<code.length; i++){
		    let bin=parseInt(code[i],36).toString(2).padStart(5,"0");
			switch (bin){
			    case "100000":
                    x+=10*size;
					break;
			    case "100001":
			        x+=15*size;
					break;
				case "100010":
				    x+=(20+(5*parseInt(code[i+1],36)))*size;
					i++;
					break;
			    case "100011":
			        x=startx;
			        y+=25*size;
					break;
			    default:
			        for (let j=0; j<bin.length+1; j++){
			            if (bin[5-j]==="1"){
				            roundrect(x,y+5*j*size,5*size,5*size,1,1,1);
				        }
			        }
		            x+=5*size;
			}
		}
	}
	ctx.globalAlpha=1;
	ctx.shadowColor="transparent";
	ctx.font="0px Comic Sans MS";
	let fts=1;
	let st=(side===1 ? 200 : 600);
	if (!nams.get(apg)){
		do{
			fts++;
			ctx.font=ctx.font.replace(ctx.font.split("px")[0],fts);
		} while ((st+ctx.measureText(apg).width/2<360 && side==1 || st+ctx.measureText(apg).width/2<760 && side==2)&& 50+fts<100);
	} else {
		let rlr=[apg,nams.get(apg)]
		let lon=rlr.reduce((a,b)=>a.length>b.length?a:b);
		do{
			fts++;
			ctx.font=ctx.font.replace(ctx.font.split("px")[0],fts);
		} while ((st+ctx.measureText(lon).width/2<360 && side==1 || st+ctx.measureText(lon).width/2<760 && side==2)&& 50+fts<100);
	}
	if (nams.get(apg)){
		ctx.fillText(nams.get(apg), st, 80);
		ctx.fillText("("+apg+")",st,80+fts);
	} else {
		ctx.fillText(apg,st,100);
	};
}
function measurewid(apg){
	let width=0;
	let rlex=0;
	let rley=0;
	let hrly=0;
    if (apg[0] != "m" && apg[0] != "y"){
	    let code = apg.split("_")[1];
		for (let i=0; i<code.length; i++){
		    let bin=parseInt(code[i],36).toString(2).padStart(5,"0");
			switch (bin){
			    case "100000":
					rlex+=2;
					break;
			    case "100001":
					rlex+=3;
					break;
				case "100010":
					rlex+=4+(parseInt(code[i+1],36));
					i++;
					break;
			    case "100011":
					rlex=0;
					rley+=5;
					break;
			    default:
			        for (let j=0; j<bin.length+1; j++){
			            if (bin[5-j]==="1" && rley+j>hrly){
				            hrly=rley+j;
				        }
			        }
					rlex+=1;
			}
			if (rlex>width){
				width=rlex;
			}
		}
	}
	return [width, hrly];
}
function pickobjs(diff){
	let filt=[];
	let obj1="";
	let obj2="";
	let obj1c="";
	let obj2c="";
	let equ=0;
	do {
		let range=Math.round(max*diff)*Math.random();
	    filt=objs.filter(i=>i[1]>=range&&i[1]<=max);
		if (filt.length==0||filt.length==1){continue;}
		let evil=filt[Math.floor(Math.random()*filt.length)];
	    obj1=evil[0];
		obj1c=evil[1];
		evil2=filt[Math.floor(Math.random()*filt.length)];
		obj2=evil2[0];
		obj2c=evil2[1];
		if (obj2c==1&&obj1c==2||obj1c===2||obj2c===1){return [obj1, obj2, obj1c, obj2c]}
		done.forEach(p=>{
			if (p[0]==obj1 && p[1]==obj2 || p[0]==obj2 && p[1]==obj1){
				equ=1;                        
			} else {
				equ=0;
			}
		});
	} while (obj2==obj1 || obj2c==obj1c || filt.length==0 || equ==1);
	max=max*Math.random()
	return [obj1, obj2, obj1c, obj2c];
	
}
async function mained(){
	objs=await load();
	nams=await objnames();
	max=objs[0][1]
	p=pickobjs(0.5);
	obj1=p[0];
	obj2=p[1];
	obj1c=p[2];
	obj2c=p[3];
	done.push([obj1,obj2]);
}
function choose(){
	p=pickobjs(0.5);
	obj1=p[0];
	obj2=p[1];
	obj1c=p[2];
	obj2c=p[3];
	done.push([obj1,obj2]);
}
canvas.addEventListener("mousemove", function(e){
    const rect=canvas.getBoundingClientRect();
	mousex=e.clientX-rect.left;
	mousey=e.clientY-rect.top;
});
function findhov(){
    if (mousex>=0 && mousex<=380 && mousey >= 100){
		hovbox=0;
	} else if (mousex >= 420 && mousex<=800 && mousey>=100){
        hovbox=1;
	} else {
		hovbox=-1;
	}
}
canvas.addEventListener("click", function(e){
	if (!trans){
		if (hovbox===0){
			selct="obj1";
		} else if (hovbox===1){
			selct="obj2";
		}
		hovbox=0;
		reveal();
	}
});
function lose(){
	loss=1;
	ctx.clearRect(0,0,cnv.width,cnv.height);
	ctx.textAlign="center";
	ctx.fillText("You managed to identify " + score + " object" + (score===1?"!":"s!"), 400, 200)
	ctx.fillText("Press the refresh button to try again", 400, 250)
}
function reveal(){
	obj1c=BigInt(obj1c);
	obj2c=BigInt(obj2c);
	if (selct=="obj1"){
		if (obj1c>obj2c){
			trans=1;
			score+=1;
		} else {
			lose();
		}
	} else if (selct=="obj2"){
		if (obj2c>obj1c){
			trans=1;
			score+=1;
		} else {
			lose();
		}
	} else {
		return;
	}
}
function drawa(a,b){
	ctx.shadowBlur=2;
	ctx.shadowOffsetX=2;
	ctx.shadowOffsetY=2;
	ctx.shadowColor="transparent";
	ctx.clearRect(0,0,cnv.width,cnv.height);
	let aw=measurewid(a);
	let siz1=Math.max(aw[0],aw[1]);
	let bw=measurewid(b);
	let siz2=Math.max(bw[0],bw[1]);
	let dsiz1=60/siz1;
	let dsiz2=60/siz2;
	ctx.shadowColor=(hovbox==0 ? "#7f7f7f" : "transparent");
	drawobj(a,dsiz1,50+(300-dsiz1*aw[0]*5)/2,1);
	ctx.shadowColor=(hovbox==1 ? "#7f7f7f" : "transparent");
	drawobj(b,dsiz2,450+(300-dsiz2*bw[0]*5)/2,2);
	ctx.fillStyle="black";
	ctx.globalAlpha=1;
	ctx.font="18pt Comic Sans MS";
	ctx.textAlign="center";
	ctx.fillText("Which of these is more common?", 400, 25);
	if (orre){
		ctx.fillText("or", 400, 100);
	}
	ctx.fillRect(400, 35, 2, 40);
	ctx.fillRect(400, 110, 2, 380);
}
function draw(){
	if (!loss){
		findhov();
		drawa(obj1,obj2);
		if (trans){
			if (objd){
				ctx.textAlign="center";
				ctx.font="20px Comic Sans MS";
				ctx.fillText(obj1c,200,475);
				ctx.fillText(obj2c,600,475);
				ctx.font="128px Comic Sans MS";
				n=(obj1c>obj2c?">":"<")
				ctx.fillText(n, 400, 132);
			}
			if (orre===1 && transop===1){orre=0};
			ctx.fillRect(0,0,25*(transx-60),canvas.height);
			ctx.fillRect(canvas.width-25*(transx-60),0,25*(transx-60),canvas.height);
			if (transx===80){
				transop=-1;
				choose();
				objd=0;
				orre=1;
			}
			if (transx===-1 || (25*(transx-60)<=0 && transop==-1)){
				transx=0;
				transop=1;
				trans=0;
				objd=1;
				orre=1;
			}
			transx+=transop;
		}
	}
	requestAnimationFrame(draw);
}
async function ini(){
	await mained();
	draw();
}
ini();