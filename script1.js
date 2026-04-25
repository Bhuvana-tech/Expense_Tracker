let expenses = [];
let budget = 0;

function setBudget() {
    let value = document.getElementById("budget").value;
    if(value === "") return;

    budget = Number(value);
    document.getElementById("budgetDisplay").innerText = budget;

    update();
}

function addExpense() {
    let name = document.getElementById("name").value;
    let amount = document.getElementById("amount").value;

    if(name === "" || amount === "") return;

    expenses.push({ name, amount: Number(amount) });

    document.getElementById("name").value = "";
    document.getElementById("amount").value = "";

    render();
}

function render() {
    let list = document.getElementById("list");
    list.innerHTML = "";

    expenses.forEach((exp, index) => {
        let li = document.createElement("li");

        li.innerHTML = `
            ${exp.name} - ₹${exp.amount}
            <span class="delete" onclick="deleteExpense(${index})">X</span>
        `;

        list.appendChild(li);
    });

    update();
}

function update() {
    let total = expenses.reduce((sum, exp) => sum + exp.amount, 0);
    let remaining = budget - total;

    document.getElementById("total").innerText = total;
    document.getElementById("remaining").innerText = remaining;

    // Color change if exceeded
    if(remaining < 0) {
        document.getElementById("remaining").style.color = "red";
    } else {
        document.getElementById("remaining").style.color = "green";
    }
}

function deleteExpense(index) {
    expenses.splice(index, 1);
    render();
}