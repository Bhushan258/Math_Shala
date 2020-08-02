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
    return temp;
};

zip=(arr,...ars)=>{
    return arr.map((val,i)=>ars.reduce((a,arr)=>[...a,arr[i]],[val]));
}

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
    var letters=['A','B','C','D','E'],patt='',Ans='';
    var emojishapes =["&#x1F536 ","&#x1F537 ","&#x1F534 ","&#x1F53A ","&#x1F7E2 "];
    for (let index = 0; index < 4; index++) {
        k=getRandomfromList(letters);
        patt+=k;
        Ans+=emojishapes[letters.indexOf(k)];
    }
    while(QueStore.includes(patt)){
        patt='',Ans='';
        for (let index = 0; index < 4; index++) {
            k=getRandomfromList(letters);
            patt+=k;
            Ans+=emojishapes[letters.indexOf(k)];
        }
    }
    QueStore.push(patt);
    var choices=[],chotemp=[];
    choices[0]=Ans,chotemp[0]=patt;
    for (let index = 1; index <=3; index++) {
        var patt_temp='',Ans_temp='';
        for (let x = 0; x < 4; x++) {
            k=getRandomfromList(letters);
            patt_temp+=k;
            Ans_temp+=emojishapes[letters.indexOf(k)];
        }
        while(chotemp.includes(patt_temp)){
            patt_temp='',Ans_temp='';
            for (let index = 0; index < 4; index++) {
                k=getRandomfromList(letters);
                patt_temp+=k;
                Ans_temp+=emojishapes[letters.indexOf(k)];
            }
        }
        choices.push(Ans_temp),chotemp.push(patt_temp);
    }
    var Q='';
    for (let index = 0; index < letters.length; index++) {
        Q+=letters[index]+" = "+emojishapes[index]+", ";
    }
    shuffle(choices);
    var Que="Find the sequence with common pattern like following sequence : <br>"+patt+"-"+patt+"-"+patt+"<br> ("+Q+")";
    var obj={
        question:Que,
        choice1:(choices[0]+"- "+choices[0]+"- "+choices[0]).toString(),
        choice2:(choices[1]+"- "+choices[1]+"- "+choices[1]).toString(),
        choice3:(choices[2]+"- "+choices[2]+"- "+choices[2]).toString(),
        choice4:(choices[3]+"- "+choices[3]+"- "+choices[3]).toString(),
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
        choice.innerHTML=currentQue['choice'+num];
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