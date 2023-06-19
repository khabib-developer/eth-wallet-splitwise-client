import React, { useMemo } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Link } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { IForm } from "../../types/interface";
import { useAuth } from "../../hooks/auth.hook";

export const AuthForm = ({ signIn }: { signIn?: boolean }) => {
  const navigate = useNavigate();

  const { auth } = useAuth();

  const url = signIn ? "login" : "registration";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>({
    resolver: yupResolver(
      yup
        .object(
          signIn
            ? {
                email: yup.string().email().required(),
                password: yup.string().required().min(4),
              }
            : {
                name: yup.string().required(),
                email: yup.string().email().required(),
                password: yup.string().required().min(4),
              }
        )
        .required()
    ),
  });

  const onSubmit: SubmitHandler<IForm> = (data) => auth(data, url);

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {signIn ? "Sign-In" : "Sign-Up"}
        </Typography>
        <Box
          component="form"
          sx={{ mt: 3 }}
          noValidate
          onSubmit={handleSubmit(onSubmit)}
        >
          <Grid container spacing={2}>
            {!signIn && (
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  variant="standard"
                  error={!!errors.name}
                  {...register("name")}
                  color="secondary"
                  id="name"
                  label="name"
                  name="name"
                  autoComplete="user-name"
                />
              </Grid>
            )}

            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                variant="standard"
                color="secondary"
                {...register("email")}
                id="email"
                type="email"
                error={!!errors.email}
                label="email"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                color="secondary"
                fullWidth
                variant="standard"
                {...register("password")}
                name="password"
                error={!!errors.password}
                label="password"
                type="password"
                id="password"
                autoComplete="new-password"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            sx={{ mt: 3, mb: 2 }}
          >
            {signIn ? "Sign-In" : "Sign-Up"}
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link
                component="button"
                variant="body2"
                onClick={() => {
                  navigate(signIn ? "/register" : "/login");
                }}
              >
                {signIn ? "Don't have an account?" : "Already have an account?"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};
