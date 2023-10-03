const transactionsUl = document.querySelector('#transactions');
const incomeDisplay = document.querySelector('#money-plus');
const expenseDisplay = document.querySelector('#money-minus');
const totalDisplay = document.querySelector('#balance');


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
    dummyTransactions.forEach(addTransactionsDOM)
    updateValue()
}
init()