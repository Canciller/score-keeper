import React, { useState, useEffect } from "react";

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
  submit: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(1),
    padding: theme.spacing(1.5, 0),
  },
  alert: {
    position: "absolute",
    bottom: "-4rem",
    left: 0,
    right: 0,
  },
}));

const schema = yup.object().shape({
  username: yup.string().required("El usuario es requerido."),
  password: yup.string().required("La contraseña es requerida."),
});

function SignIn(props) {
  const [serverError, setServerError] = useState({});
  const [withServerError, setWithServerError] = useState(false);

  useEffect(() => {
    setServerError({
      type: "UnauthorizedError",
      message: "El usuario o contraseña son incorrectos.",
    });
  }, [withServerError]);

  const { register, errors, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    setWithServerError(true);
  };

  const classes = useStyles();

  return (
    <Grid
      container
      alignItems="center"
      justify="center"
      className={classes.root}
    >
      <Paper className={classes.paper}>
        {withServerError && (
          <Alert className={classes.alert} severity="error">
            {serverError.message}
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
          <Button
            className={classes.submit}
            variant="contained"
            color="primary"
            type="submit"
            fullWidth
          >
            Ingresar
          </Button>
        </form>
      </Paper>
    </Grid>
  );
}

export default SignIn;
