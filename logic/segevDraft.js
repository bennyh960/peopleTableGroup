//url of all person and individual
const urlAll = "https://capsules-asb6.herokuapp.com/api/teacher/mordi";
const urlPerson = `https://capsules-asb6.herokuapp.com/api/user/`;

const tableObj = {
  personnel: [],
};

//fetch data by url
async function fetchData(url, id) {
  const api = await fetch(url + id);
  if (!api.ok) throw new Error("My error faild to fetch ");
  const data = await api.json();
  //   console.log(data);
  return data;
}

async function pushDataToObject(obj, url1, url2) {
  const allPersonArr = await fetchData(url1, "");
  const personOneArr = await Promise.all(allPersonArr.map((person) => fetchData(url2, person.id)));

  const personKeys = Object.keys(personOneArr[0]);
  let i = 0;
  for (const person of allPersonArr) {
    personKeys.forEach((key) => {
      person[key] = personOneArr[i][key];
    });
    i++;
  }
  obj.personnel = allPersonArr;
  console.log(obj.personnel);
}

pushDataToObject(tableObj, urlAll, urlPerson).then(() => {
  drawTable(tableObj);
});

function drawTable(obj) {
  const tableContainer = document.querySelector(".table-container");

  tableObj.sortStr("firstName");
  obj.personnel.forEach((person, idx) => {
    // create rows
    const personRow = document.createElement("div");
    personRow.classList.add("row");
    tableContainer.appendChild(personRow);
    // create inputs
    createInputs(person, idx, personRow);
    // create btn
    createButtons(personRow);
  });
  const editBtns = document.querySelectorAll(".edit");
  editBtns.forEach((edit, idx) => {
    edit.addEventListener("click", () => {
      editFunc(idx);
    });
  });
  //
}

//! need to improve the Enter eventlistner
async function editFunc(idx) {
  const rowContainers = document.querySelectorAll(".row");
  [...rowContainers[idx].children].forEach((cell) => {
    cell.disabled = false;
    document.addEventListener("keypress", (e) => {
      if (e.key === "Enter") cell.disabled = true;
    });
  });
}

// functions for drawCards
// create cards
function createInputs(person, idx, personRow) {
  for (let i = 0; i < Math.min(8, Object.keys(person).length); i++) {
    const tableCell = document.createElement("input");
    tableCell.value = person[Object.keys(person)[i]];
    tableCell.disabled = true;
    tableCell.classList.add("table-cell");
    personRow.appendChild(tableCell);
  }
}
//  create btns
function createButtons(personRow) {
  const buttonsContainer = document.createElement("div");
  const buttonEdit = document.createElement("button");
  const buttonDelete = document.createElement("button");
  buttonsContainer.classList.add("buttons-container");
  buttonEdit.classList.add("edit");
  buttonDelete.classList.add("delete");
  buttonEdit.innerHTML = `<i class="fa-solid fa-pencil"></i>`;
  buttonDelete.innerHTML = `<i class="fa-solid fa-trash-can"></i>`;
  personRow.appendChild(buttonsContainer);
  buttonsContainer.append(buttonEdit, buttonDelete);
}

// search
const searchbarInput = document.querySelector(".searchbar");
searchbarInput.addEventListener("input", async (e) => {
  await searchByInput(tableObj.personnel, e.target.value);
});

async function searchByInput(arrOfPeople, input) {
  const matchObj = {
    personnel: [],
  };
  arrOfPeople.forEach((person) => {
    for (const property in person) {
      if (person[property].toString().includes(input)) {
        if (!matchObj.personnel.includes(person)) matchObj.personnel.push(person);
      }
    }
  });
  // console.log(matchObj.personnel);
  document.querySelector(".table-container").innerHTML = `
  <div class="category-row">
          <button class="category-btn name">First Name</button>
          <button class="category-btn name">Last Name</button>
          <button class="category-btn id">Id</button>
          <button class="category-btn capsule">Capsule</button>
          <button class="category-btn age">Age</button>
          <button class="category-btn city">City</button>
          <button class="category-btn gender">Gender</button>
          <button class="category-btn hobby">Hobby</button>
          <div class="buttons-container"></div>
        </div>
  `;
  drawTable(matchObj);
}

//by number
tableObj.sortNum = function (byX) {
  this.personnel.sort((a, b) => {
    return a[byX] - b[byX];
  });
};
//by string
tableObj.sortStr = function (byStr) {
  this.personnel.sort((a, b) => {
    let fa = a[byStr].toLowerCase(),
      fb = b[byStr].toLowerCase();

    if (fa < fb) {
      return -1;
    }
    if (fa > fb) {
      return 1;
    }
    return 0;
  });
};
