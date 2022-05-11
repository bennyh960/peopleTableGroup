const editBtn = document.querySelector(".edit");

editBtn.addEventListener("click", (e) => {
  const rowContainer = document.querySelector("row");
  [...rowContainer.children].forEach((cell) => {
    cell.disabled = false;
  });
});

function editDataBtn(params) {}
