import { useEffect, useState } from "react";
import classes from "./Notification.module.css";
export const NOTIFICATION_STATUS = {
  error: "err",
  success: "success",
  pending: "pending",
};
export const Notification = ({
  status,
  title,
  message,
  visible,
  hideNotification,
}) => {
  let specialClasses = "";

  if (status === NOTIFICATION_STATUS.error) {
    specialClasses = classes.error;
  }
  if (status === NOTIFICATION_STATUS.success) {
    specialClasses = classes.success;
  }

  const cssClasses = `${classes.notification} ${specialClasses}`;
  if (visible)
    return (
      <section className={cssClasses}>
        <h2>{title}</h2>
        <p>{message}</p>
        <button
          style={{ background: "white", color: "#000" }}
          onClick={hideNotification}
        >
          x
        </button>
      </section>
    );
};
