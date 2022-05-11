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

<<<<<<< segev
// fetchData(urlAll, "");
// fetchData(urlPerson, "1102");
const some= 'this line need to be dleeted';

const tableObj = {
  personnel: [],
};

=======
>>>>>>> main
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
  // console.log(obj.personnel);
}

// pushDataToObject(tableObj, urlAll, urlPerson);
