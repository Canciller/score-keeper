import React, { useEffect, useState } from "react";
import isAuth from "utils/isAuth";

import { makeStyles } from "@material-ui/core";
import clsx from "clsx";

import OverflowBox from "components/OverflowBox";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "components/Button";
import MenuItem from "@material-ui/core/MenuItem";
import DateFnsUtils from "@date-io/date-fns";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";

import { useLocation, useParams, useHistory } from "react-router-dom";
import { Routes } from "config";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers";
import * as yup from "yup";

import CategoryService from "services/CategoryService";
import ClubService from "services/ClubService";
import { InvertColorsOff } from "@material-ui/icons";
import PlayerService from "services/PlayerService";
import useSnackbar from "hooks/useSnackbar";

const useStyles = makeStyles((theme) => {
  const spacing = theme.spacing(2);

  return {
    root: {
      height: "100%",
      padding: spacing,
    },
    control: {
      marginTop: spacing,
    },
  };
});

const schema = yup.object().shape({
  firstName: yup.string().required("El nombre es requerido."),
  lastName: yup.string().required("El apellido es requerido."),
});

function PlayerEdit(props) {
  const snackbar = useSnackbar();

  const classes = useStyles();

  const history = useHistory();

  // Initial state
  const location = useLocation();
  const initialState = location && location.state;

  // ID
  const params = useParams();
  const id = params && params.id;
  const isNew = !id;

  // Form (firstName, lastName)
  const { register, errors, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });
  const [saving, setSaving] = useState(false);

  const error = (key) => errors[key] && errors[key].message;

  const onSubmit = (data) => {
    data.category = category;
    data.birthday = birthday;
    data.club = club;

    const isValidBirthday = !Number.isNaN(birthday.getTime());
    if (isValidBirthday && category && club) {
      setSaving(true);
      PlayerService.create(data)
        .then(() => {
          history.goBack();
        })
        .catch(err => {
          snackbar.error(err);
          setSaving(false);
        });
    }
  };

  // Categories
  const [categories, setCategories] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(0);
  const category =
    categories && selectedCategory >= 0 && selectedCategory < categories.length
      ? categories[selectedCategory]
      : null;

  // Clubs
  const [clubs, setClubs] = useState(null);
  const [selectedClub, setSelectedClub] = useState(0);
  const club =
    clubs && selectedClub >= 0 && selectedClub < clubs.length
      ? clubs[selectedClub]
      : null;

  // Birthday
  const [birthday, setBirthday] = useState(new Date());

  // Player
  const [message, setMessage] = useState(null);

  // Start
  useEffect(() => {
    CategoryService.getAll()
      .then((categories) => setCategories(categories))
      .catch((err) => {
        snackbar.error(err);
      });

    ClubService.getAll()
      .then((clubs) => setClubs(clubs))
      .catch((err) => {
        snackbar.error(err);
      });
  }, []);

  const busy = !categories || !clubs;

  return (
    <div className={classes.root}>
      <OverflowBox
        busy={busy}
        component={Paper}
        height="100%"
        spacing={2.5}
        message={message}
      >
        <Typography variant="h6">
          {isNew ? "Crear jugador" : "Editar jugador"}
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          {/* Nombre */}
          <TextField
            autoFocus
            label="Nombre"
            variant="outlined"
            className={classes.control}
            required
            fullWidth
            inputRef={register}
            name="firstName"
            error={!!errors.firstName}
            helperText={error("firstName")}
          />

          {/* Apellido */}
          <TextField
            label="Apellido"
            variant="outlined"
            className={classes.control}
            required
            fullWidth
            inputRef={register}
            name="lastName"
            error={!!errors.lastName}
            helperText={error("lastName")}
          />

          {/* Fecha de nacimiento */}
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              disableToolbar
              label="Fecha de nacimiento"
              inputVariant="outlined"
              className={classes.control}
              required
              fullWidth
              format="yyyy-MM-dd"
              placeholder="yyyy-MM-dd"
              openTo="year"
              value={birthday}
              onChange={setBirthday}
              name="birthday"
              invalidDateMessage="Fecha de nacimiento invalida."
            />
          </MuiPickersUtilsProvider>

          {/* Categoria */}
          <TextField
            label="Categoría"
            variant="outlined"
            className={classes.control}
            required
            fullWidth
            disabled={!categories}
            select
            value={selectedCategory}
            name="category"
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories &&
              categories.map((category, i) => {
                return (
                  <MenuItem key={i} value={i}>
                    {category.description}
                  </MenuItem>
                );
              })}
          </TextField>

          {/* Club */}
          <TextField
            label="Club"
            variant="outlined"
            className={classes.control}
            required
            fullWidth
            disabled={!clubs}
            select
            value={selectedClub}
            name="club"
            onChange={(e) => setSelectedClub(e.target.value)}
          >
            {clubs &&
              clubs.map((club, i) => {
                return (
                  <MenuItem key={i} value={i}>
                    {club.name}
                  </MenuItem>
                );
              })}
          </TextField>

          <Button
            busy={saving}
            className={classes.control}
            type="submit"
            fullWidth
          >
            Guardar
          </Button>
        </form>
      </OverflowBox>
    </div>
  );
}

export default isAuth(PlayerEdit);
