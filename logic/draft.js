//url of all person and individual
const urlAll = "https://capsules-asb6.herokuapp.com/api/teacher/mordi";
const urlPerson = `https://capsules-asb6.herokuapp.com/api/user/`;

//fetch data by url
async function fetchData(url, id) {
  const api = await fetch(url + id);
  if (!api.ok) throw new Error("My error faild to fetch ");
  const data = await api.json();
  //   console.log(data);
  return data;
}

// fetchData(urlAll, "");
// fetchData(urlPerson, "1102");
const some= 'this line need to be dleeted';

const tableObj = {
  personnel: [],
};

async function pushDataToObject(obj, url1, url2) {
  const allPersonArr = await fetchData(url1, "");

  for (const person of allPersonArr) {
    const personOne = await fetchData(url2, person.id);
    const personKeys = Object.keys(personOne);
    personKeys.forEach((key) => {
      person[key] = personOne[key];
    });
  }
  obj.personnel = allPersonArr;
  console.log(obj.personnel);
}

pushDataToObject(tableObj, urlAll, urlPerson);
