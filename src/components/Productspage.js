import React, { useState, useEffect } from "react";
import Axios from "axios";

const ProductListingPage = () => {
  const classes = {
    PageWrapper: "ProductListingPage_PageWrapper__1hVLh",
    MainHeading: "ProductListingPage_MainHeading__2bwu7",
    OrdersWrapper: "ProductListingPage_OrdersWrapper__17AIV",
    FilterWrapper: "ProductListingPage_FilterWrapper__s0fKS",
    FilterOptions: "ProductListingPage_FilterOptions__2bq1J",
    FilterCheckbox: "ProductListingPage_FilterCheckbox__wpWXC",
    OrderTable: "ProductListingPage_OrderTable__2rKZc",
    TableRow: "ProductListingPage_TableRow__2lrQY",
    ExpiredRow: "ProductListingPage_ExpiredRow__2p9Re",
    PrimaryText: "ProductListingPage_PrimaryText__3Y-hH",
    SecondaryText: "ProductListingPage_SecondaryText__31Bmu",
  };
  const [productList, setProductList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [showExpired, setShowExpired] = useState(true);
  const [showLowStock, setShowLowStock] = useState(true);

  useEffect(() => {
    Axios.get("https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/products")
      .then((res) => {
        const updatedData = res.data.map((item) => {
          return {
            ...item,
            isExpired:
              new Date(item.expiryDate).getTime() < new Date().getTime(),
            isLowStock: item.stock < 100,
          };
        });
        setProductList([...updatedData]);
        setFilteredList([...updatedData]);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  const renderTableRow = (obj) => {
    const day = obj.expiryDate.split("-")[0];
    const month = obj.expiryDate.split("-")[1];
    const year = obj.expiryDate.split("-")[2];

    return (
      <tr
        className={[
          classes.TableRow,
          obj.isExpired ? classes.ExpiredRow : null,
        ].join(" ")}
        key={obj.id}
      >
        <td className={classes.SecondaryText}>{obj.id}</td>
        <td className={classes.PrimaryText}>{obj.medicineName}</td>
        <td className={classes.SecondaryText}>{obj.medicineBrand}</td>
        <td className={classes.PrimaryText}>{`${day} ${month}, ${year}`}</td>
        <td className={classes.SecondaryText}>{`$${obj.unitPrice}`}</td>
        <td className={classes.SecondaryText}>{obj.stock}</td>
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

  const tableRows = filteredList.map((item) => {
    return renderTableRow(item);
  });

  return (
    <div className={classes.PageWrapper}>
      <h1 className={classes.MainHeading}>Products</h1>
      <div className={classes.OrdersWrapper}>
        <div className={classes.FilterWrapper}>
          <h3>Filters</h3>
          <div className={classes.FilterOptions}>
            <p className={classes.TotalCount}>Count: {filteredList.length}</p>
            <label className={classes.FilterCheckbox}>
              <input
                onClick={(e) =>
                  onFilterCheckboxClick("expired", e.target.checked)
                }
                type="checkbox"
                checked={showExpired}
                name="product-expired"
              />
              Expired
            </label>
            <label className={classes.FilterCheckbox}>
              <input
                onClick={(e) =>
                  onFilterCheckboxClick("lowStock", e.target.checked)
                }
                type="checkbox"
                checked={showLowStock}
                name="product-low-stock"
              />
              Low Stock
            </label>
          </div>
        </div>

        <div style={{ width: "100%" }}>
          <table className={classes.OrderTable}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Product Name</th>
                <th>Product Brand</th>
                <th style={{ minWidth: "100px" }}>Expiry Date</th>
                <th>Unit Price</th>
                <th>Stock</th>
              </tr>
            </thead>
            <tbody>{tableRows}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProductListingPage;
