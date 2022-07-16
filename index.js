const inputElement = document.querySelector('#input-el');
const inputButtonElement = document.querySelector('#input-btn');
const saveTabBtn = document.querySelector('#tab-btn');
const ulElement = document.querySelector('#ul-el');
const delBtnElement = document.querySelector('#del-btn');

let myLeads = [];
let listItems = "";

const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));

if(leadsFromLocalStorage){
    myLeads = leadsFromLocalStorage;
    renderLeads(myLeads);
};

function renderLeads(lead) {
    let listItems = ""
    for(let i = 0; i <lead.length; i++){
        listItems += `
            <li>
                <a href="${lead[i]}" target="_blank" rel="noopener noreferrer">
                    ${lead[i]}
                </a>
            </li>
        `
    }
    ulElement.innerHTML = listItems;
};

inputButtonElement.addEventListener('click', function() {
    myLeads.push(inputElement.value)
    localStorage.setItem("myLeads",JSON.stringify(myLeads));
    inputElement.value ="";
    renderLeads(myLeads);
});

saveTabBtn.addEventListener('click', function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads",JSON.stringify(myLeads));
        inputElement.value ="";
        renderLeads(myLeads);
    })
});

delBtnElement.addEventListener('dblclick', function() {
    localStorage.clear();
    myLeads = [];
    renderLeads(myLeads);
});




