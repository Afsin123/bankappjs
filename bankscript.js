//Example: to use class and methods instead of funcions; 
class Bank {
    insideBank() {
        alert("ALERT!!! account expiry")
    }

}
var bank = new Bank();

// Using functions so that it can be called from HTML document
function CreateUser() {
    let account_number = ac_no.value;
    let password = pswd.value;
    let balance = bal.value;
    let user = {
        account_number: account_number,
        password: password,
        balance: balance
    }
    localStorage.setItem(user.account_number, JSON.stringify(user));
    alert("User Created");
    location.reload(true); 
    window.location.href = "login.html";

 //To clear boxes after one use
}
function populate(users) {
    let htmldata = "";

    for (let user of users) {
        // htmldata += `<p> account_number : ${user.account_number} password : ${user.password} balance :  ${ user.balance}  </p>`
        htmldata += `<div class="card" style="width: 18rem;">
        <ul class="list-group list-group-flush">
          <li class="list-group-item">${user.account_number}</li>
          <li class="list-group-item">${user.password}</li>
          <li class="list-group-item">${user.balance}</li>
        </ul>
      </div>`
    }
    //resultarea.innerHTML = htmldata
    document.querySelector("#resultarea").innerHTML = htmldata

}
// To list all users from local storage to document html
// Need to convert JSON  string type to object , therefore use JSON.parse
// To display in array create array named users. 

function ListAllUsers() {
    let users = [];
    for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i)
        let user = JSON.parse(localStorage.getItem(key))
        users.push(user)
    }

    //console.log(users);
    populate(users)
}

function signin() {
    let uname = username.value;
    let pswd = password.value;
    if (uname in localStorage) {
        let user = JSON.parse(localStorage.getItem(uname))
        if (user.password == pswd) {

            sessionStorage.setItem("user", uname)
            alert("Log In Sucessful")
          window.location.href = "homepage.html";
        }
        else {
            alert("Incorrect Password")
        }
    }
    else {
        alert("Username not found")
    }
}
function displayBalance() {
    let user = sessionStorage.getItem("user");
    let data = JSON.parse(localStorage.getItem(user));
    alert(data.balance)
    console.log(data);

}
user = sessionStorage.getItem("user")
if(user){
    profile.innerHTML = `${user}`
}
function logout() {
    sessionStorage.removeItem("user");
    location.href = "login.html";

}
function getUser(ac_no){
    let user = JSON.parse(localStorage.getItem(ac_no))
    return user;
}

function fundtransfer(){
    let to_account= toaccount.value;
    let confirm_account = confirmaccount.value;
    let amount_transfer = amount.value;
    if (to_account in localStorage){
        let user=sessionStorage.getItem("user")
        // let account= JSON.parse(localStorage.getItem("user"))
        let account = getUser(user);
         if (account.balance<amount){
             alert("Insufficient Balance!!")
         }
         else{
             account.balance=account.balance-amount;
             let credit_ac = getUser(to_account)
             credit_ac.balance= amount + Number(credit_ac.balance)
             localStorage.setItem(to_account,JSON.stringify(credit_ac))
         }
    }
    else {
        alert("Invalid to-account number!!");

    }
}
