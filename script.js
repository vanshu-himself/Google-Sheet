const tablehead = document.getElementById('table-heading-row');
const tablebody = document.getElementById('table-body');


let currentCell;

let cutValue = {};
///
const leftbtn = document.getElementById('left');
const centerbtn = document.getElementById('center');
const rightbtn = document.getElementById('right');
///
const fontSize = document.getElementById('font-size');
const fontFamily = document.getElementById('font-family');
///
const cutButton = document.getElementById('cut-btn');
const copyButton = document.getElementById('copy-btn');
const pasteButton = document.getElementById('paste-btn');
///
const textColor = document.getElementById('text-color');
const bgColor = document.getElementById('bg-color');
//
downloadButton=document.getElementById('download-btn');
//
let rows = 100;
let cols = 26;
let matrix = new Array(rows);
for (let i = 0; i < rows; i++) {
    matrix[i] = new Array(cols);
    for (let j = 0; j < cols; j++) {
        matrix[i][j] = {};
    }
}//updatefunction
function updateMatrix(currentCell) {
    let obj = {
        style: currentCell.style.cssText,
        text: currentCell.innerText,
        id: currentCell.id,


    }
    let id = currentCell.id.split("");
    let i = id[1] - 1;
    let j = id[0].charCodeAt(0) - 65;
    matrix[i][j] = obj;
}
function downloadJson(){
    const jsonString=JSON.stringify(matrix);
    const blob=new Blob([jsonString],{type:"application/json"});
    const link=document.createElement('a');
    link.href=URL.createObjectURL(blob);
    link.download="data.json";//this is file name
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
//left align
leftbtn.addEventListener('click', () => {
    currentCell.style.textAlign = "left";
    updateMatrix(currentCell);
});
centerbtn.addEventListener('click', () => {
    currentCell.style.textAlign = "center";
    updateMatrix(currentCell);
});
rightbtn.addEventListener('click', () => {
    currentCell.style.textAlign = "right";
    updateMatrix(currentCell);
})


//making bold button
document.getElementById('bold-btn').addEventListener('click', () => {
    if (currentCell.style.fontWeight == "bold") {
        currentCell.style.fontWeight = "normal";
    } else {
        currentCell.style.fontWeight = "bold";
    } updateMatrix(currentCell);
})
//making italic
document.getElementById('italic-btn').addEventListener('click', () => {
    if (currentCell.style.fontStyle == "italic") {
        currentCell.style.fontStyle = "normal";
    }
    else { currentCell.style.fontStyle = "italic"; }
    updateMatrix(currentCell);
});
//making underline
document.getElementById('underline-btn').addEventListener('click', () => {
    if (currentCell.style.textDecoration == "underline") {
        
        currentCell.style.textDecoration = "none";
    }
    else { currentCell.style.textDecoration = "underline"; }
    updateMatrix(currentCell);

});

//to add heading
for (let col = 65; col <= 90; col++) {
    let th = document.createElement("th");
    th.innerHTML = String.fromCharCode(col);
    tablehead.append(th);
}

for (let row = 1; row <= 100; row++) {
    let tr = document.createElement('tr');
    let th = document.createElement('th');
    th.innerHTML = row;

    tr.appendChild(th);
    for (let col = 0; col < 26; col++) {
        let td = document.createElement('td');
        td.setAttribute("contenteditable", "true");
        td.setAttribute("id", `${String.fromCharCode(col + 65)}${row}`)
        td.addEventListener("focus", (event) => onFocus(event));
        td.addEventListener("input", (event) => onInputFunction(event));
        tr.append(td);

    }
    tablebody.appendChild(tr);
}//oninputfunction
function onInputFunction(event) {
    updateMatrix(event.target);
 

  
}
// document.getElementById('add-sheet-btn').addEventListener('click',()=>{
//     //logic for adding shet
//     //logic for savinf prev sheet
//     let numSheets=1;
//     if(numSheets==1){
//         var myArr=[matrix];
//         localStorage.setItem('ArrMatrix',JSON.stringify(myArr));

//     }else{
//         var prevSheets=JSON.parse(localStorage.getItem('ArrMatrix'));
//         var updatedSheets=[...prevSheets,matrix];
//         localStorage.setItem("ArrMatrix",JSON.stringify(updatedSheets));
//     }
//     //updated number of sheets
//     numSheets++;
//     //clean up virtual memory of excel which is matrix; 
//     for(let i=0;i<rows;i++){
//         matrix[i]=new Array(cols);
//         for(let j=0;j<cols;j++){
//             matrix[i][j]={};

//         }
//     }//cleaning up html of excel
//     tablebody.innerHTML='';

//     for (let row = 1; row <= 100; row++) {
//         let tr = document.createElement('tr');
//         let th = document.createElement('th');
//         th.innerHTML = row;
    
//         tr.appendChild(th);
//         for (let col = 0; col < 26; col++) {
//             let td = document.createElement('td');
//             td.setAttribute("contenteditable", "true");
//             td.setAttribute("id", `${String.fromCharCode(col + 65)}${row}`)
//             td.addEventListener("focus", (event) => onFocus(event));
//             td.addEventListener("input", (event) => onInputFunction(event));
//             tr.append(td);
    
//         }
//         tablebody.appendChild(tr);
//     }
// })
function onFocus(event) {
    currentCell = event.target;
    document.getElementById('current-cell').innerText = event.target.id;
}
//font-size
fontSize.addEventListener('change', () => {
    currentCell.style.fontSize = fontSize.value;
    updateMatrix(currentCell);
})
//font-family
fontFamily.addEventListener('change', () => {
    currentCell.style.fontFamily = fontFamily.value;
    updateMatrix(currentCell);
})
//cut-btn
cutButton.addEventListener('click', () => {
    cutValue = {
        style: currentCell.style.cssText,

        text: currentCell.innerText
    }

    currentCell.innerText = "";
    currentCell.style = null;
    updateMatrix(currentCell);
})//copy-Btn
copyButton.addEventListener('click', () => {
    cutValue = {
        style: currentCell.style.cssText,

        text: currentCell.innerText
    }

})
//paste-btn
pasteButton.addEventListener('click', () => {
    if (cutValue.text || cutValue.style) {
        currentCell.innerText = cutValue.text;
        currentCell.style = cutValue.style;
        updateMatrix(currentCell);

    }
})//textcolor
textColor.addEventListener('change', () => {
    currentCell.style.color = textColor.value;
    updateMatrix(currentCell);
})//bgcolor
bgColor.addEventListener('change', () => {
    currentCell.style.backgroundColor = bgColor.value;
    updateMatrix(currentCell);
})//upload functionality //readJsonFile is a function
document.getElementById('jsonfile').addEventListener('change',readJsonFile);

function readJsonFile(event){
    
    const file=event.target.files[0];
    
    if(file){//here we got our file
        const reader=new FileReader();

        

        reader.onload=function(e){
           
            const fileContent = e.target.result;
           
            try{
                const jsonData=JSON.parse(fileContent);
                matrix=jsonData;
              jsonData.forEach((row)=>{
                //cell is cell inside matrix
                row.forEach((cell)=>{
                    if(cell.id){
                        
                        //mycell is cell inside my DOM or real excel
                        var myCell=document.getElementById(cell.id);
                        myCell.innerText=cell.text;
                        myCell.style.cssText=cell.style;
                    }
                });
              })
            }
            catch (err){
                console.log("Error in reading file:",err);
            }
        }; reader.readAsText(file);
    }}













    