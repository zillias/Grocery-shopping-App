import React, { useState } from "react";
import Order from "./Order";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

const OrdersPage = () => {
  const ordersList = [
    { id: "0012345", status: "On delivery" },
    { id: "0012346", status: "Completed" },
    { id: "0012347", status: "Completed" },
    { id: "0012348", status: "Completed" },
    { id: "0012349", status: "Completed" },
  ];

  const [categoryOrder, setCategoryOrder] = useState("All");

  return (
    <div className="order-page">
      <h2 className="blue-text">My Orders</h2>
      <div className="order-categories">
        <div
          onClick={() => setCategoryOrder("All")}
          className={
            categoryOrder === "All"
              ? "order-category all"
              : "order-category inactive"
          }
        >
          <FiberManualRecordIcon
            fontSize="small"
            style={{ color: "rgba(170, 54, 0, 1)" }}
          />
          <h4>All</h4>
        </div>
        <div
          onClick={() => setCategoryOrder("On delivery")}
          className={
            categoryOrder === "On delivery"
              ? "order-category ondelivery larger-div"
              : "order-category inactive larger-div"
          }
        >
          <FiberManualRecordIcon
            fontSize="small"
            style={{ color: "rgba(255, 169, 2, 1)" }}
          />
          <h4>On Delivery</h4>
        </div>
        <div
          onClick={() => setCategoryOrder("Completed")}
          className={
            categoryOrder === "Completed"
              ? "order-category completed"
              : "order-category inactive"
          }
        >
          <FiberManualRecordIcon
            fontSize="small"
            style={{ color: "rgba(28, 175, 94, 1)" }}
          />
          <h4>Completed</h4>
        </div>
      </div>
      <div className="orders-list-container">
        {categoryOrder === "All"
          ? ordersList.map((item) => (
              <Order key={item.id} id={item.id} status={item.status} />
            ))
          : ordersList
              .filter((order) => order.status === categoryOrder)
              .map((item) => (
                <Order key={item.id} id={item.id} status={item.status} />
              ))}
      </div>
    </div>
  );
};

export default OrdersPage;
