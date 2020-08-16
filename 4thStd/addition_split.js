 
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
    var tempindx = getRandomInt(0,(LisT.length-1));
    var temp=LisT[tempindx];

    LisT[tempindx]=" _ ";
    return temp;
};

getRange=(min,max)=>{
    var ary =[];
    for (let i = min; i <= max; i++) {
        ary.push(i);
    };
    return ary;
};

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
QueStore=[];
QueGen=(questions)=>{
    var Sum = getRandomInt(11,5999);
    while(Sum%10==0||QueStore.includes(Sum)){
        Sum = getRandomInt(11,5999);
    }
    QueStore.push(Sum);
    var tmp=Sum;
    var first_half =Math.trunc(tmp/1000),tmp=tmp%1000,second_half = Math.trunc(tmp/100),tmp=tmp%100,third_half = Math.trunc(tmp/10),tmp=tmp%10,fourth_half=Math.trunc(Sum%10);
    var choices=[],chotemp=[];
    var Ans=(first_half.toString()*1000) + " + " + (second_half.toString()*100) + " + " + (third_half.toString()*10) + " + " +fourth_half.toString();
    choices[0]=Ans;
    chotemp[0]=Sum;
    for (let index = 1; index <=3; index++) {
        var sumte=getRandomInt(11,5999);
        while(sumte%10==0 || chotemp.includes(sumte)){
            sumte=getRandomInt(11,5999);
        }
        chotemp.push(sumte);
        first_half =(Math.trunc(sumte/1000)*1000);
        sumte%=1000;
        second_half=(Math.trunc(sumte/100)*100);
        sumte%=100;
        third_half=(Math.trunc(sumte/10)*10);
        sumte%=10;
        fourth_half=Math.trunc(sumte%10);
        var st=first_half.toString()+" + "+second_half.toString()+" + "+third_half.toString()+" + "+fourth_half.toString();
        choices.push(st);
    }
    shuffle(choices);
    var Que="Find the correct addition expression for following no. : "+Sum+"\n";
    
    var obj={
        question:Que,
        choice1:choices[0].toString(),
        choice2:choices[1].toString(),
        choice3:choices[2].toString(),
        choice4:choices[3].toString(),
        answer:(choices.indexOf(Ans)+1),
    };
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

