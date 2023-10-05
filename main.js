const transactionsUl = document.querySelector('#transactions');
const incomeDisplay = document.querySelector('#money-plus');
const expenseDisplay = document.querySelector('#money-minus');
const totalDisplay = document.querySelector('#balance');
const deleteTransaction = document.querySelector('#delete-btn');
const form = document.querySelector('#form');
const inputName = document.querySelector('#text');
const inputAmount = document.querySelector('#amount');

const dummyTransactions = [
    { id: 1, name: 'Bolo de pote', amount: -20 },
    { id: 2, name: 'Salario', amount: 3000 },
    { id: 3, name: 'Aluguel', amount: -780 },
    { id: 4, name: 'Carro', amount: -580 },
    { id: 5, name: 'Vendas', amount: 2880 },
]

const addTransactionsDOM = transaction => {
    const operator = transaction.amount < 0 ? '-' : '+';
    const CSSClass = transaction.amount < 0 ? 'minus' : 'plus';
    const amountOperator = Math.abs(transaction.amount);
    const li = document.createElement('li')

    li.classList.add(CSSClass)
    li.innerHTML = `
            ${transaction.name} <span>${operator} R$ ${amountOperator}</span><button class="delete-btn">x</button>
    `;

    transactionsUl.prepend(li)

}

const updateValue = () => {
    const transactionAmounts = dummyTransactions.map(item => item.amount)
    const total = transactionAmounts
        .reduce((accumulator, transaction) => accumulator + transaction, 0)
        .toFixed(2);

    const income = transactionAmounts
        .filter(value => value > 0)
        .reduce((accumulator, value) => accumulator + value, 0)
        .toFixed(2);

    const expense = transactionAmounts
        .filter(value => value < 0)
        .reduce((accumulator, value) => accumulator + value, 0)
        .toFixed(2);

    incomeDisplay.textContent = `R$ ${income}`;
    expenseDisplay.innerHTML = `R$ ${expense}`;
    totalDisplay.innerHTML = `R$ ${total}`;
}


const init = () => {
    transactionsUl.innerHTML = ''
    dummyTransactions.forEach(addTransactionsDOM)
    updateValue()
}

init()

const generateID = () => Math.round(Math.random() * 1000)

form.addEventListener('submit', event =>{
    event.preventDefault()

    const nameValue = inputName.value.trim();
    const amountValue = inputAmount.value.trim();
    const idValue = generateID();

    if(nameValue === '' || amountValue === ''){
        alert(`campo vazio`)
        return
    }
    const transaction = ({ 
        id: idValue, 
        name: nameValue, 
        amount: Number(amountValue)
    });

    dummyTransactions.push(transaction)
    init()

    inputName.value = ''
    inputAmount.value = ''

})

console.log(deleteTransaction)