import React, { useState, useEffect } from "react";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers";
import * as yup from "yup";

import styles from "./SignIn.module.scss";
import { makeStyles } from "@material-ui/core/styles";

import Alert from "components/Alert";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";

const useStyles = makeStyles((theme) => ({
  title: {
    marginBottom: theme.spacing(1),
  },
  paper: {
    padding: theme.spacing(4),
  },
  submit: {
    margin: theme.spacing(1, 0, 3),
    padding: theme.spacing(1.5, 0),
  },
  alert: {
    position: "absolute",
    bottom: '-4rem',
    left: 0,
    right: 0
  }
}));

const schema = yup.object().shape({
  username: yup.string().required("El usuario es requerido."),
  password: yup.string().required("La contraseña es requerida."),
  remember: yup.boolean(),
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
      className={styles.root}
      container
      justify="center"
      alignItems="center"
    >
      <div className={styles.container}>
        {withServerError && (
          <Alert
            className={classes.alert}
            severity="error">{serverError.message}</Alert>
        )}
        <Paper className={classes.paper}>
          <Typography className={classes.title} component="h1" variant="h5">
            Ingresar
          </Typography>
          <form
            className={styles.form}
            onSubmit={handleSubmit(onSubmit)}
            noValidate
          >
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
            <FormControlLabel
              control={
                <Checkbox
                  name="remember"
                  inputRef={register}
                  defaultValue={false}
                  color="primary"
                />
              }
              label="Remember me"
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
          <Grid container>
            <Grid item>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
          </Grid>
        </Paper>
      </div>
    </Grid>
  );
}

export default SignIn;
