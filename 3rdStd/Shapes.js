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
        imgsrc:"https://us.123rf.com/450wm/bankrx/bankrx1810/bankrx181000052/109045129-stock-vector-color-tangram-puzzle-in-dog-or-wolf-shape-on-white-background.jpg?ver=6",
        alt:"quantity",
        question:"What is the total number of shapes in this image?",
        choice1:6,
        choice2:7,
        choice3:8,
        choice4:9, 
        answer:2,
    },
    {
        imgsrc:"https://us.123rf.com/450wm/bankrx/bankrx1810/bankrx181000052/109045129-stock-vector-color-tangram-puzzle-in-dog-or-wolf-shape-on-white-background.jpg?ver=6",
        alt:"identity",
        question:"What is the name of the sky blue coloured shape?",
        choice1:"Square",
        choice2:"Rectangle",
        choice3:"Triangle",
        choice4:"Circle", 
        answer:3,
    },
    {
        imgsrc:"https://us.123rf.com/450wm/bankrx/bankrx1810/bankrx181000052/109045129-stock-vector-color-tangram-puzzle-in-dog-or-wolf-shape-on-white-background.jpg?ver=6",
        alt:"identity",
        question:"What is the name of the red coloured shape?",
        choice1:"Square",
        choice2:"Rectangle",
        choice3:"Triangle",
        choice4:"Circle", 
        answer:3,
    },
    {
        imgsrc:"https://us.123rf.com/450wm/bankrx/bankrx1810/bankrx181000052/109045129-stock-vector-color-tangram-puzzle-in-dog-or-wolf-shape-on-white-background.jpg?ver=6",
        alt:"identity",
        question:"What is the name of the green coloured shape?",
        choice1:"Square",
        choice2:"Rectangle",
        choice3:"Triangle",
        choice4:"Circle", 
        answer:3,
    },
    {
        imgsrc:"https://us.123rf.com/450wm/bankrx/bankrx1810/bankrx181000052/109045129-stock-vector-color-tangram-puzzle-in-dog-or-wolf-shape-on-white-background.jpg?ver=6",
        alt:"identity",
        question:"What is the name of the yellow coloured shape?",
        choice1:"Square",
        choice2:"Rectangle",
        choice3:"Triangle",
        choice4:"Circle", 
        answer:3,
    },
    {
        imgsrc:"https://us.123rf.com/450wm/bankrx/bankrx1810/bankrx181000052/109045129-stock-vector-color-tangram-puzzle-in-dog-or-wolf-shape-on-white-background.jpg?ver=6",
        alt:"identity",
        question:"What is the name of the orange coloured shape?",
        choice1:"Square",
        choice2:"Rectangle",
        choice3:"Triangle",
        choice4:"Circle", 
        answer:1,
    },
    {
        imgsrc:"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRhq_p0WhVtC-O-PUfE73q0XM6AJ-6FpLzOMQ&usqp=CAU",
        alt:"quantity",
        question:"What is the total number of shapes in this image?",
        choice1:6,
        choice2:7,
        choice3:8,
        choice4:9, 
        answer:2,
    },
    {
        imgsrc:"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRhq_p0WhVtC-O-PUfE73q0XM6AJ-6FpLzOMQ&usqp=CAU",
        alt:"identity",
        question:"What is the name of the orange coloured shape?",
        choice1:"Square",
        choice2:"Rectangle",
        choice3:"Triangle",
        choice4:"Circle", 
        answer:3,
    },
    {
        imgsrc:"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRhq_p0WhVtC-O-PUfE73q0XM6AJ-6FpLzOMQ&usqp=CAU",
        alt:"identity",
        question:"What is the name of the blue coloured shape?",
        choice1:"Square",
        choice2:"Rectangle",
        choice3:"Triangle",
        choice4:"Circle", 
        answer:3,
    },
    {
        imgsrc:"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRhq_p0WhVtC-O-PUfE73q0XM6AJ-6FpLzOMQ&usqp=CAU",
        alt:"identity",
        question:"What is the name of the green coloured shape?",
        choice1:"Square",
        choice2:"Rectangle",
        choice3:"Triangle",
        choice4:"Circle", 
        answer:3,
    },
    {
        imgsrc:"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRhq_p0WhVtC-O-PUfE73q0XM6AJ-6FpLzOMQ&usqp=CAU",
        alt:"identity",
        question:"What is the name of the white coloured shape?",
        choice1:"Square",
        choice2:"Rectangle",
        choice3:"Triangle",
        choice4:"Circle", 
        answer:3,
    },
    {
        imgsrc:"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRhq_p0WhVtC-O-PUfE73q0XM6AJ-6FpLzOMQ&usqp=CAU",
        alt:"identity",
        question:"What is the name of the yellow coloured shape?",
        choice1:"Square",
        choice2:"Rectangle",
        choice3:"Triangle",
        choice4:"Circle", 
        answer:1,
    },
    {
        imgsrc:"https://media.pixcove.com/B/9/9/Puzzle-Mystery-Textures-Backgrounds-Tangram-Chines-2629.jpg",
        alt:"quantity",
        question:"What is the total number of shapes in this image?",
        choice1:6,
        choice2:7,
        choice3:8,
        choice4:9, 
        answer:2,
    },
    {
        imgsrc:"https://media.pixcove.com/B/9/9/Puzzle-Mystery-Textures-Backgrounds-Tangram-Chines-2629.jpg",
        alt:"identity",
        question:"What is the name of the yellow coloured shape?",
        choice1:"Square",
        choice2:"Rectangle",
        choice3:"Triangle",
        choice4:"Circle", 
        answer:3,
    },
    {
        imgsrc:"https://media.pixcove.com/B/9/9/Puzzle-Mystery-Textures-Backgrounds-Tangram-Chines-2629.jpg",
        alt:"identity",
        question:"What is the name of the dark blue coloured shape?",
        choice1:"Square",
        choice2:"Rectangle",
        choice3:"Triangle",
        choice4:"Circle", 
        answer:3,
    },

    {
        imgsrc:"https://media.pixcove.com/B/9/9/Puzzle-Mystery-Textures-Backgrounds-Tangram-Chines-2629.jpg",
        alt:"identity",
        question:"What is the name of the dark green coloured shape?",
        choice1:"Square",
        choice2:"Rectangle",
        choice3:"Triangle",
        choice4:"Circle", 
        answer:3,
    },
    {
        imgsrc:"https://media.pixcove.com/B/9/9/Puzzle-Mystery-Textures-Backgrounds-Tangram-Chines-2629.jpg",
        alt:"identity",
        question:"What is the name of the light green coloured shape?",
        choice1:"Square",
        choice2:"Rectangle",
        choice3:"Triangle",
        choice4:"Circle", 
        answer:1,
    },
    {
        imgsrc:"https://i.pinimg.com/236x/91/6a/0f/916a0fdfbca2eeeaf69670b82c70be16--tangram-solution.jpg",
        alt:"quantity",
        question:"What is the total number of shapes in this image?",
        choice1:6,
        choice2:7,
        choice3:8,
        choice4:9, 
        answer:2,
    },
    {
        imgsrc:"https://i.pinimg.com/236x/91/6a/0f/916a0fdfbca2eeeaf69670b82c70be16--tangram-solution.jpg",
        alt:"identity",
        question:"What is the name of the pink coloured shape?",
        choice1:"Square",
        choice2:"Rectangle",
        choice3:"Triangle",
        choice4:"Circle", 
        answer:3,
    },
    {
        imgsrc:"https://i.pinimg.com/236x/91/6a/0f/916a0fdfbca2eeeaf69670b82c70be16--tangram-solution.jpg",
        alt:"identity",
        question:"What is the name of the blue coloured shape?",
        choice1:"Square",
        choice2:"Rectangle",
        choice3:"Triangle",
        choice4:"Circle", 
        answer:3,
    },
    {
        imgsrc:"https://i.pinimg.com/236x/91/6a/0f/916a0fdfbca2eeeaf69670b82c70be16--tangram-solution.jpg",
        alt:"identity",
        question:"What is the name of the orange coloured shape?",
        choice1:"Square",
        choice2:"Rectangle",
        choice3:"Triangle",
        choice4:"Circle", 
        answer:3,
    },
    {
        imgsrc:"https://i.pinimg.com/236x/91/6a/0f/916a0fdfbca2eeeaf69670b82c70be16--tangram-solution.jpg",
        alt:"identity",
        question:"What is the name of the violet coloured shape?",
        choice1:"Square",
        choice2:"Rectangle",
        choice3:"Triangle",
        choice4:"Circle", 
        answer:3,
    },
    {
        imgsrc:"https://i.pinimg.com/236x/91/6a/0f/916a0fdfbca2eeeaf69670b82c70be16--tangram-solution.jpg",
        alt:"identity",
        question:"What is the name of the green coloured shape?",
        choice1:"Square",
        choice2:"Rectangle",
        choice3:"Triangle",
        choice4:"Circle", 
        answer:1,
    },
    {
        imgsrc:"https://i.pinimg.com/236x/91/6a/0f/916a0fdfbca2eeeaf69670b82c70be16--tangram-solution.jpg",
        alt:"identity",
        question:"What is the name of the blue and orange coloured shape together?",
        choice1:"Square",
        choice2:"Rectangle",
        choice3:"Triangle",
        choice4:"Circle", 
        answer:1,
    },
    {
        imgsrc:"https://i.pinimg.com/236x/91/6a/0f/916a0fdfbca2eeeaf69670b82c70be16--tangram-solution.jpg",
        alt:"identity",
        question:"What is the name of the red, yellow, violet, orange and blue coloured shape together?",
        choice1:"Square",
        choice2:"Rectangle",
        choice3:"Triangle",
        choice4:"Circle", 
        answer:2,
    },
    {
        imgsrc:"https://i.pinimg.com/236x/91/6a/0f/916a0fdfbca2eeeaf69670b82c70be16--tangram-solution.jpg",
        alt:"identity",
        question:"What is the name of the red, yellow and violet coloured shape together?",
        choice1:"Square",
        choice2:"Rectangle",
        choice3:"Triangle",
        choice4:"Circle", 
        answer:2,
    },
    {
        imgsrc:"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTcfzETf0TnNq2768rEHNZtuOQeDjVCZ6RKrw&usqp=CAU",
        alt:"identity",
        question:"What is the name of the orange coloured shape?",
        choice1:"Square",
        choice2:"Rectangle",
        choice3:"Triangle",
        choice4:"Circle", 
        answer:3,
    },
    {
        imgsrc:"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTcfzETf0TnNq2768rEHNZtuOQeDjVCZ6RKrw&usqp=CAU",
        alt:"quantity",
        question:"What is the total number of shapes?",
        choice1:1,
        choice2:2,
        choice3:3,
        choice4:4, 
        answer:4,
    },
    {
        imgsrc:"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTcfzETf0TnNq2768rEHNZtuOQeDjVCZ6RKrw&usqp=CAU",
        alt:"identity",
        question:"What is the name of the shape which is twice in quantity?",
        choice1:"Square",
        choice2:"Rectangle",
        choice3:"Triangle",
        choice4:"Circle", 
        answer:1,
    },
    {
        imgsrc:"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTcfzETf0TnNq2768rEHNZtuOQeDjVCZ6RKrw&usqp=CAU",
        alt:"identity",
        question:"What is the name of the biggest shape?",
        choice1:"Square",
        choice2:"Rectangle",
        choice3:"Triangle",
        choice4:"Circle", 
        answer:2,
    },
    {
        imgsrc:"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcT3Ljv9uT0OQ53dOtjaQlLK0t15i0NmhTROLg&usqp=CAU",
        alt:"identity",
        question:"What is the name of the majority of the shape?",
        choice1:"Square",
        choice2:"Rectangle",
        choice3:"Triangle",
        choice4:"Circle", 
        answer:3,
    },
    {
        imgsrc:"https://img.favpng.com/23/16/4/tangram-jigsaw-puzzles-triangle-geometric-shape-square-png-favpng-nSsQ6v5SCh8YeB70QpU6KibCj.jpg",
        alt:"quantity",
        question:"What is the total number of triangular shapes?",
        choice1:5,
        choice2:6,
        choice3:7,
        choice4:8, 
        answer:1,
    },
    {
        imgsrc:"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQRYLTuSXnj5F1F2yOIh3g-zDEXyMX_BU6XDg&usqp=CAU",
        alt:"quantity",
        question:"What is the total number of shapes?",
        choice1:1,
        choice2:2,
        choice3:3,
        choice4:4, 
        answer:3,
    },
    {
        imgsrc:"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQRYLTuSXnj5F1F2yOIh3g-zDEXyMX_BU6XDg&usqp=CAU",
        alt:"quantity",
        question:"What is the total number of circular shapes?",
        choice1:1,
        choice2:2,
        choice3:3,
        choice4:4, 
        answer:1,
    },
    {
        imgsrc:"https://toeholds.files.wordpress.com/2010/08/abstractshapes.png",
        alt:"identity",
        question:"What is the name of the red colour shape?",
        choice1:"Square",
        choice2:"Rectangle",
        choice3:"Triangle",
        choice4:"Circle", 
        answer:1,
    },
    {
        imgsrc:"https://toeholds.files.wordpress.com/2010/08/abstractshapes.png",
        alt:"identity",
        question:"What is the name of the orange colour shape?",
        choice1:"Square",
        choice2:"Rectangle",
        choice3:"Triangle",
        choice4:"Circle", 
        answer:3,
    },
    {
        imgsrc:"https://toeholds.files.wordpress.com/2010/08/abstractshapes.png",
        alt:"identity",
        question:"What is the name of the blue colour shape?",
        choice1:"Square",
        choice2:"Rectangle",
        choice3:"Triangle",
        choice4:"Circle", 
        answer:4,
    },
    {
        imgsrc:"https://cdn2.iconfinder.com/data/icons/large-svg-icons-part-3/512/shapes_basic_3d_shares_yellow-512.png",
        alt:"identity",
        question:"What is the name of the red colour shape?",
        choice1:"Square",
        choice2:"Rectangle",
        choice3:"Triangle",
        choice4:"Circle", 
        answer:4,
    },
    {
        imgsrc:"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQb1m4NCQx1ZQtEgqSP5wMj_gi64RdVG56SqA&usqp=CAU",
        alt:"identity",
        question:"What is the name of the red colour shape?",
        choice1:"Square",
        choice2:"Rectangle",
        choice3:"Triangle",
        choice4:"Circle", 
        answer:4,
    },
    {
        imgsrc:"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQb1m4NCQx1ZQtEgqSP5wMj_gi64RdVG56SqA&usqp=CAU",
        alt:"quantity",
        question:"What is the total number of shapes?",
        choice1:1,
        choice2:2,
        choice3:3,
        choice4:4, 
        answer:4,
    },
    {
        imgsrc:"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQb1m4NCQx1ZQtEgqSP5wMj_gi64RdVG56SqA&usqp=CAU",
        alt:"quantity",
        question:"What is the total number of circular shapes?",
        choice1:1,
        choice2:2,
        choice3:3,
        choice4:4, 
        answer:2,
    },
    {
        imgsrc:"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQb1m4NCQx1ZQtEgqSP5wMj_gi64RdVG56SqA&usqp=CAU",
        alt:"identity",
        question:"What is the name of the yellow colour shape?",
        choice1:"Square",
        choice2:"Rectangle",
        choice3:"Triangle",
        choice4:"Circle", 
        answer:4,
    },
    {
        imgsrc:"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQb1m4NCQx1ZQtEgqSP5wMj_gi64RdVG56SqA&usqp=CAU",
        alt:"identity",
        question:"What is the name of the gray colour shape?",
        choice1:"Square",
        choice2:"Rectangle",
        choice3:"Triangle",
        choice4:"Circle", 
        answer:4,
    }
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
