import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";

const UserTable = () => {
  const [user, setUser] = useState([]);
  const url = "http://jsonplaceholder.typicode.com/users";

  useEffect(() => {
    getUser();
  }, []);

  const getUser = () => {
    fetch(url)
      .then((res) => res.json())
      .then((result) => {
        setUser(result);
      });
  };

  const column = [
    { title: "Name", field: "name" },
    { title: "Username", field: "username" },
    { title: "Email", field: "email" },
    { title: "Phone", field: "phone" },
    { title: "Website", field: "website" },
  ];
  return (
    <div>
      <MaterialTable
        title="User Table"
        data={user}
        columns={column}
        options={{ actionsColumnIndex: -1, addRowPosition: "first" }}
        editable={{
          onRowAdd: (newRow) =>
            new Promise((resolve, reject) => {
              const updateRow = [...user, newRow];
              setUser(updateRow);
              resolve();
            }),

          onRowUpdate: (updatedRow, oldRow) =>
            new Promise((resolve, reject) => {
              const index = oldRow.tableData.id;
              const updatedRows = [...user];
              updatedRows[index]=updatedRow;
              setUser(updatedRows);
              resolve();
            }),

          onRowDelete: (selectedRow) =>
            new Promise((resolve, reject) => {
              const index = selectedRow.tableData.id;
              const updatedRows = [...user];
              updatedRows.splice(index, 1);
              setUser(updatedRows);
              resolve();
            }),
        }}
      />
    </div>
  );
};
export default UserTable;