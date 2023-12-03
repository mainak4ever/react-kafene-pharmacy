import React, { useState, useEffect } from "react";
import Axios from "axios";

const Homepage = () => {
  // extracted by mini-css-extract-plugin
  const classes = {
    PageWrapper: "Homepage_PageWrapper__35FDy",
    MainHeading: "Homepage_MainHeading__3eRiM",
    OrdersWrapper: "Homepage_OrdersWrapper__A-VhO",
    FilterWrapper: "Homepage_FilterWrapper__2PcDK",
    FilterOptions: "Homepage_FilterOptions__wNuP7",
    FilterCheckbox: "Homepage_FilterCheckbox__2-zv7",
    OrderTable: "Homepage_OrderTable__1DHO-",
    TableRow: "Homepage_TableRow__cSO9_",
    PrimaryText: "Homepage_PrimaryText__1PVTP",
    SecondaryText: "Homepage_SecondaryText__1or5Q",
  };
  const [orderList, setOrderList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [showNew, setShowNew] = useState(true);
  const [showPacked, setShowPacked] = useState(true);
  const [showInTransit, setShowInTransit] = useState(true);
  const [showDelivered, setShowDelivered] = useState(true);

  useEffect(() => {
    Axios.get("https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/orders")
      .then((res) => {
        setOrderList(res.data);
        setFilteredList(res.data);
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
      });
  }, []);

  useEffect(() => {
    // Update the filtered list based on checkbox values
    const filteredOrders = getOrdersByStatus(orderList);
    setFilteredList(filteredOrders);
  }, [showNew, showPacked, showInTransit, showDelivered, orderList]);

  const renderTableRow = (obj) => {
    const day = obj.orderDate.split("-")[0];
    const month = obj.orderDate.split("-")[1];
    const year = obj.orderDate.split("-")[2];

    return (
      <tr className={classes.TableRow} key={obj.id}>
        <td className={classes.SecondaryText}>{obj.id}</td>
        <td className={classes.PrimaryText}>{obj.customerName}</td>
        <td className={classes.PrimaryText}>
          {`${day} ${month}, ${year}`} <br />
          <span className={classes.SecondaryText}>{obj.orderTime}</span>
        </td>
        <td className={classes.SecondaryText}>{`$${obj.amount}`}</td>
        <td className={classes.PrimaryText}>{obj.orderStatus}</td>
      </tr>
    );
  };

  const getOrdersByStatus = (orderList) => {
    let filteredOrders = orderList.filter((item) => {
      if (showNew && item.orderStatus === "New") return true;
      if (showPacked && item.orderStatus === "Packed") return true;
      if (showInTransit && item.orderStatus === "InTransit") return true;
      if (showDelivered && item.orderStatus === "Delivered") return true;
      return false;
    });
    return filteredOrders;
  };
  const onFilterCheckboxClick = (type, value) => {
    switch (type) {
      case "new":
        setShowNew(value);
        break;
      case "packed":
        setShowPacked(value);
        break;
      case "transit":
        setShowInTransit(value);
        break;
      case "delivered":
        setShowDelivered(value);
        break;
      default:
        break;
    }
  };

  const tableRows = filteredList.map((item) => {
    return renderTableRow(item);
  });

  return (
    <div className={classes.PageWrapper}>
      <h1 className={classes.MainHeading}>Orders</h1>
      <div className={classes.OrdersWrapper}>
        <div className={classes.FilterWrapper}>
          <h3>Filters</h3>
          <div className={classes.FilterOptions}>
            <p className={classes.TotalCount}>Count: {filteredList.length}</p>
            <label className={classes.FilterCheckbox}>
              <input
                onClick={(e) => onFilterCheckboxClick("new", e.target.checked)}
                type="checkbox"
                checked={showNew}
                name="orders-new"
              />
              New
            </label>
            <label className={classes.FilterCheckbox}>
              <input
                onClick={(e) =>
                  onFilterCheckboxClick("packed", e.target.checked)
                }
                type="checkbox"
                checked={showPacked}
                name="orders-packed"
              />
              Packed
            </label>
            <label className={classes.FilterCheckbox}>
              <input
                onClick={(e) =>
                  onFilterCheckboxClick("transit", e.target.checked)
                }
                type="checkbox"
                checked={showInTransit}
                name="orders-transit"
              />
              InTransit
            </label>
            <label className={classes.FilterCheckbox}>
              <input
                onClick={(e) =>
                  onFilterCheckboxClick("delivered", e.target.checked)
                }
                type="checkbox"
                checked={showDelivered}
                name="orders-delivered"
              />
              Delivered
            </label>
          </div>
        </div>

        <div style={{ width: "100%" }}>
          <table className={classes.OrderTable}>
            <tr>
              <th>ID</th>
              <th>Customer</th>
              <th>Date</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>

            <tbody>{tableRows}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
