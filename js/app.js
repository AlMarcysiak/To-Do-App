
const clear = document.querySelector(".clear");
const dataElement = document.getElementById("date");
const list = document.getElementById('list');
const input = document.getElementById("input");
const addBtn = document.querySelector(".fa fa-plus-circule")

const CHECK ="fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINIE_THROUGHT ="lineThrough";
//variable
let LIST ,id; 

let data = localStorage.getItem("TODO");
console.log(data);
if(data){
    LIST = JSON.parse(data);
    id = LIST.length;
    loadList(LIST);
    }else{
        LIST = [];
        id = 0; 
}

function loadList(array){
    array.forEach(function(item){
    addToDo(item.name, item.id, item.done, item.trash);
    });
}

clear.addEventListener('click', function(){
    localStorage.clear();
    location.reload();
});


const options = {weekend:'long', month:"short", day:"numeric" }
const today = new Date();
dataElement.innerHTML = today.toLocaleDateString("en-US", options);

function addToDo (toDoPar, id , done, trash){

    if(trash){
        return;
    }

    const DONE = done ? CHECK : UNCHECK;
    const LINE = done? LINIE_THROUGHT : "";

    const item = `<li class="item">
                        <i class="fa ${DONE} co " job="complete" id="${id}"></i>
                        <p class="text ${LINE}">${toDoPar}</p>
                        <i class=" fa fa-trash-o de" job ="delete" id="${id}"></i>
                    </li>`;

    const position = "beforeend";

    list.insertAdjacentHTML(position, item);
}

document.addEventListener('keyup', function(event){
    if(event.keyCode == 13){
        const toDoPar = input.value;
        const lenghtPar = toDoPar.length;
        const parLength = 23;
        if ( toDoPar && lenghtPar <= parLength ){
            addToDo(toDoPar, id, false, false);
            LIST.push({
                name:toDoPar,
                id: id,
                done:false,
                trash : false
            });
            localStorage.setItem("TODO", JSON.stringify(LIST));
            id++;
        }else if ( lenghtPar > parLength ){
            // error message
        }
        input.value = "";
    }
});

//Compleate to-do
function completeToDo( element){
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(LINIE_THROUGHT);

    LIST[element.id].done =LIST[element.id].done ? false : true;
   
}

//Remove to-do 
function removeToDo(element){
    element.parentNode.parentNode.removeChild(element.parentNode);

    LIST[element.id].trash = true;
}

list.addEventListener("click", function(event){
    const element = event.target; // return clicked element inside list
    const elementJob= element.attributes.job.value; 
    
    if(elementJob == "complete"){
        completeToDo(element);
    }else if (elementJob == "delete"){
        removeToDo(element);
    }
    localStorage.setItem("TODO", JSON.stringify(LIST));
});


