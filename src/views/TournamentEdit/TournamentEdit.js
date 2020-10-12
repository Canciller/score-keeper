import React, { useEffect, useState } from "react";
import { useLocation, useParams, useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core";
import OverflowBox from "components/OverflowBox";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";
import Switch from "@material-ui/core/Switch";
import TournamentService from "services/TournamentService";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers";
import * as yup from "yup";
import { Routes } from "config";
import isAuth from "utils/isAuth";
import clsx from "clsx";
import useSnackbar from "hooks/useSnackbar";

const useStyles = makeStyles((theme) => {
  const spacing = theme.spacing(2);

  return {
    root: {
      padding: spacing,
      height: "100%",
    },
    container: {
      padding: spacing,
      height: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    message: {
      color: theme.palette.text.disabled,
      userSelect: "none",
    },
    title: {},
    control: {
      marginTop: spacing,
    },
    submitWrapper: {
      marginTop: spacing,
      position: "relative",
    },
    submitProgress: {
      position: "absolute",
      top: "50%",
      left: "50%",
      marginTop: -12,
      marginLeft: -12,
    },
    checkbox: {
      display: "flex",
      alignItems: "center",
    },
    invisible: {
      position: "absolute",
      height: 0,
      width: 0,
      top: 0,
      left: 0,
      visibility: "hidden",
    },
  };
});

const schema = yup.object().shape({
  name: yup.string().required("El nombre es requerido."),
  season: yup.string().required("La temporada es requerida."),
  stages: yup
    .number()
    .typeError("El número de etapas es requerido.")
    .required("El número de etapas es requerido.")
    .positive("El número de etapas no puede ser menor a uno."),
  blocked: yup.boolean(),
});

function TournamentEdit(props) {
  const snackbar = useSnackbar();
  const classes = useStyles();

  const params = useParams();
  const id = params && params.id;
  const location = useLocation();
  const history = useHistory();

  const [saving, setSaving] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [busy, setBusy] = useState(true);
  const [tournament, setTournament] = useState({
    name: "",
    season: "",
    stages: 1,
    blocked: false,
  });

  useEffect(() => {
    const { state } = location;

    if (!id) {
      setTournament({
        ...tournament,
        ...state,
      });
      setDisabled(false);
      setBusy(false);
    } else {
      TournamentService.get(id)
        .then((data) => {
          setTournament({
            ...tournament,
            ...data,
          });
          setDisabled(false);
        })
        .catch((err) => {})
        .finally(() => {
          setBusy(false);
        });
    }
  }, []);

  const { register, errors, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    setSaving(true);

    let method = !id
      ? TournamentService.create.bind(TournamentService)
      : TournamentService.update.bind(TournamentService, id);

    method(data)
      .then((data) => {
        if (!id) history.push(Routes.TOURNAMENTS + "/" + data.id);
        else {
          snackbar.success('Torneo guardado exitosamente.');
          setSaving(false);
        }
      })
      .catch((err) => {
        snackbar.error(err);
        setSaving(false);
      });
  };

  return (
    <div className={classes.root}>
      {busy ? (
        <Paper className={classes.container}>
          <CircularProgress />
        </Paper>
      ) : disabled ? (
        <Paper className={classes.container}>
          <Typography variant="subtitle1" className={classes.message}>
            Torneo no encontrado.
          </Typography>
        </Paper>
      ) : (
        <OverflowBox component={Paper} height="100%" spacing={2.5}>
          <Typography variant="h6" className={classes.title}>
            {!id ? "Crear torneo" : "Editar torneo"}
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <TextField
              error={!!errors.name}
              helperText={errors.name && errors.name.message}
              disabled={disabled}
              className={classes.control}
              inputRef={register}
              name="name"
              fullWidth
              label="Nombre"
              variant="outlined"
              defaultValue={tournament.name}
              required
            />
            <TextField
              error={!!errors.season}
              helperText={errors.season && errors.season.message}
              disabled={disabled}
              className={classes.control}
              inputRef={register}
              defaultValue={tournament.season}
              name="season"
              fullWidth
              label="Temporada"
              variant="outlined"
              required
            />
            <TextField
              error={!!errors.stages}
              helperText={errors.stages && errors.stages.message}
              disabled={disabled}
              className={clsx(
                classes.control,
                Boolean(id) && classes.invisible
              )}
              inputRef={register}
              type="number"
              defaultValue={tournament.stages}
              name="stages"
              fullWidth
              label="Número de etapas"
              variant="outlined"
              required
            />
            <div className={clsx(classes.control, classes.checkbox)}>
              <Typography>Bloqueado</Typography>
              <Switch
                inputRef={register}
                name="blocked"
                disabled={disabled}
                defaultChecked={tournament.blocked}
                color="primary"
              />
            </div>
            <div className={classes.submitWrapper}>
              <Button
                disabled={saving}
                className={classes.submit}
                variant="contained"
                color="primary"
                type="submit"
                fullWidth
              >
                Guardar
              </Button>
              {saving && (
                <CircularProgress
                  size={24}
                  className={classes.submitProgress}
                />
              )}
            </div>
          </form>
        </OverflowBox>
      )}
    </div>
  );
}

export default isAuth(TournamentEdit);
