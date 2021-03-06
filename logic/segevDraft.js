// import { x } from "./draft.js";
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
  const deleteBtns = document.querySelectorAll(".delete");
  deleteBtns.forEach((edit, idx) => {
    edit.addEventListener("click", () => {
      deleteFunc(idx, tableObj.personnel);
    });
  });
}

const storeData = {
  rowStored: [],
  bool: true,
  idx: "",
};
//! need to improve the Enter eventlistner
async function editFunc(idx) {
  storeData.rowStored = [];
  const rowContainers = document.querySelectorAll(".row");
  [...rowContainers[idx].children].forEach((cell) => {
    cell.disabled = false;
    // cell.style.background = "white";
    storeData.rowStored.push(cell.value);
    storeData.idx = idx;
    document.addEventListener("keypress", (e) => {
      if (e.key === "Enter") cell.disabled = true;
    });
  });

  //todo : fix logic and build in func
  storeData.bool = false;
  const editCancle = document.querySelectorAll(".edit")[idx];
  const editConfirm = document.querySelectorAll(".delete")[idx];
  editCancle.innerHTML = '<i class="fa-solid fa-xmark"></i>';
  editConfirm.innerHTML = '<i class="fa-solid fa-check"></i>';

  editConfirm.addEventListener("click", () => {
    editCancle.innerHTML = `<i class="fa-solid fa-pencil"></i>`;
    editConfirm.innerHTML = `<i class="fa-solid fa-trash-can"></i>`;
    storeData.bool = true;
  });
  editCancle.addEventListener("click", () => {
    editCancle.innerHTML = `<i class="fa-solid fa-pencil"></i>`;
    editConfirm.innerHTML = `<i class="fa-solid fa-trash-can"></i>`;
    storeData.bool = true;
    [...rowContainers[idx].children].forEach((cell, idx) => {
      cell.value = storeData.rowStored[idx];
    });
  });

  console.log(storeData);
}

async function deleteFunc(idx, arr) {
  if (storeData.bool) {
    const rowContainers = document.querySelectorAll(".row");
    arr.splice(idx, 1);
    rowContainers[idx].style.display = "none";
  }
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
  innerHtmlTitles(matchObj.personnel);
  drawTable(matchObj);
  // todo : we need to fix when search - sort will not work due to inner HTML
  // sortByClick(matchObj, false);
}

// ==========innerHtml func for title===============
function innerHtmlTitles(arr) {
  // if (arr.length > 0) {
  //   document.querySelector(".table-container").innerHTML = `
  // <div class="category-row">
  //         <button class="category-btn name">First Name</button>
  //         <button class="category-btn name">Last Name</button>
  //         <button class="category-btn id">Id</button>
  //         <button class="category-btn hobby">Hobby</button>
  //         <button class="category-btn age">Age</button>
  //         <button class="category-btn city">City</button>
  //         <button class="category-btn gender">Gender</button>
  //         <button class="category-btn capsule">Capsule</button>

  //         <div class="buttons-container"></div>
  //       </div>
  // `;
  // } else {
  //   document.querySelector(".table-container").innerHTML = "NOT FOUND!";
  // }
  document.querySelectorAll(".row").forEach((row) => {
    row.classList.remove("row");
    row.innerHTML = "";
  });
}

// =============================

// ?SORTING
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

// !

function sortByClick(obj, bool) {
  const sortButtons = document.querySelectorAll(".category-btn");

  sortButtons.forEach((btn, idx) => {
    btn.addEventListener("click", (e) => {
      // console.log("Before sort:", tableObj.personnel);
      const getAtt = btn.getAttribute("data");
      if ([0, 1, 3, 5, 6].includes(idx)) {
        obj.sortStr(getAtt);
        console.log(getAtt);
      } else {
        obj.sortNum(getAtt);
      }
      document.querySelectorAll(".row").forEach((row) => {
        row.classList.remove("row");
        row.innerHTML = "";
      });
      if (bool) drawTable(obj);
      // console.log("after sort:", obj.personnel);
    });
  });
}

sortByClick(tableObj, true);
// !
const title = document.querySelector(".category-row");
title.style.display = "none";
function hideLoading() {
  const loading = document.querySelector(".lds-spinner");
  setTimeout(() => {
    loading.style.display = "none";
    title.style.display = "flex";
  }, 1100);
}
hideLoading();
