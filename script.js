const btnAddTransaction = document.querySelector('.add-transaction')
const btnDeleteAll = document.querySelector('.delete-all')
const btnLight = document.querySelector('.light')
const btnDark = document.querySelector('.dark')
const btnSave = document.querySelector('.save')
const btnCancel = document.querySelector('.cancel')
const transactionPanel = document.querySelector('.add-transaction-panel')
const errorTransactionAmount = document.querySelector('.errorTransactionAmount')
const availableMoney= document.querySelector('.available-money')
const error = document.querySelector('.error')
const incomeArea = document.querySelector('.income-area')
const expensesArea = document.querySelector('.expenses-area')

const inputName = document.getElementById('name')
const inputAmount = document.getElementById('amount')
const selCategory = document.getElementById('category')

const root = document.querySelector(':root')

let moneyArr = []
let transactionId = 0
let selectedCategory = ''

const selectCategory = () => {
	selectedCategory = selCategory.options[selCategory.selectedIndex].text
}

selectCategory()

const openTransaction = () => {
	transactionPanel.style.display = 'flex'
	clearTransactionPanel()
}
const closeTransaction = () => {
	transactionPanel.style.display = 'none'
	clearTransactionPanel()
}

const darkMode = () => {
	root.style.setProperty('--first-color', '#14161F')
	root.style.setProperty('--second-color', '#F9F9F9')
	root.style.setProperty('--border-color', '#F9F9F9')
}
const lightMode = () => {
	root.style.setProperty('--first-color', '#F9F9F9')
	root.style.setProperty('--second-color', '#14161F')
	root.style.setProperty('--border-color', '#14161F')
}

const addTransaction = () => {
	if (inputAmount.value !== '0' && inputAmount.value !== '' && inputName.value !== '' && selCategory.value !== '') {
		if (inputAmount.value > '0') {
			addIncome()
			closeTransaction()
			clearTransactionPanel()
			calcAvailibleMoney()
		} else if (inputAmount.value < '0') {
			addExpenses()
			closeTransaction()
			clearTransactionPanel()
			calcAvailibleMoney()
		}
	} else {
		errorEmptyInput()
	}
}

const calcAvailibleMoney = params => {
	let moneySum = 0
	for (let i = 0; i < moneyArr.length; i++) {
		moneySum += moneyArr[i]
	}
	availableMoney.textContent = `${moneySum}zł`
}

const clearTransactionPanel = () => {
	inputName.value = ''
	inputAmount.value = ''
	selCategory.value = ''
	errorTransactionAmount.style.visibility = 'hidden'
	error.style.visibility = 'hidden'
}

const addIncome = () => {
	checkCategory(selectedCategory)
	const newIncome = document.createElement('div')
	newIncome.classList.add('transaction', 'income')
	newIncome.setAttribute('id', transactionId)
	newIncome.innerHTML = `<p class="transaction-name">
	${categoryIcon} ${inputName.value}</p>
	<p class="transaction-amount">${inputAmount.value}zł <button class="delete" onclick="deleteTransaction(${transactionId})"><i
				class="fas fa-times"></i></button></p>`
	transactionId++
	incomeArea.append(newIncome)
	moneyArr.push(parseFloat(inputAmount.value))
}
const addExpenses = () => {
	checkCategory(selectedCategory)
	const newExpenses = document.createElement('div')
	newExpenses.classList.add('transaction', 'expenses')
	newExpenses.setAttribute('id', transactionId)
	newExpenses.innerHTML = `<p class="transaction-name">
	${categoryIcon} ${inputName.value}</p>
	<p class="transaction-amount">${inputAmount.value}zł <button class="delete" onclick="deleteTransaction(${transactionId})"><i
				class="fas fa-times"></i></button></p>`
	transactionId++
	expensesArea.append(newExpenses)
	moneyArr.push(parseFloat(inputAmount.value))
}

const deleteTransaction = id => {
	const transactionToDelete = document.getElementById(id);
	const transactionAmount = parseFloat(transactionToDelete.childNodes[2].innerText)

	const indexOfTransaction = moneyArr.indexOf(transactionAmount)
	moneyArr.splice(indexOfTransaction, 1)
	calcAvailibleMoney()

	transactionToDelete.classList.contains('income')? incomeArea.removeChild(transactionToDelete) : expensesArea.removeChild(transactionToDelete)
}

const deleteAllTransactions = (params) => {
incomeArea.innerHTML = '<h3>Przychód:</h3>'
expensesArea.innerHTML = '<h3>Wydatki:</h3>'
availableMoney.textContent = '0zł'
moneyArr=[0]
}

const checkCategory = transaction => {
	switch (transaction) {
		case '[ + ] Przychód':
			categoryIcon = '<i class="fas fa-money-bill-wave"></i>'
			break
		case '[ - ] Zakupy':
			categoryIcon = '<i class="fas fa-cart-arrow-down"></i> '
			break
		case '[ - ] Jedzenie':
			categoryIcon = '<i class="fas fa-hamburger"></i>'
			break
		case '[ - ] Kino':
			categoryIcon = '<i class="fas fa-film"></i>'
			break
	}
}

const errorAmount = () => {
	if (parseInt(inputAmount.value) !== 0 && inputAmount.value !== '') {
		errorTransactionAmount.style.visibility = 'hidden'
	} else {
		errorTransactionAmount.style.visibility = 'visible'
	}
}
errorAmount()

const errorEmptyInput = () => {
	if (inputAmount.value === '0' || inputAmount.value === '' || inputName.value === '' || selCategory.value === '') {
		error.style.visibility = 'visible'
	}
}

btnAddTransaction.addEventListener('click', openTransaction)
btnCancel.addEventListener('click', closeTransaction)
btnDark.addEventListener('click', darkMode)
btnLight.addEventListener('click', lightMode)
btnSave.addEventListener('click', addTransaction)
btnDeleteAll.addEventListener('click', deleteAllTransactions)
