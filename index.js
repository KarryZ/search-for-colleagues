function Employer(name, surname, age,sex, status, image) {
    this.name = name;
    this.surname = surname;
    this.age = age;
    this.sex = sex;
    this.status = status;
    this.image = image;
    this.getFullName = function () {
        return this.name + " " + this.surname + " " + this.age;
    }
}
var arrOfEmployer = [];
(function addEmployersToArr() {
    arrOfEmployer.push(new Employer("Костя", "Петров", 25, "муж", "женат", "костя.jpg"));
    arrOfEmployer.push(new Employer("Маша", "Мышкина", 27, "жен", "не замужем", "маша.jpg"));
    arrOfEmployer.push(new Employer("Дима", "Котиков", 23,"муж", "холост", "дима.jpeg"));
    arrOfEmployer.push(new Employer("Настя", "Лисова", 35, "жен", "замужем", "настя.jpg"));
})();

function getUserInput() {
    return document.getElementById("text").value;
}

function showEmployers(data) {
    var list = document.getElementById("list");
    list.innerHTML = "";
    for (var i = 0; i < data.length; i++) {
        var oneEmployerInRow = document.createElement("div");
        oneEmployerInRow.className = "oneEmployerInRow";
        var divName = document.createElement("div");
        divName.className = "strEmployer";
        var divSurname = document.createElement("div");
        divSurname.className = "strEmployer";
        var divAge = document.createElement("div");
        divAge.className = "strEmployer";
        divName.appendChild(document.createTextNode(data[i].name));
        divSurname.appendChild(document.createTextNode(data[i].surname));
        divAge.appendChild(document.createTextNode(data[i].age));
        
        var spanDelete = document.createElement("span");
        spanDelete.innerText = "х";
        spanDelete.onclick = function() {
            deleteEmloyer(element.id)
        };
        
        oneEmployerInRow.appendChild(divName);
        oneEmployerInRow.appendChild(divSurname);
        oneEmployerInRow.appendChild(divAge);
        oneEmployerInRow.appendChild(spanDelete);
        oneEmployerInRow.onclick = (function (employee) {
            return function () {
                openModal(employee);
            }
        })(data[i]);
        list.appendChild(oneEmployerInRow);
    }
}

// function  deleteEmloyer(emploeyrId){
//     var EmployerId = arrOfEmployer.map(function(element){
//         return element.id;
//     })indexOf(emploeyrId);
//     arrOfEmployer.slice(index, 1);
    
// }

function openModal(employee) {
    var modal = document.getElementById("openModal");
    document.getElementById('modal-name').innerHTML = employee.name;
    document.getElementById('sex').innerHTML = employee.sex;
    document.getElementById('age').innerHTML = employee.age;
    document.getElementById('status').innerHTML = employee.status;
    var img = document.getElementById("img");
    img.src = employee.image;
    document.getElementById("employer-photo").appendChild(img); 
    modal.style.display = "block";
}

function closeModal() {
    var modal = document.getElementById("openModal");
    modal.style.display = "none";
}

function searchPerson() {
    var resultSearch = [];
    var userInput = getUserInput();
    if (userInput == "") {
        showEmployers(arrOfEmployer);
    }
    else {
        for (var i = 0; i < arrOfEmployer.length; i++) {
            if (CheckFilter(arrOfEmployer[i], userInput)) {
                resultSearch.push(arrOfEmployer[i]);
            }
        }
        showEmployers(resultSearch)
    }
}

function CheckFilter(element, userInput) {
    var checkName = document.getElementById("input-name").checked;
    var checkSurname = document.getElementById("input-surname").checked;
    var checkAge = document.getElementById("input-age").checked;
    var nothingChecked = !(checkName || checkSurname || checkAge);
    var matchAll = false;
    if (((checkName || nothingChecked) && element.name == userInput) || ((checkSurname || nothingChecked) && element.surname == userInput) || ((checkAge || nothingChecked) && element.age == userInput)) {
        matchAll = true;
    }
    return matchAll;
}
searchPerson();
showEmployers(arrOfEmployer);