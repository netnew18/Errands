// =============================
// ERRANDS PRO v3 - PART 3A
// Core Engine
// =============================

const taskInput = document.getElementById("taskInput");
const category = document.getElementById("category");
const priority = document.getElementById("priority");
const day = document.getElementById("day");
const addBtn = document.getElementById("addBtn");

const todayList = document.getElementById("todayList");
const tomorrowList = document.getElementById("tomorrowList");
const weekList = document.getElementById("weekList");

const percent = document.getElementById("percent");
const progressText = document.getElementById("progressText");
const todayDate = document.getElementById("todayDate");

let tasks = JSON.parse(localStorage.getItem("errands_tasks")) || [];

todayDate.innerHTML =
new Date().toLocaleDateString("en-US",{
weekday:"long",
month:"long",
day:"numeric",
year:"numeric"
});

addBtn.onclick=addTask;

taskInput.addEventListener("keypress",(e)=>{
if(e.key==="Enter") addTask();
});

function addTask(){

let text=taskInput.value.trim();

if(text==="") return;

tasks.push({

id:Date.now(),

text:text,

category:category.value,

priority:priority.value,

day:day.value,

completed:false,

created:new Date().toISOString()

});

taskInput.value="";

save();

render();

}

function save(){

localStorage.setItem(

"errands_tasks",

JSON.stringify(tasks)

);

}

function removeTask(id){

tasks=tasks.filter(t=>t.id!==id);

save();

render();

}

function toggleTask(id){

let task=tasks.find(t=>t.id===id);

if(task){

task.completed=!task.completed;

save();

render();

}

}

function taskCard(task){

let div=document.createElement("div");

div.className="task";

if(task.completed)

div.classList.add("completed");

div.innerHTML=`

<div class="task-left">

<input type="checkbox"

${task.completed?"checked":""}>

<div>

<div class="task-title">

${task.text}

</div>

<div class="task-meta">

${task.category}

•

${task.priority}

</div>

</div>

</div>

<div class="actions">

<button class="delete">

🗑

</button>

</div>

`;

div.querySelector("input")

.onclick=()=>toggleTask(task.id);

div.querySelector(".delete")

.onclick=()=>removeTask(task.id);

return div;

}

function render(){

todayList.innerHTML="";

tomorrowList.innerHTML="";

weekList.innerHTML="";

let complete=0;

tasks.forEach(task=>{

if(task.completed)

complete++;

let card=taskCard(task);

if(task.day==="Today")

todayList.appendChild(card);

else if(task.day==="Tomorrow")

tomorrowList.appendChild(card);

else

weekList.appendChild(card);

});

updateProgress(complete,tasks.length);

}

function updateProgress(done,total){

let p=0;

if(total>0)

p=Math.round(done/total*100);

percent.innerHTML=p+"%";

progressText.innerHTML=

done+" of "+total+" Completed";

let deg=p*3.6;

document.querySelector(".circle")

.style.background=

`conic-gradient(#22c55e ${deg}deg,#334155 ${deg}deg)`;

}

render();
