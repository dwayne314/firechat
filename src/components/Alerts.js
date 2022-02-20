import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteAlert } from "../redux/actions";
import { getAlerts } from "../redux/selectors";
import { GrFormClose } from "react-icons/gr";

function Alerts() {
  const dispatch = useDispatch();
  const alerts = useSelector(getAlerts);

  const clearAlertById = useCallback(
    (alertId) => {
      dispatch(deleteAlert(alertId));
    },
    [dispatch]
  );

  useEffect(() => {
    let timeout;
    if (alerts.length) {
      timeout = window.setTimeout(() => clearAlertById(alerts[0].id), 3000);
    }
    return () => clearTimeout(timeout);
  }, [alerts, clearAlertById]);

  return (
    <div className="absolute z-50 flex flex-col items-center w-full">
      {alerts.map((alert) => {
        return (
          <div
            className={`relative w-full w-full h-10 px-4 border-b-2 ${
              alert.type === "error"
                ? "bg-red-500 border-red-700"
                : "bg-green-500 border-green-700"
            }`}
          >
            <div className="flex items-center h-full text-sm">{`${
              alert.title ? alert.title + ": " : ""
            }${alert.message}`}</div>
            <GrFormClose
              onClick={() => clearAlertById(alert.id)}
              className="absolute z-50 cursor-pointer top-1 right-1"
            />
          </div>
        );
      })}
    </div>
  );
}

export default Alerts;
