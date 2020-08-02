const mostrecentscore=localStorage.getItem("MostRecentScore");
const finalscore=document.getElementById("finalscore");
finalscore.innerText=mostrecentscore;
var std=[];
std[0]=['2ndStd/CuboidTorF.js','2ndStd/ConeTorF.js','2ndStd/CylinderTorF.js','2ndStd/SphereTorF.js','2ndStd/StraightLineTorF.js','2ndStd/CurvedLineTorF.js','2ndStd/RectangleTorF.js','2ndStd/CircleTorF.js','2ndStd/SquareTorF.js','2ndStd/TriangleTorF.js','2ndStd/addgrp(5-10).js','2ndStd/digplace.js','2ndStd/add(1-50).js','2ndStd/findpatt.js','2ndStd/sub(1-50).js','2ndStd/addsubrel.js','2ndStd/comparison.js','2ndStd/numline.js','2ndStd/asc_dsc.js','2ndStd/numcreate.js','2ndStd/ranks.js','2ndStd/addwtcry.js','2ndStd/subwbrw.js','2ndStd/mult.js']
std[1]=['3rdStd/addgrp.js','3rdStd/numcreate.js','3rdStd/numline.js','3rdStd/compare.js','3rdStd/largesmall.js','3rdStd/asc_dsc.js','3rdStd/digplace.js','3rdStd/addition.js','3rdStd/subwb.js','3rdStd/1dmult.js','3rdStd/pattgame.js','3rdStd/add999.js','3rdStd/sub999.js','3rdStd/2dmult.js','3rdStd/division.js','3rdStd/divwdcy.js','3rdStd/divgrp.js']
const name=localStorage.getItem("Title");
const Jlink=localStorage.getItem("JS-Link");
if (Jlink.includes('TorF')){
    document.getElementById("curr").setAttribute("href","question2.html")
}else{
    document.getElementById("curr").setAttribute("href","question.html")
}
for (let index = 0; index < std.length; index++) {
    console.log("LOL");
    if(std[index].includes(Jlink)){
        if(std[index].indexOf(Jlink)==std[index].length-1){
            var pre=document.getElementById("Pre");
            pre.setAttribute("data-js",std[index][(std[index].indexOf(Jlink))-1]);
            if (std[index][(std[index].indexOf(Jlink))-1].includes('TorF')){
                pre.setAttribute("href","question2.html")
            }else{
                pre.setAttribute("href","question.html")
            }
            
            console.log(pre,std[index][(std[index].indexOf(Jlink))-1]);
        }else if(std[index].indexOf(Jlink)==0){
            var post=document.getElementById("Next");
            post.setAttribute("data-js",std[index][(std[index].indexOf(Jlink))+1]);
            if (std[index][(std[index].indexOf(Jlink))+1].includes('TorF')){
                post.setAttribute("href","question2.html")
            }else{
                post.setAttribute("href","question.html")
            }
            console.log(post,std[index][(std[index].indexOf(Jlink))+1]);
        }else{
            var pre=document.getElementById("Pre");
            pre.setAttribute("data-js",std[index][(std[index].indexOf(Jlink))-1]);
            var post=document.getElementById("Next");
            post.setAttribute("data-js",std[index][(std[index].indexOf(Jlink))+1]);
            if (std[index][(std[index].indexOf(Jlink))+1].includes('TorF')){
                post.setAttribute("href","question2.html")
            }else{
                post.setAttribute("href","question.html")
            }
            if (std[index][(std[index].indexOf(Jlink))-1].includes('TorF')){
                pre.setAttribute("href","question2.html")
            }else{
                pre.setAttribute("href","question.html")
            }
            console.log(document.getElementById("Pre").dataset["js"],std[index][(std[index].indexOf(Jlink))-1]);
            console.log(document.getElementById("Next").dataset["js"],std[index][(std[index].indexOf(Jlink))+1]);
        }
    }
}
const stdn=document.getElementById("std");
stdn.innerHTML=name;
const choice = Array.from(document.getElementsByClassName("bttn"));
let acceptAns=true;
choice.forEach( choice => {
    choice.addEventListener("click", e =>{
        console.log("LLOOLL");
        if (!acceptAns) return;
        acceptAns=false;
        const selectedChoice=e.target;
        selectedAns=selectedChoice.dataset["js"];
        localStorage.setItem("JS-Link",selectedAns);
    });
});