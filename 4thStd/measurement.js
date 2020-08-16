const Question =document.getElementById("queID");
const choice = Array.from(document.getElementsByClassName("choice-text"));
const ProgText=document.getElementById("ProgressText");
const ScoreText=document.getElementById("Score");
const ProgBar=document.getElementById("progressBarFull");

let currentQue={};
let acceptAns=true;

let score=0;
let QueCounter=0;
let availabelQue=[];
let questions=[]
getRandomInt=(min,max)=>
{
  return Math.floor(Math.random()*(max-min+1))+min;
};
getRandomfromList=(LisT)=>{
    var temp = getRandomInt(0,(LisT.length-1));
    return LisT[temp];
};

getRange=(min,max)=>{
    var ary =[];
    for (let i = min; i <= max; i++) {
        ary.push(i);
    };
    return ary;
};
zip=(arr,...ars)=>{
    return arr.map((val,i)=>ars.reduce((a,arr)=>[...a,arr[i]],[val]));
}
shuffle=(array)=>{
    var currNdx=array.length,temp,ranIndx;
    while(0!==currNdx){
        ranIndx=Math.floor(Math.random()*currNdx);
        currNdx--;
        temp=array[currNdx];
        array[currNdx]=array[ranIndx];
        array[ranIndx]=temp;
    }
    return array;
};
var QueStore=[];
QueGen=(questions)=>{
    var from =getRandomfromList(['kilometer(km)','meter(m)','centimeter(cm)','millimeter(mm)']);
    var to =getRandomfromList(['kilometer(km)','meter(m)','centimeter(cm)','millimeter(mm)']);
    
    
    if (from=='kilometer(km)')
    {
        var dig = getRandomInt(1,10);
        QueStore.push(dig);
	if (to=='kilometer(km)')
	{
        to='meter(m)';
        ans=dig*1000;
        }
	if (to=='meter(m)')
	{
	ans=dig*1000;
	}
	if (to=='centimeter(cm)')
	{
    to='meter(m)';
	ans=dig*1000;
	}
	if (to=='millimeter(mm)')
	{
        to='meter(m)';
        ans=dig*1000;
        }
}
if (from=='meter(m)')
{       var dig = getRandomInt(10,10000);
    QueStore.push(dig);

	if (to=='kilometer(km)')
	{
	ans=dig/1000;
	}
	if (to=='meter(m)')
	{
	    to=getRandomfromList(['centimeter(cm)','kilometer(km)']);
    if (to=='centimeter(cm)') {
        ans=dig*100;
    } else {
        ans=dig/1000;
    }
	}
	if (to=='centimeter(cm)')
	{
	ans=dig*100;
	}
	if (to=='millimeter(mm)')
	{
    to=getRandomfromList(['centimeter(cm)','kilometer(km)']);
    if (to=='centimeter(cm)') {
        ans=dig*100;
    } else {
        ans=dig/1000;
    }
	}
}
if (from=='centimeter(cm)')
{
    var dig = getRandomInt(1000,10000);
    QueStore.push(dig);
	if (to=='kilometer(km)')
	{
    to=getRandomfromList(['millimeter(mm)','meter(m)']);
    if (to=='meter(m)')
	{
	ans=dig/100;
	}
	if (to=='millimeter(mm)')
	{
	ans=dig*10;
	}
	}
	if (to=='meter(m)')
	{
	ans=dig/100;
	}
	if (to=='centimeter(cm)')
	{
	    to=getRandomfromList(['millimeter(mm)','meter(m)']);
    if (to=='meter(m)')
	{
	ans=dig/100;
	}
	if (to=='millimeter(mm)')
	{
	ans=dig*10;
	}

	}
	if (to=='millimeter(mm)')
	{
	ans=dig*10;
	}
}
if (from=='millimeter(mm)')
{
    var dig = getRandomInt(1000,10000);
    QueStore.push(dig);

	if (to=='kilometer(km)')
	{
        to='centimeter(cm)'
        ans=dig/10;
	}
	if (to=='meter(m)')
	{
        to='centimeter(cm)'
        ans=dig/10;
	}
	if (to=='centimeter(cm)')
	{
	ans=dig/10;
	}
	if (to=='millimeter(mm)')
	{
        to='centimeter(cm)'
        ans=dig/10;
	}
}

    var choices=[];
    choices[0]=ans;
   
    for (let i=1; i<=3; i++){
         var st=getRandomInt(100,1000000);
         while(choices.includes(st)){
            st=getRandomInt(100,1000000);
         }
         choices.push(st);
    }
    shuffle(choices);
    var name=getRandomfromList(['Ram','Sharan','Abhishek','Vivek','Amol','Bhavesh','Madhur']);
    var Que="If "+name+" travels "+dig+" "+from+" by bus, then how many "+to+" did "+name+" covered ? ";
    var obj={
        question:Que,
        choice1:choices[0].toString(),
        choice2:choices[1].toString(),
        choice3:choices[2].toString(),
        choice4:choices[3].toString(),
        answer:(choices.indexOf(ans)+1),
    };
    console.log(obj.answer);
    questions.push(obj);
};
for (let index = 0; index < 10 ;index++) {
    QueGen(questions);
};
const CORRECT_BONUS=10;
const MAX_QUESTIONS=questions.length;

startgame=()=>{
    queCount=0;
    score=0;
    availabelQue=[...questions];
    getNewQue();
};

getNewQue= () =>{
    if (availabelQue.length==0 || QueCounter>=MAX_QUESTIONS){
        //Store score in local storage
        localStorage.setItem("MostRecentScore",score)
        //Go to Score Page
        return window.location.assign("end.html");
    }
    QueCounter++;

    ProgText.innerHTML="Question "+QueCounter+"/"+MAX_QUESTIONS;
    //Update Progress Bar
    ProgBar.style.width=(QueCounter/MAX_QUESTIONS)*100+"%";

    const Queindx = Math.floor(Math.random()*availabelQue.length);
    currentQue=availabelQue[Queindx];
    Question.innerHTML=currentQue.question;
    choice.forEach( choice =>{
        const num=choice.dataset['no'];
        choice.innerText=currentQue['choice'+num];
    })
    availabelQue.splice(Queindx,1);
    acceptAns=true;
};

choice.forEach( choice => {
    choice.addEventListener("click", e =>{
        if (!acceptAns) return;
        acceptAns=false;
        const selectedChoice=e.target;
        const selectedAns=selectedChoice.dataset["no"];
        const classToApply=(selectedAns==currentQue.answer)?"correct":"incorrect";
        
        if (classToApply=="correct"){
            increScore(CORRECT_BONUS);
        }

        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout(() =>{        
        selectedChoice.parentElement.classList.remove(classToApply);
        getNewQue();
        },1000);
    });
});
increScore=(num)=>{
    score+=num;
    ScoreText.innerText=score;
};
startgame();