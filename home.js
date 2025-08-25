const pin = 1234;
const number11Digit = 12345678910;

const transactionData = []

// get input value
function getInputValue(id) {
    const bankAccountNumber = document.getElementById(id).value
    return bankAccountNumber;
}
// get input value number
function getInputValueNumber(id) {
    const getInputFieldValue = parseInt(document.getElementById(id).value);
    return getInputFieldValue;
}
// get inner text
function getInnerText(id) {
    const availableBalance = document.getElementById('available-balance').innerText
    const availableBalanceValue = parseInt(availableBalance)
    return availableBalanceValue;
}
// set inner text
function setInnerText(value) {
    const setAvailableBalance = document.getElementById('available-balance')
    setAvailableBalance.innerText = value;
}

// reset input field
function resetFields(ids) {
    ids.forEach(id => {
        const element = document.getElementById(id);
        if (!element) return;
        if (element.tagName === "INPUT" || element.tagName === "TEXTAREA") {
            element.value = ''
        }
        else if (element.tagName === "SELECT") {
            element.selectedIndex = 0;
        }
    });
}

// log out 
document.getElementById('log-out-btn').addEventListener('click', function () {
    window.location.href = "./index.html"
})

// toggle forms function
function toggleForms(id) {
    const forms = document.getElementsByClassName('form');
    for (const form of forms) {
        form.style.display = "none"
    }
    document.getElementById(id).style.display = 'block'

}

// toggle buttons function
function toggleMainButtons(id) {
    const btnsText = document.getElementsByClassName('main-btn-text')
    for (const btnText of btnsText) {
        btnText.classList.remove("text-gray-700")
    }

    const btns = document.getElementsByClassName('main-btn')
    for (const btn of btns) {
        btn.classList.remove("border-[#0874f2]", "bg-[#0874f20d]", "font-bold", "text-[#0874f2]")
        btn.classList.add("border-gray-300", "text-gray-700")
    }

    document.getElementById(id).classList.remove("border-gray-300", "text-gray-700")
    document.getElementById(id).classList.add("border-[#0874f2]", "bg-[#0874f20d]", "font-bold", "text-[#0874f2]")
}
// button hover
const f = document.getElementsByClassName('main-btn')
for (const d of f) {
    d.style.cursor = "pointer"
}




// Add Money form section
document.getElementById('add-money-btn').addEventListener('click', function (event) {
    event.preventDefault()

    const selectBank = getInputValue('select-bank')
    if (selectBank === 'Select Bank') {
        alert("Please select a bank.")
        return;
    }

    const bankAccountNumber = getInputValue('bank-account-number');
    if (bankAccountNumber.length !== 11 || isNaN(bankAccountNumber)) {
        alert('Enter your 11-digit bank account number.')
        return;
    }


    const addMoney = getInputValueNumber("amount-to-add");
    if (isNaN(addMoney) || addMoney <= 0) {
        alert('Enter a valid amount to add your balance.')
        return;
    }

    const pinNumber = getInputValueNumber("pin-number");
    if (!pinNumber) {
        alert("Please enter 4-digit pin number.")
        return;
    }
    else if (pinNumber !== pin) {
        alert('Invalid pin number!')
        return;
    }

    const availableBalanceValue = getInnerText('available-balance')
    const newAvailableBalance = addMoney + availableBalanceValue
    setInnerText(newAvailableBalance)
    alert(`$${addMoney} add money successful.`)

    const data = {
        name: "Add Money",
        amount: addMoney,
        date: new Date().toLocaleTimeString()
    }
    transactionData.push(data);

    // ✅ Clear input fields
    // document.getElementById('bank-account-number').value = '';
    // document.getElementById('pin-number').value = '';
    // document.getElementById('amount-to-add').value = '';
    // document.getElementById('select-bank').selectedIndex = 0;

    // ✅ Clear input fields
    resetFields(['bank-account-number', 'pin-number', 'amount-to-add', 'select-bank'])
})

// Cash Out form section
document.getElementById('withdraw-money-btn').addEventListener('click', function (event) {
    event.preventDefault()

    const agentNumber = getInputValue('agent-number')
    if (agentNumber.length < 11 || isNaN(agentNumber)) {
        alert("Enter 11-digit agent number.")
        return;
    }

    const withdrawMoney = getInputValueNumber('amount-to-withdraw')
    const availableBalance = getInnerText('available-balance')
    if (withdrawMoney <= 0 || withdrawMoney > availableBalance || isNaN(withdrawMoney)) {
        alert("Enter a valid amount to withdraw.")
        return;
    }

    const withdrawPinNumber = getInputValueNumber('withdraw-pin-number')
    if (!withdrawPinNumber) {
        alert("Please enter 4-digit pin number.")
        return;
    }
    else if (withdrawPinNumber !== pin) {
        alert("Invalid pin number!")
        return;
    }

    const newAvailableBalance = availableBalance - withdrawMoney;
    setInnerText(newAvailableBalance)
    alert(`$${withdrawMoney} withdraw successful.`)

    const data = {
        name: "Withdraw Money",
        amount: withdrawMoney,
        date: new Date().toLocaleTimeString()
    }
    transactionData.push(data)

    resetFields(['agent-number', 'withdraw-pin-number', 'amount-to-withdraw'])
})

