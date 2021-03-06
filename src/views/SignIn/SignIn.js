import React, { useState, useContext } from "react";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers";
import * as yup from "yup";

import { makeStyles } from "@material-ui/core/styles";

import Alert from "components/Alert";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";

import { AuthContext } from "context/AuthContext";
import { useHistory } from "react-router-dom";
import { Routes } from "config";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
  },
  title: {
    marginBottom: theme.spacing(1),
  },
  paper: {
    padding: theme.spacing(4),
    position: "relative",
    maxWidth: "24rem",
  },
  submitWrapper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(1),
    position: "relative",
  },
  submit: {
    padding: theme.spacing(1.5, 0),
  },
  submitProgress: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
  alert: {
    position: "absolute",
    bottom: "-5rem",
    left: 0,
    right: 0,
  },
}));

const schema = yup.object().shape({
  username: yup.string().required("El usuario es requerido."),
  password: yup.string().required("La contraseña es requerida."),
});

function SignIn(props) {
  const history = useHistory();

  const auth = useContext(AuthContext);

  const [error, setError] = useState(null);

  const { register, errors, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });

  const [busy, setBusy] = useState(false);

  const onSubmit = (data) => {
    setBusy(true);

    auth
      .signIn(data)
      .then(() => {
        history.push(Routes.TOURNAMENTS);
      })
      .catch((err) => {
        //if (err.name === "UnauthorizedError") console.error(err);

        setError(err);
        setBusy(false);
      });
  };

  const classes = useStyles();

  if (auth.user) history.push(Routes.TOURNAMENTS);

  return (
    <Grid
      container
      alignItems="center"
      justify="center"
      className={classes.root}
    >
      <Paper className={classes.paper}>
        {error && (
          <Alert className={classes.alert} severity="error">
            {error.message}
          </Alert>
        )}
        <Typography className={classes.title} component="h1" variant="h5">
          Ingresar
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <TextField
            error={!!errors.username}
            helperText={errors.username && errors.username.message}
            name="username"
            inputRef={register}
            label="Usuario"
            variant="outlined"
            margin="normal"
            required
            fullWidth
          />
          <TextField
            error={!!errors.password}
            helperText={errors.password && errors.password.message}
            name="password"
            inputRef={register}
            label="Contraseña"
            variant="outlined"
            margin="normal"
            type="password"
            required
            fullWidth
          />
          <div className={classes.submitWrapper}>
            {busy && (
              <CircularProgress size={24} className={classes.submitProgress} />
            )}
            <Button
              disabled={busy}
              className={classes.submit}
              variant="contained"
              color="primary"
              type="submit"
              fullWidth
            >
              Ingresar
            </Button>
          </div>
        </form>
      </Paper>
    </Grid>
  );
}

export default SignIn;
