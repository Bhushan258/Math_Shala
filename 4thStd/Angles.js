const Question =document.getElementById("queID");
const choice = Array.from(document.getElementsByClassName("choice-text"));
const ProgText=document.getElementById("ProgressText");
const ScoreText=document.getElementById("Score");
const ProgBar=document.getElementById("progressBarFull");
const img=document.getElementById("shape");

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
questions = [
    {
        imgsrc:"https://etc.usf.edu/clipart/42000/42001/pro_10_42001_lg.gif",
        alt:"quantity",
        question:"What is the dergee of the angle?",
        choice1:10,
        choice2:170,
        answer:1,
    },
    {
        imgsrc:"https://etc.usf.edu/clipart/42000/42001/pro_10_42001_lg.gif",
        alt:"identity",
        question:"What is the name of the angle?",
        choice1:"Acute",
        choice2:"Obtuse",
        answer:1,
    },
        {
        imgsrc:"https://etc.usf.edu/clipart/42000/42002/pro_15_42002_lg.gif",
        alt:"quantity",
        question:"What is the dergee of the angle?",
        choice1:15,
        choice2:165,
        answer:1,
    },
    {
        imgsrc:"https://etc.usf.edu/clipart/42000/42002/pro_15_42002_lg.gif",
        alt:"identity",
        question:"What is the name of the angle?",
        choice1:"Acute",
        choice2:"Obtuse",
        answer:1,
    },
    {
        imgsrc:"https://etc.usf.edu/clipart/42000/42003/pro_20_42003_lg.gif",
        alt:"quantity",
        question:"What is the dergee of the angle?",
        choice1:20,
        choice2:160,
        answer:1, 
    },
    {
        imgsrc:"https://etc.usf.edu/clipart/42000/42003/pro_20_42003_lg.gif",
        alt:"identity",
        question:"What is the name of the angle?",
        choice1:"Acute",
        choice2:"Obtuse",
        answer:1,
    },
    {
        imgsrc:"https://etc.usf.edu/clipart/42000/42004/pro_25_42004_lg.gif",
        alt:"quantity",
        question:"What is the dergee of the angle?",
        choice1:25,
        choice2:155,
        answer:1, 
    },
    {
        imgsrc:"https://etc.usf.edu/clipart/42000/42004/pro_25_42004_lg.gif",
        alt:"identity",
        question:"What is the name of the angle?",
        choice1:"Acute",
        choice2:"Obtuse",
        answer:1,
    },
    {
        imgsrc:"https://etc.usf.edu/clipart/42000/42005/pro_30_42005_lg.gif",
        alt:"quantity",
        question:"What is the dergee of the angle?",
        choice1:30,
        choice2:150,
        answer:1,
    },
    {
        imgsrc:"https://etc.usf.edu/clipart/42000/42005/pro_30_42005_lg.gif",
        alt:"identity",
        question:"What is the name of the angle?",
        choice1:"Acute",
        choice2:"Obtuse",
        answer:1,
    },
    {
        imgsrc:"https://etc.usf.edu/clipart/42000/42006/pro_35_42006_lg.gif",
        alt:"quantity",
        question:"What is the dergee of the angle?",
        choice1:35,
        choice2:145,
        answer:1,
    },
    {
        imgsrc:"https://etc.usf.edu/clipart/42000/42006/pro_35_42006_lg.gif",
        alt:"identity",
        question:"What is the name of the angle?",
        choice1:"Acute",
        choice2:"Obtuse",
        answer:1,
    },
    {
        imgsrc:"https://etc.usf.edu/clipart/42000/42007/pro_40_42007_lg.gif",
        alt:"quantity",
        question:"What is the dergee of the angle?",
        choice1:40,
        choice2:140,
        answer:1,
    },
    {
        imgsrc:"https://etc.usf.edu/clipart/42000/42007/pro_40_42007_lg.gif",
        alt:"identity",
        question:"What is the name of the angle?",
        choice1:"Acute",
        choice2:"Obtuse",
        answer:1,
    }, 
    {
        imgsrc:"https://etc.usf.edu/clipart/42000/42008/pro_45_42008_lg.gif",
        alt:"quantity",
        question:"What is the dergee of the angle?",
        choice1:45,
        choice2:135,
        answer:1,
    },
    {
        imgsrc:"https://etc.usf.edu/clipart/42000/42008/pro_45_42008_lg.gif",
        alt:"identity",
        question:"What is the name of the angle?",
        choice1:"Acute",
        choice2:"Obtuse",
        answer:1,
    }, 
    {
        imgsrc:"https://etc.usf.edu/clipart/42000/42009/pro_50_42009_lg.gif",
        alt:"quantity",
        question:"What is the dergee of the angle?",
        choice1:50,
        choice2:130,
        answer:1,
    },
    {
        imgsrc:"https://etc.usf.edu/clipart/42000/42009/pro_50_42009_lg.gif",
        alt:"identity",
        question:"What is the name of the angle?",
        choice1:"Acute",
        choice2:"Obtuse",
        answer:1,
    }, 
    {
        imgsrc:"https://etc.usf.edu/clipart/42000/42010/pro_55_42010_lg.gif",
        alt:"quantity",
        question:"What is the dergee of the angle?",
        choice1:55,
        choice2:125,
        answer:1,
    },
    {
        imgsrc:"https://etc.usf.edu/clipart/42000/42010/pro_55_42010_lg.gif",
        alt:"identity",
        question:"What is the name of the angle?",
        choice1:"Acute",
        choice2:"Obtuse",
        answer:1,
    }, 
    {
        imgsrc:"https://etc.usf.edu/clipart/42000/42011/pro_60_42011_lg.gif",
        alt:"quantity",
        question:"What is the dergee of the angle?",
        choice1:60,
        choice2:120,
        answer:1,
    },
    {
        imgsrc:"https://etc.usf.edu/clipart/42000/42011/pro_60_42011_lg.gif",
        alt:"identity",
        question:"What is the name of the angle?",
        choice1:"Acute",
        choice2:"Obtuse",
        answer:1,
    }, 
    {
        imgsrc:"https://etc.usf.edu/clipart/42000/42012/pro_65_42012_lg.gif",
        alt:"quantity",
        question:"What is the dergee of the angle?",
        choice1:65,
        choice2:115,
        answer:1,
    },
    {
        imgsrc:"https://etc.usf.edu/clipart/42000/42012/pro_65_42012_lg.gif",
        alt:"identity",
        question:"What is the name of the angle?",
        choice1:"Acute",
        choice2:"Obtuse",
        answer:1,
    }, 
    {
        imgsrc:"https://etc.usf.edu/clipart/42000/42013/pro_70_42013_lg.gif",
        alt:"quantity",
        question:"What is the dergee of the angle?",
        choice1:70,
        choice2:110,
        answer:1,
    },
    {
        imgsrc:"https://etc.usf.edu/clipart/42000/42013/pro_70_42013_lg.gif",
        alt:"identity",
        question:"What is the name of the angle?",
        choice1:"Acute",
        choice2:"Obtuse",
        answer:1,
    }, 
    {
        imgsrc:"https://etc.usf.edu/clipart/42000/42014/pro_75_42014_lg.gif",
        alt:"quantity",
        question:"What is the dergee of the angle?",
        choice1:75,
        choice2:105,
        answer:1,
    },
    {
        imgsrc:"https://etc.usf.edu/clipart/42000/42014/pro_75_42014_lg.gif",
        alt:"identity",
        question:"What is the name of the angle?",
        choice1:"Acute",
        choice2:"Obtuse",
        answer:1,
    }, 
    {
        imgsrc:"https://etc.usf.edu/clipart/42000/42015/pro_80_42015_lg.gif",
        alt:"quantity",
        question:"What is the dergee of the angle?",
        choice1:80,
        choice2:100,
        answer:1,
    },
    {
        imgsrc:"https://etc.usf.edu/clipart/42000/42015/pro_80_42015_lg.gif",
        alt:"identity",
        question:"What is the name of the angle?",
        choice1:"Acute",
        choice2:"Obtuse",
        answer:1,
    }, 
    {
        imgsrc:"https://etc.usf.edu/clipart/42000/42016/pro_85_42016_lg.gif",
        alt:"quantity",
        question:"What is the dergee of the angle?",
        choice1:85,
        choice2:95,
        answer:1,
    },
    {
        imgsrc:"https://etc.usf.edu/clipart/42000/42016/pro_85_42016_lg.gif",
        alt:"identity",
        question:"What is the name of the angle?",
        choice1:"Acute",
        choice2:"Obtuse",
        answer:1,
    }, 
    {
        imgsrc:"https://etc.usf.edu/clipart/42000/42017/pro_90_42017_lg.gif",
        alt:"quantity",
        question:"What is the dergee of the angle?",
        choice1:90,
        choice2:0,
        answer:1,
    },
    {
        imgsrc:"https://etc.usf.edu/clipart/42000/42017/pro_90_42017_lg.gif",
        alt:"identity",
        question:"What is the name of the angle?",
        choice1:"Acute",
        choice2:"Right",
        answer:2,
    }, 
    {
        imgsrc:"https://etc.usf.edu/clipart/42000/42018/pro_95_42018_lg.gif",
        alt:"quantity",
        question:"What is the dergee of the angle?",
        choice1:85,
        choice2:95,
        answer:2,
    },
    {
        imgsrc:"https://etc.usf.edu/clipart/42000/42018/pro_95_42018_lg.gif",
        alt:"identity",
        question:"What is the name of the angle?",
        choice1:"Acute",
        choice2:"Obtuse",
        answer:2,
    }, 
    {
        imgsrc:"https://etc.usf.edu/clipart/42000/42019/pro_100_42019_lg.gif",
        alt:"quantity",
        question:"What is the dergee of the angle?",
        choice1:80,
        choice2:100,
        answer:2,
    },
    {
        imgsrc:"https://etc.usf.edu/clipart/42000/42019/pro_100_42019_lg.gif",
        alt:"identity",
        question:"What is the name of the angle?",
        choice1:"Acute",
        choice2:"Obtuse",
        answer:2,
    }, 
    {
        imgsrc:"https://etc.usf.edu/clipart/42000/42020/pro_105_42020_lg.gif",
        alt:"quantity",
        question:"What is the dergee of the angle?",
        choice1:75,
        choice2:105,
        answer:2,
    },
    {
        imgsrc:"https://etc.usf.edu/clipart/42000/42020/pro_105_42020_lg.gif",
        alt:"identity",
        question:"What is the name of the angle?",
        choice1:"Acute",
        choice2:"Obtuse",
        answer:2,
    }, 
    {
        imgsrc:"https://etc.usf.edu/clipart/42000/42021/pro_110_42021_lg.gif",
        alt:"quantity",
        question:"What is the dergee of the angle?",
        choice1:70,
        choice2:110,
        answer:2,
    },
    {
        imgsrc:"https://etc.usf.edu/clipart/42000/42021/pro_110_42021_lg.gif",
        alt:"identity",
        question:"What is the name of the angle?",
        choice1:"Acute",
        choice2:"Obtuse",
        answer:2,
    },
    {
        imgsrc:"https://etc.usf.edu/clipart/42000/42022/pro_115_42022_lg.gif",
        alt:"quantity",
        question:"What is the dergee of the angle?",
        choice1:65,
        choice2:115,
        answer:2,
    },
    {
        imgsrc:"https://etc.usf.edu/clipart/42000/42022/pro_115_42022_lg.gif",
        alt:"identity",
        question:"What is the name of the angle?",
        choice1:"Acute",
        choice2:"Obtuse",
        answer:2,
    },  
    {
        imgsrc:"https://etc.usf.edu/clipart/42000/42023/pro_120_42023_lg.gif",
        alt:"quantity",
        question:"What is the dergee of the angle?",
        choice1:60,
        choice2:120,
        answer:2,
    },
    {
        imgsrc:"https://etc.usf.edu/clipart/42000/42023/pro_120_42023_lg.gif",
        alt:"identity",
        question:"What is the name of the angle?",
        choice1:"Acute",
        choice2:"Obtuse",
        answer:2,
    }, 
    {
        imgsrc:"https://etc.usf.edu/clipart/42000/42024/pro_125_42024_lg.gif",
        alt:"quantity",
        question:"What is the dergee of the angle?",
        choice1:55,
        choice2:125,
        answer:2,
    },
    {
        imgsrc:"https://etc.usf.edu/clipart/42000/42024/pro_125_42024_lg.gif",
        alt:"identity",
        question:"What is the name of the angle?",
        choice1:"Acute",
        choice2:"Obtuse",
        answer:2,
    }, 
    {
        imgsrc:"https://etc.usf.edu/clipart/42000/42025/pro_130_42025_lg.gif",
        alt:"quantity",
        question:"What is the dergee of the angle?",
        choice1:50,
        choice2:130,
        answer:2,
    },
    {
        imgsrc:"https://etc.usf.edu/clipart/42000/42025/pro_130_42025_lg.gif",
        alt:"identity",
        question:"What is the name of the angle?",
        choice1:"Acute",
        choice2:"Obtuse",
        answer:2,
    }, 
    {
        imgsrc:"https://etc.usf.edu/clipart/42000/42026/pro_135_42026_lg.gif",
        alt:"quantity",
        question:"What is the dergee of the angle?",
        choice1:45,
        choice2:135,
        answer:2,
    },
    {
        imgsrc:"https://etc.usf.edu/clipart/42000/42026/pro_135_42026_lg.gif",
        alt:"identity",
        question:"What is the name of the angle?",
        choice1:"Acute",
        choice2:"Obtuse",
        answer:2,
    }, 
    {
        imgsrc:"https://etc.usf.edu/clipart/42000/42027/pro_140_42027_lg.gif",
        alt:"quantity",
        question:"What is the dergee of the angle?",
        choice1:40,
        choice2:140,
        answer:2,
    },
    {
        imgsrc:"https://etc.usf.edu/clipart/42000/42027/pro_140_42027_lg.gif",
        alt:"identity",
        question:"What is the name of the angle?",
        choice1:"Acute",
        choice2:"Obtuse",
        answer:2,
    }, 
    {
        imgsrc:"https://etc.usf.edu/clipart/42000/42028/pro_145_42028_lg.gif",
        alt:"quantity",
        question:"What is the dergee of the angle?",
        choice1:35,
        choice2:145,
        answer:2,
    },
    {
        imgsrc:"https://etc.usf.edu/clipart/42000/42028/pro_145_42028_lg.gif",
        alt:"identity",
        question:"What is the name of the angle?",
        choice1:"Acute",
        choice2:"Obtuse",
        answer:2,
    },
    {
        imgsrc:"https://etc.usf.edu/clipart/42000/42029/pro_150_42029_lg.gif",
        alt:"quantity",
        question:"What is the dergee of the angle?",
        choice1:30,
        choice2:150,
        answer:2,
    },
    {
        imgsrc:"https://etc.usf.edu/clipart/42000/42029/pro_150_42029_lg.gif",
        alt:"identity",
        question:"What is the name of the angle?",
        choice1:"Acute",
        choice2:"Obtuse",
        answer:2,
    },
    {
        imgsrc:"https://etc.usf.edu/clipart/42000/42030/pro_155_42030_lg.gif",
        alt:"quantity",
        question:"What is the dergee of the angle?",
        choice1:25,
        choice2:155,
        answer:2,
    },
    {
        imgsrc:"https://etc.usf.edu/clipart/42000/42030/pro_155_42030_lg.gif",
        alt:"identity",
        question:"What is the name of the angle?",
        choice1:"Acute",
        choice2:"Obtuse",
        answer:2,
    },  
    {
        imgsrc:"https://etc.usf.edu/clipart/42000/42031/pro_160_42031_lg.gif",
        alt:"quantity",
        question:"What is the dergee of the angle?",
        choice1:20,
        choice2:160,
        answer:2,
    },
    {
        imgsrc:"https://etc.usf.edu/clipart/42000/42031/pro_160_42031_lg.gif",
        alt:"identity",
        question:"What is the name of the angle?",
        choice1:"Acute",
        choice2:"Obtuse",
        answer:2,
    },
    {
        imgsrc:"https://etc.usf.edu/clipart/42000/42032/pro_165_42032_lg.gif",
        alt:"quantity",
        question:"What is the dergee of the angle?",
        choice1:15,
        choice2:165,
        answer:2,
    },
    {
        imgsrc:"https://etc.usf.edu/clipart/42000/42032/pro_165_42032_lg.gif",
        alt:"identity",
        question:"What is the name of the angle?",
        choice1:"Acute",
        choice2:"Obtuse",
        answer:2,
    },
    {
        imgsrc:"https://etc.usf.edu/clipart/42000/42034/pro_175_42034_lg.gif",
        alt:"quantity",
        question:"What is the dergee of the angle?",
        choice1:10,
        choice2:170,
        answer:2,
    },
    {
        imgsrc:"https://etc.usf.edu/clipart/42000/42034/pro_175_42034_lg.gif",
        alt:"identity",
        question:"What is the name of the angle?",
        choice1:"Acute",
        choice2:"Obtuse",
        answer:2,
    },  
    {
        imgsrc:"https://etc.usf.edu/clipart/42000/42033/pro_170_42033_lg.gif",
        alt:"quantity",
        question:"What is the dergee of the angle?",
        choice1:5,
        choice2:175,
        answer:2,
    },
    {
        imgsrc:"https://etc.usf.edu/clipart/42000/42033/pro_170_42033_lg.gif",
        alt:"identity",
        question:"What is the name of the angle?",
        choice1:"Acute",
        choice2:"Obtuse",
        answer:2,
    },  
];
shuffle(questions);
const CORRECT_BONUS=5;
let Questions=[];
for (let index = 0; index < 20; index++) {
    Questions.push(getRandomfromList(questions));
}
const MAX_QUESTIONS=Questions.length;
startgame=()=>{
    queCount=0;
    score=0;
    availabelQue=[...Questions];
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
    img.setAttribute("src",currentQue.imgsrc);
    img.setAttribute("style","width:256px;height:153.5px");
    img.setAttribute("alt",currentQue.alt);
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