// transfer money form section
document.getElementById('transfer-money-btn').addEventListener('click', function (event) {
    event.preventDefault()

    const userNumber = getInputValue('user-account-number')
    if (userNumber.length !== 11 || isNaN(userNumber)) {
        alert("Enter 11-digit user account number.")
        return;
    }

    const transferMoney = getInputValueNumber('amount-to-transfer')
    const availableBalance = getInnerText('available-balance')
    if (transferMoney <= 0 || transferMoney > availableBalance || isNaN(transferMoney)) {
        alert("Enter a valid amount to transfer funds.")
        return;
    }

    const transferPinNumber = getInputValueNumber('transfer-pin-number')
    if (!transferPinNumber) {
        alert("Enter 4-digit pin number.");
        return;
    }
    if (transferPinNumber !== pin) {
        alert("Invalid pin number.")
        return;
    }

    const newAvailableBalance = availableBalance - transferMoney;
    setInnerText(newAvailableBalance)
    alert(`$${transferMoney} transfer successful`)

    const data = {
        name: "Transfer Money",
        amount: transferMoney,
        date: new Date().toLocaleTimeString()
    }
    transactionData.push(data)

    resetFields(['user-account-number', 'transfer-pin-number', 'amount-to-transfer'])
})

// bill pay form
document.getElementById('bill-pay-btn').addEventListener('click', function (event) {
    event.preventDefault()

    const selectBiller = getInputValue('select-biller')
    if (selectBiller === 'Select Biller') {
        alert("Please select a biller.")
        return;
    }

    const billerAccountNumber = getInputValue('biller-account-number');
    if (billerAccountNumber.length < 11 || isNaN(billerAccountNumber)) {
        alert('Enter biller account number (11-digit).')
        return;
    }

    const payMoney = getInputValueNumber("amount-to-pay");
    const availableBalance = getInnerText('available-balance')
    if (payMoney <= 0 || payMoney > availableBalance || isNaN(payMoney)) {
        alert("Enter a valid amount to pay.")
        return;
    }

    const billerPinNumber = getInputValueNumber("biller-pin-number");
    if (!billerPinNumber) {
        alert("Please enter 4-digit pin number.")
        return;
    }
    else if (billerPinNumber !== pin) {
        alert('Invalid pin number!')
        return;
    }

    const newAvailableBalance = availableBalance - payMoney;
    setInnerText(newAvailableBalance);
    alert(`$${payMoney} bill pay successful.`);

    const pay = getInputValue('select-biller')
    const data = {
        name: pay,
        amount: payMoney,
        date: new Date().toLocaleTimeString()
    }
    transactionData.push(data);
    console.log(data.name);

    resetFields(['biller-account-number', 'biller-pin-number', 'amount-to-pay', 'select-biller'])
})

// transactions
document.getElementById('main-btn-transactions').addEventListener('click', function () {
    const transactionContainer = document.getElementById('transaction-container')
    transactionContainer.innerText = ""

    for (const data of transactionData) {
        const div = document.createElement('div')
        div.innerHTML = `
        <div class="bg-white p-4 flex justify-between items-center rounded-xl mb-3">
                <div class="flex items-center gap-2">
                    <div class="bg-[#f4f5f7] rounded-full p-4">
                        <img src="./assets/wallet1.png" alt="">
                    </div>
                    <div class="ml-3">
                        <h1 class="font-semibold text-gray-700">${data.name} - $${data.amount}</h1>
                        <p class="text-[#08080880]">${data.date}</p>
                    </div>
                </div>
                <i class="fa-solid fa-ellipsis-vertical"></i>
            </div>
            
        `
        // transactionContainer.appendChild(div)   //latest ta niche niche bosbe
        transactionContainer.prepend(div)   //latest ta upore upore bosbe
    }
})





// Toggle forms main button

// add money button
document.getElementById('main-btn-add-money').addEventListener('click', function () {
    toggleForms('add-money-form')
    toggleMainButtons('main-btn-add-money')
})
// cash out button
document.getElementById('main-btn-cash-out').addEventListener('click', function () {
    toggleForms('cash-out-form')
    toggleMainButtons('main-btn-cash-out')
})
// transfer money button
document.getElementById('main-btn-transfer-money').addEventListener('click', function () {
    toggleForms('transfer-money-form')
    toggleMainButtons('main-btn-transfer-money')
})
// get bonus button
document.getElementById('main-btn-get-bonus').addEventListener('click', function () {
    toggleForms('get-bonus-form')
    toggleMainButtons('main-btn-get-bonus')
})
// bill pay button
document.getElementById('main-btn-bill-pay').addEventListener('click', function () {
    toggleForms('bill-pay-form')
    toggleMainButtons('main-btn-bill-pay')
})
// Transactions button
document.getElementById('main-btn-transactions').addEventListener('click', function () {
    toggleForms('transactions')
    toggleMainButtons('main-btn-transactions')
})