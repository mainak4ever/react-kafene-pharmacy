import React, { useState, useEffect } from "react";
import Axios from "axios";

const UserListPage = () => {
  const classes = {
    PageWrapper: "UserList_PageWrapper__11jYV",
    MainHeading: "UserList_MainHeading__1Ntqz",
    OrdersWrapper: "UserList_OrdersWrapper__8eEvi",
    FilterWrapper: "UserList_FilterWrapper__39u8A",
    FilterOptions: "UserList_FilterOptions__1bzC-",
    FilterCheckbox: "UserList_FilterCheckbox__1CI_8",
    OrderTable: "UserList_OrderTable__1cnvQ",
    TableRow: "UserList_TableRow__2DK3e",
    PrimaryText: "UserList_PrimaryText__38Hc_",
    SecondaryText: "UserList_SecondaryText__3UV5v",
    SearchBox: "UserList_SearchBox__BG9wr",
    Button: "UserList_Button__1ygGK",
  };
  const [productList, setProductList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [showExpired, setShowExpired] = useState(true);
  const [showLowStock, setShowLowStock] = useState(true);

  useEffect(() => {
    Axios.get("https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/users")
      .then((res) => {
        console.log(res.data);
        setProductList(res.data);
        setFilteredList(res.data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []);

  const renderTableRow = (obj) => {
    const day = obj.dob.split("-")[0];
    const month = obj.dob.split("-")[1];
    const year = obj.dob.split("-")[2];

    return (
      <tr
        className={[
          classes.TableRow,
          obj.isExpired ? classes.ExpiredRow : null,
        ].join(" ")}
        key={obj.id}
      >
        <td className={classes.SecondaryText}>{obj.id}</td>
        <td className={classes.PrimaryText}>
          <img
            className={classes.ProfilePic}
            src={obj.profilePic}
            alt="Profile Pic"
          />
        </td>
        <td className={classes.SecondaryText}>{obj.fullName}</td>
        <td className={classes.PrimaryText}>{`${day} ${month}, ${year}`}</td>
        <td className={classes.SecondaryText}>{`${obj.gender}`}</td>
        <td
          className={classes.SecondaryText}
        >{`${obj.currentCity}, ${obj.currentCountry}`}</td>
      </tr>
    );
  };

  const getOrdersByStatus = (type, value, list) => {
    if (!value) {
      return [];
    }
    switch (type) {
      case "expired":
        return list.filter((item) => item.isExpired);
      case "lowStock":
        return list.filter((item) => item.isLowStock);
      case "remaining":
        let result = list
          .filter((item) => !item.isLowStock)
          .filter((item) => !item.isExpired);
        result.pop();
        result.pop();
        return result;
      default:
        return [];
    }
  };

  const onFilterCheckboxClick = (type, value) => {
    let updatedVal = [];
    switch (type) {
      case "expired":
        if (value) {
          updatedVal = [
            ...getOrdersByStatus("expired", value, productList),
            ...getOrdersByStatus("lowStock", showLowStock, productList),
            ...getOrdersByStatus("remaining", value, productList),
          ];
          setShowExpired(value);
        } else {
          updatedVal = filteredList.filter((item) => !item.isExpired);
          setShowExpired(value);
        }
        setFilteredList([...updatedVal]);
        break;
      case "lowStock":
        if (value) {
          updatedVal = [
            ...getOrdersByStatus("expired", showExpired, productList),
            ...getOrdersByStatus("lowStock", value, productList),
            ...getOrdersByStatus("remaining", value, productList),
          ];
          setShowLowStock(value);
        } else {
          updatedVal = filteredList.filter((item) => !item.isLowStock);
          setShowLowStock(value);
        }
        setFilteredList([...updatedVal]);
        break;
      default:
        break;
    }
  };

  const onSearch = (e) => {
    if (e.keyCode === 13) {
      if (e.target.value.length < 2) {
        alert("Please enter at least 2 characters");
        setFilteredList([...productList]);
      } else {
        Axios.get(
          "https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/users?fullName=" +
            e.target.value
        )
          .then((res) => {
            console.log(res.data);
            setFilteredList(res.data);
          })
          .catch((error) => {
            console.error("Error searching users:", error);
          });
      }
    }
  };

  const onClearClick = () => {
    Axios.get("https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/users")
      .then((res) => {
        console.log(res.data);
        setFilteredList(res.data);
      })
      .catch((error) => {
        console.error("Error clearing users:", error);
      });
  };

  const tableRows = filteredList.map((item) => {
    return renderTableRow(item);
  });

  return (
    <div className={classes.PageWrapper}>
      <h1 className={classes.MainHeading}>Users</h1>
      <div className={classes.OrdersWrapper}>
        <form
          className={classes.FilterWrapper}
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            onKeyUp={onSearch}
            className={classes.SearchBox}
            type="search"
            placeholder="Search by Name"
          />
          <input
            type="reset"
            onClick={onClearClick}
            className={classes.Button}
            value="Reset"
          />
        </form>

        <div style={{ width: "100%" }}>
          <table className={classes.OrderTable}>
            <tr>
              <th>ID</th>
              <th>User Avatar</th>
              <th>Full Name</th>
              <th style={{ minWidth: "100px" }}>DoB</th>
              <th>Gender</th>
              <th>Current Location</th>
            </tr>
            <tbody>{tableRows}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserListPage;
