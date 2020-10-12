import React from "react";
import { useSnackbar } from "notistack";

export default function () {
  const { enqueueSnackbar } = useSnackbar();

  const message = (msg, variant = "default") => {
    if (msg instanceof Object) msg = msg.message;

    if (msg) {
      enqueueSnackbar(msg, {
        variant,
      });
    }
  };

  return {
    message,
    error: (err) => message(err, "error"),
    success: (msg) => message(msg, "success"),
  };
}
