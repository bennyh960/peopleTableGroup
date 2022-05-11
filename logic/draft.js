// export function x(params) {
//   console.log("i imported");
// }

// const sortButtons = document.querySelectorAll(".category-btn");

//by number
// tableObj.sortNum = function (byX) {
//   this.personnel.sort((a, b) => {
//     return a[byX] - b[byX];
//   });
// };
// //by string
// tableObj.sortStr = function (byStr) {
//   this.personnel.sort((a, b) => {
//     let fa = a[byStr].toLowerCase(),
//       fb = b[byStr].toLowerCase();

//     if (fa < fb) {
//       return -1;
//     }
//     if (fa > fb) {
//       return 1;
//     }
//     return 0;
//   });
// };

const sortButtons = document.querySelectorAll(".category-btn");

sortButtons.forEach((btn, idx) => {
  btn.addEventListener("click", (e) => {
    const getAtt = btn.getAttribute("data");
    if ([0, 1, 3, 5, 6].includes(idx)) {
      tableObj.sortStr(getAtt);
    } else {
      tableObj.sortNum(getAtt);
    }
  });
});
// sortButtons[0].addEventListener("click", () => {
//   tableObj.sortStr("firstName");
// });
// sortButtons[1].addEventListener("click", () => {
//   tableObj.sortStr("lastName");
// });
// sortButtons[2].addEventListener("click", () => {
//   tableObj.sortNum("id");
// });
