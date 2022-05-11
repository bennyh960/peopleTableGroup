const tableObj = {
  personA: ["id", "name", "city"],
  personB: ["id", "name", "city"],
  personC: ["id", "name", "city"],
};

const tableObj2 = {
  personel: [
    {
      id: "fetch/editable",
      Name: "fetch/editable",
      personC: "fetch/editable",
    },
    {
      id: "fetch/editable",
      Name: "fetch/editable",
      personC: "fetch/editable",
    },
    {
      id: "fetch/editable",
      Name: "fetch/editable",
      personC: "fetch/editable",
    },
  ],
};

tableObj2.prototype.sort = (field) => {};

tableObj2.prototype.personEdit = (id) => {};
