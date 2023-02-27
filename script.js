//1
const balance = document.getElementById(
    "balance"
  );
  const money_plus = document.getElementById(
    "money-plus"
  );
  const money_minus = document.getElementById(
    "money-minus"
  );
  var input = document.getElementById("date").value;
    var dateEntered = new Date(input);
  const list = document.getElementById("list");
  const form = document.getElementById("form");
  const text = document.getElementById("text");
  const amount = document.getElementById("amount");
  // const dummyTransactions = [
  //   { id: 1, text: "Flower", amount: -20 },
  //   { id: 2, text: "Salary", amount: 300 },
  //   { id: 3, text: "Book", amount: -10 },
  //   { id: 4, text: "Camera", amount: 150 },
  // ];
  
  // let transactions = dummyTransactions;
  
  //last 
  const localStorageTransactions = JSON.parse(localStorage.getItem('transactions'));
  console.log(localStorageTransactions)
  let transactions = localStorage.getItem('transactions') !== null ? localStorageTransactions : [];
  
  //5addTrans
  //Add Transaction
  function addTransaction(e){
    e.preventDefault();
    if(text.value.trim() === '' || amount.value.trim() === ''){
      alert('please add text and amount')
    }else{
      let date = new Date();
      const transaction = {
        id:generateID(),
        text:text.value,
        amount:+amount.value,
        date:[
          date.getFullYear(),
          padTo2Digits(date.getMonth() + 1),
          padTo2Digits(date.getDate())
        ].join('-')
      }
  
      transactions.push(transaction);
  
      addTransactionDOM(transaction);
      updateValues();
      updateLocalStorage();
      text.value='';
      amount.value='';
    }
  }

  
  
  
  //5.5
  //Generate Random ID
  function generateID(){
    return Math.floor(Math.random()*1000000000);
  }
  
  //2
  
  //Add Trasactions to DOM list
  function addTransactionDOM(transaction) {
    //GET sign
    const sign = transaction.amount < 0 ? "-" : "+";
    const item = document.createElement("li");
  
    //Add Class Based on Value
    item.classList.add(
      transaction.amount < 0 ? "minus" : "plus"
    );
  
    item.innerHTML = `
      ${transaction.text} <span>${sign}${Math.abs(
      transaction.amount
    )}</span>${transaction.date}</span>
      <button class="delete-btn" onclick="removeTransaction(${transaction.id})">x</button>
      `;
    list.appendChild(item);
  }
  const dateInput = document.getElementById('date');

// ✅ Using the visitor's timezone
dateInput.value = formatDate();

console.log(formatDate());

function padTo2Digits(num) {
  return num.toString().padStart(2, '0');
}

function generateXandY(){
  let graphData = {}
  console.log("test")
  let income = 0;
  let expence = 0;
  if (localStorageTransactions != null){
    for (let transaction of localStorageTransactions){
      if (transaction.amount> 0){
        income += transaction.amount
      } else {
        expence += transaction.amount
      }
    
    }
  }

  // console.log(income,expence)

  
  return {
    expence : expence,
    income : income
  }
}

// console.log(Object.keys(generateXandY()))
// console.log(Object.values(generateXandY()))
function formatDate(date = new Date()) {
  s=[
    date.getFullYear(),
    padTo2Digits(date.getMonth() + 1),
    padTo2Digits(date.getDate())
  ].join('-');
  console.log(s);
  return s;
}

function generatePDF() {
            
  // Choose the element id which you want to export.
  var element = document.getElementById('list');
  element.style.width = '700px';
  element.style.height = '900px';
  var opt = {
      margin:       0.5,
      filename:     'myfile.pdf',
      image:        { type: 'jpeg', quality: 1 },
      html2canvas:  { scale: 1 },
      jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait',precision: '12' }
    };
  
  // choose the element and pass it to html2pdf() function and call the save() on it to save as pdf.
  html2pdf().set(opt).from(element).save();
}


let myChart = document.getElementById('myChart').getContext('2d');

let graphData = generateXandY()

        let massPopChart = new Chart(myChart, {
            type:'doughnut',
            data:{
                labels:['income','expence'],
                datasets:[{
                    label:'expence',
                    data:[
                      graphData.income,
                   graphData.expence
                    // 10,20
                    ]
                }]
            },
            options:{}
        });






// ✅ Using UTC (universal coordinated time)
// dateInput.value = new Date().toISOString().split('T')[0];

// console.log(new Date().toISOString().split('T')[0]);

  //4
  
  //Update the balance income and expence
  function updateValues() {
    const amounts = transactions.map(
      (transaction) => transaction.amount
    );
    
    const total = amounts
      .reduce((acc, item) => (acc += item), 0)
      .toFixed(2);
    const income = amounts
      .filter((item) => item > 0)
      .reduce((acc, item) => (acc += item), 0)
      .toFixed(2);
    const expense =
      (amounts
        .filter((item) => item < 0)
        .reduce((acc, item) => (acc += item), 0) *
      -1).toFixed(2);
  
      balance.innerText=`$${total}`;
      money_plus.innerText = `$${income}`;
      money_minus.innerText = `$${expense}`;
      
  }
  
  
  //6 
  
  //Remove Transaction by ID
  function removeTransaction(id){
    transactions = transactions.filter(transaction => transaction.id !== id);
    updateLocalStorage();
    Init();
  }
  //last
  //update Local Storage Transaction
  function updateLocalStorage(){
    localStorage.setItem('transactions',JSON.stringify(transactions));
  }
  
  //3
  
  //Init App
  function Init() {
    list.innerHTML = "";
    transactions.forEach(addTransactionDOM);
    updateValues();
  }
  
  Init();
  
  function getRadioDetails(){
    var selectedVal = "";
var selected = $("input[type='radio'][name='amount-type']:checked");

if (selected.length > 0) {
    selectedVal = selected.val();
    let income = $("#amount").val();
    if (income > 0 && selectedVal < 0){

      $("#amount").val($("#amount").val()*selectedVal)
    }
}

  }
  form.addEventListener('submit',addTransaction);

