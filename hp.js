const choice = Array.from(document.getElementsByClassName("choice-topic"));
let acceptAns=true;
choice.forEach( choice => {
    choice.addEventListener("click", e =>{
        if (!acceptAns) return;
        acceptAns=false;
        const selectedChoice=e.target;
        selectedAns=selectedChoice.dataset["js"];
        selectedAnS=document.getElementById("linklist").dataset["title"];
        localStorage.setItem("JS-Link",selectedAns);
        localStorage.setItem("Title",selectedAnS);
    });
});
