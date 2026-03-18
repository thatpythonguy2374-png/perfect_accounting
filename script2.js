/* ===============================
GLOBAL VARIABLES
=============================== */

let charts = {};

/* ===============================
FORMAT INR
=============================== */

function formatINR(num){
return "₹" + Math.round(num).toLocaleString("en-IN");
}

/* ===============================
CONNECT INPUT + SLIDER
=============================== */

function connectSlider(inputId, sliderId){

const input = document.getElementById(inputId);
const slider = document.getElementById(sliderId);

if(!input || !slider) return;

/* SLIDER → INPUT */

slider.addEventListener("input", function(){

input.value = Number(this.value).toLocaleString("en-IN");
triggerCalculator();

});

/* INPUT → SLIDER */

input.addEventListener("input", function(){

let raw = this.value.replace(/,/g,"");

slider.value = raw;

triggerCalculator();

});

}

/* ===============================
CREATE CHART
=============================== */

function createChart(canvasId,data,labels){

let ctx=document.getElementById(canvasId);

if(!ctx) return;

if(charts[canvasId]){
charts[canvasId].destroy();
}

charts[canvasId]=new Chart(ctx,{
type:"doughnut",
data:{
labels:labels,
datasets:[{
data:data,
backgroundColor:["#2ecc71","#4a6cf7"],
borderWidth:0
}]
},
options:{
cutout:"70%",
plugins:{
legend:{position:"bottom"}
}
}
});

}

/* ===============================
SET DEFAULT VALUES
=============================== */

function setDefault(id,value){

let element=document.getElementById(id);
if(!element) return;

if(element.type==="text"){
element.value=value.toLocaleString("en-IN");
}else{
element.value=value;
}

let slider=document.getElementById(id+"Slider");

if(slider){
slider.value=value;
}

}

/* ===============================
RESET FUNCTION
=============================== */

function resetCalculator(defaults){

for(let id in defaults){

let element=document.getElementById(id);
if(!element) continue;

let value=defaults[id];

if(element.type==="text"){
element.value=value.toLocaleString("en-IN");
}else{
element.value=value;
}

let slider=document.getElementById(id+"Slider");

if(slider){
slider.value=value;
}

}

triggerCalculator();

}

/* ===============================
EMI CALCULATOR
=============================== */

function emiCalculator(){

let loanInput=document.getElementById("loan");
if(!loanInput) return;

let P=parseFloat(loanInput.value.replace(/,/g,""));
let rate=parseFloat(document.getElementById("rate").value);
let months=parseFloat(document.getElementById("months").value);

let r=(rate/12)/100;

let emi=(P*r*Math.pow(1+r,months))/(Math.pow(1+r,months)-1);

let total=emi*months;
let interest=total-P;

document.getElementById("emiValue").innerText=formatINR(emi);
document.getElementById("interestValue").innerText=formatINR(interest);
document.getElementById("totalValue").innerText=formatINR(total);

createChart("emiChart",[P,interest],["Principal","Interest"]);

}

/* ===============================
GST CALCULATOR
=============================== */

function gstCalculator(){

let amountInput=document.getElementById("amount");
if(!amountInput) return;

let amount=parseFloat(amountInput.value.replace(/,/g,""));
let rate=parseFloat(document.getElementById("rate").value);
let inclusive=document.getElementById("inclusive")?.checked;

let gst;

if(inclusive){
gst=amount-(amount*(100/(100+rate)));
}else{
gst=(amount*rate)/100;
}

let total=amount+gst;

document.getElementById("gstAmount").innerText=formatINR(gst);
document.getElementById("gstTotal").innerText=formatINR(total);

createChart("gstChart",[amount,gst],["Amount","GST"]);

}

/* ===============================
SIP CALCULATOR
=============================== */

function sipCalculator(){

let sipInput=document.getElementById("sip");
if(!sipInput) return;

let P=parseFloat(sipInput.value.replace(/,/g,""));
let rate=parseFloat(document.getElementById("rate").value)/100;
let years=parseFloat(document.getElementById("years").value);

let r=rate/12;
let n=years*12;

let FV=P*((Math.pow(1+r,n)-1)/r)*(1+r);

document.getElementById("sipResult").innerText=formatINR(FV);

createChart("sipChart",[P*n,FV-(P*n)],["Investment","Returns"]);

}

