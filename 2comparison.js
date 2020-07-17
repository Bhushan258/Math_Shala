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
let questions=[];
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
    var Q = getRandomInt(11,99),Ans=getRandomInt(11,99),cond;
    var choices=[];
    while(QueStore.includes(Q)){
        Q= getRandomInt(11,99),Ans=getRandomInt(11,99);
    }
    QueStore.push(Q); 
    choices[0]=Ans;
	if (Q==Ans){
        cond="equal to";
        var cn=1;
    }else if (Q>Ans){
        var cn=2;
        cond="less than";
    }else{
        cond="greater than";
        var cn=3;
    }
    for (let index = 1; index <=3; index++) {
        var tem=getRandomInt(11,99);
        console.log(tem);

        if (cn==1){
            while(tem==Q || choices.includes(tem)){
                tem=getRandomInt(11,99);
                console.log(tem);
            }
        }if(cn==2){
            while(tem<Q || choices.includes(tem)){
                tem=getRandomInt(11,99);}
                console.log(tem);
        }if(cn==3){
            while(tem>Q || choices.includes(tem)){
                tem=getRandomInt(11,99);}
        }
        choices.push(tem);
    }
    console.log(choices);
    var Que="Find an integer which is "+cond+" following no. : "+Q;                     
    shuffle(choices);
    var obj={
        question:Que,
        choice1:choices[0],
        choice2:choices[1],
        choice3:choices[2],
        choice4:choices[3],
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