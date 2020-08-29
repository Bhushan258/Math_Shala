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
Rec=(questions)=>{
    var dig = getRange(4,396)
    var a = getRandomInt(1,99);
    var b = getRandomInt(1,99);
    var p = 2 * (a + b);
    var choices=[];
    choices[0]=p;
   
    for (let i=1; i<=3; i++){
         var st=getRandomfromList(dig);
         while(choices.includes(st)){
            st=getRandomfromList(dig);
         }
         choices.push(st);
    }
    shuffle(choices);
    var Que="What is the perimeter of a rectangle with length = "+a+" and, breadth = "+b+  "? ";
    shuffle(Que);
    var obj={
        question:Que,
        choice1:choices[0].toString(),
        choice2:choices[1].toString(),
        choice3:choices[2].toString(),
        choice4:choices[3].toString(),
        answer:(choices.indexOf(p)+1),
    };
    console.log(obj.answer);
    questions.push(obj);
};
Square=(questions)=>{
    var dig = getRange(3,297)
    var a = getRandomInt(1,99);
    var p = 4*a ;
    var choices=[];
    choices[0]=p;
   
    for (let i=1; i<=3; i++){
         var st=getRandomfromList(dig);
         while(choices.includes(st)){
            st=getRandomfromList(dig);
         }
         choices.push(st);
    }
    shuffle(choices);
    var Que="What is the perimeter of a square with sides = "+a+" ? ";
    var obj={
        question:Que,
        choice1:choices[0].toString(),
        choice2:choices[1].toString(),
        choice3:choices[2].toString(),
        choice4:choices[3].toString(),
        answer:(choices.indexOf(p)+1),
    };
    console.log(obj.answer);
    questions.push(obj);
};
Tri=(questions)=>{
    var dig = getRange(3,297)
    var a = getRandomInt(1,99);
    var b = getRandomInt(1,99);
    var c = getRandomInt(1,99);
    var p = a + b + c;
    var choices=[];
    choices[0]=p;
   
    for (let i=1; i<=3; i++){
         var st=getRandomfromList(dig);
         while(choices.includes(st)){
            st=getRandomfromList(dig);
         }
         choices.push(st);
    }
    shuffle(choices);
    var Que="What is the perimeter of a triangle with side A = "+a+", B = "+b+" and, side C = "+c+" ? ";
    var obj={
        question:Que,
        choice1:choices[0].toString(),
        choice2:choices[1].toString(),
        choice3:choices[2].toString(),
        choice4:choices[3].toString(),
        answer:(choices.indexOf(p)+1),
    };
    console.log(obj.answer);
    questions.push(obj);
};
for (let index = 0; index < 15 ;index++) {
    if(index<5){
        Rec(questions);
    }else if(index>=5 && index<10){
        Square(questions);
    }else{
        Tri(questions);
    }
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