/* ===============================
LUMPSUM CALCULATOR
=============================== */

function lumpsumCalculator(){

let investInput=document.getElementById("investment");
if(!investInput) return;

let P=parseFloat(investInput.value.replace(/,/g,""));
let r=parseFloat(document.getElementById("rate").value)/100;
let t=parseFloat(document.getElementById("years").value);

let FV=P*Math.pow((1+r),t);

document.getElementById("lumpResult").innerText=formatINR(FV);

createChart("lumpChart",[P,FV-P],["Investment","Returns"]);

}

/* ===============================
HRA CALCULATOR
=============================== */

function hraCalculator(){

let salaryInput=document.getElementById("salary");
if(!salaryInput) return;

let salary=parseFloat(salaryInput.value);
let hra=parseFloat(document.getElementById("hra").value);
let rent=parseFloat(document.getElementById("rent").value);
let metro=document.getElementById("metro")?.checked;

let rule1=hra;
let rule2=metro?0.5*salary:0.4*salary;
let rule3=rent-(0.1*salary);

let exemption=Math.min(rule1,rule2,rule3);

document.getElementById("hraResult").innerText=formatINR(exemption);

}

/* ===============================
NPS CALCULATOR
=============================== */

function npsCalculator(){

let contrib=document.getElementById("contribution");
if(!contrib) return;

let C=parseFloat(contrib.value);
let rate=parseFloat(document.getElementById("rate").value)/100;
let years=parseFloat(document.getElementById("years").value);

let FV=C*((Math.pow((1+rate),years)-1)/rate);

document.getElementById("npsResult").innerText=formatINR(FV);

}

/* ===============================
PF CALCULATOR
=============================== */

function pfCalculator(){

let salaryInput=document.getElementById("salary");
if(!salaryInput) return;

let salary=parseFloat(salaryInput.value);
let years=parseFloat(document.getElementById("years").value);

let employee=salary*0.12;
let employer=salary*0.0367;

let monthly=employee+employer;

let rate=0.0825/12;
let n=years*12;

let FV=monthly*((Math.pow(1+rate,n)-1)/rate);

document.getElementById("pfResult").innerText=formatINR(FV);

}

/* ===============================
AUTO DETECT CALCULATOR
=============================== */

function triggerCalculator(){

if(document.getElementById("emiChart")) emiCalculator();
if(document.getElementById("gstChart")) gstCalculator();
if(document.getElementById("sipChart")) sipCalculator();
if(document.getElementById("lumpChart")) lumpsumCalculator();
if(document.getElementById("hraResult")) hraCalculator();
if(document.getElementById("npsResult")) npsCalculator();
if(document.getElementById("pfResult")) pfCalculator();

}
document.querySelectorAll("input").forEach(function(el){

el.addEventListener("input",function(){
triggerCalculator();
});

el.addEventListener("change",function(){
triggerCalculator();
});

});
/* ===============================
PAGE LOAD
=============================== */

document.addEventListener("DOMContentLoaded",function(){

/* CONNECT SLIDERS */

connectSlider("loan","loanSlider");
connectSlider("months","monthsSlider");
connectSlider("rate","rateSlider");

connectSlider("amount","amountSlider");
connectSlider("sip","sipSlider");
connectSlider("investment","investmentSlider");
connectSlider("salary","salarySlider");

/* DEFAULT VALUES FOR ALL CALCULATORS */

setDefault("loan",200000);
setDefault("amount",200000);
setDefault("sip",200000);
setDefault("investment",200000);

setDefault("salary",50000);
setDefault("hra",20000);
setDefault("rent",15000);
setDefault("contribution",200000);

setDefault("rate",18);
setDefault("months",12);
setDefault("years",12);

/* AUTO CALCULATE */

triggerCalculator();

});


const monthsSlider = document.getElementById("months");
const rateSlider = document.getElementById("rate");

if(monthsSlider){

monthsSlider.addEventListener("input",function(){

document.getElementById("monthsValue").innerText=this.value;

triggerCalculator();

});

}

if(rateSlider){

rateSlider.addEventListener("input",function(){

document.getElementById("rateValue").innerText=this.value;

triggerCalculator();

});

}