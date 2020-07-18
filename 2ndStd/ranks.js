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
QueGen=(questions)=>{

var a = getRandomInt(20,100);
var b = getRandomInt(20,100);
var c = getRandomInt(20,100);
var d = getRandomInt(20,100);
var Q = getRandomInt(1,4);
var marks = [a,b,c,d];
var Choices=[];
marks.sort().reverse();
var Ans=getRandomfromList(marks);
console.log(marks);
NameSet=[["Monica","Ross","Joey","Chandler"],["Mohini","Raj","Komal","Vinay"],["Maya","Ravi","Jiten","Chirag"],["Suraj","Pratik","Jay","Prakash"]];
ranks=["1st Rank","2nd Rank","3rd Rank","4th Rank"];
Studs=getRandomfromList(NameSet);
shuffle(Studs);
TotData=zip(Studs,marks,ranks);
shuffle(TotData);
var Que="If in a test, "+TotData[0][0]+" scores "+TotData[0][1]+", "+TotData[1][0]+" scores "+TotData[1][1]+", "+TotData[2][0]+" scores "+TotData[2][1]+", "+TotData[3][0]+" scores "+TotData[3][1];
for(var i=0;i<4;i++){
    if (TotData[i][1]==Ans){
        Ans=TotData[i];
        console.log(Ans);
        temp=i;
        Que+="<br/> What is "+Ans[0]+"'s Rank?";
    }
}
var obj={
    question:Que,
    choice1:TotData[0][2].toString(),
    choice2:TotData[1][2].toString(),
    choice3:TotData[2][2].toString(),
    choice4:TotData[3][2].toString(),
    answer:''+(temp+1),
};
console.log(obj.answer)
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
