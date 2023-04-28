import {Anchor, Button, Container, Grid, Image, Paper, PasswordInput, Stack, TextInput, Title} from "@mantine/core";
import {useForm} from "@mantine/form";
import {validateEmail, validatePassword} from "@front-end/shared/utils";
import {notifications} from "@mantine/notifications";
import {AuthFirebase} from "@front-end/frameworks-and-drivers/firebase-auth";
import {UserInteractor} from "@front-end/application/interactors/user";
import {UserController} from "@front-end/interface-adapters/controllers/user";
import {useNavigate} from "react-router-dom";

export const Login = () => {
  const authRepository = new AuthFirebase();
  const userUseCase = new UserInteractor(authRepository);
  const userController = new UserController(userUseCase);

  const navigate = useNavigate();

  const form = useForm({
    initialValues: {
      email: '', password: ''
    }, validate: {
      email: (value) => validateEmail(value), password: (value) => validatePassword(value)
    },
  });

  const showWrongInfoNotification = () => {
    console.error("Wrong email or password");
    notifications.show({
      title: "Wrong Email or Password", message: 'Please try again', color: 'red',
    });
  }

  return (<Container size="lg" my="10%">
    <Paper shadow="md" p={50} mt={30} radius="md" withBorder>
      <Grid gutter={50} align="center">
        <Grid.Col sm={7} xs={12}>
          <Image mx="auto" src={"https://lvtn-s3-vove-web.s3.ap-southeast-1.amazonaws.com/Vove.png"}
                 alt="Signin image"/>
        </Grid.Col>

        <Grid.Col sm={5} xs={12}>
          <form onSubmit={form.onSubmit(() => userController.signIn(form.values.email, form.values.password)
            .catch(() => showWrongInfoNotification()))}>
            <Stack align="stretch" justify="space-around">
              <Title
                align="center"
                color="dark.4"
                sx={(theme) => ({fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontWeight: 900})}
              >
                Welcome Back!
              </Title>
              <TextInput
                placeholder="Email"
                label="Username"
                withAsterisk
                {...form.getInputProps('email')}
              />
              <PasswordInput
                placeholder="Password"
                label="Password"
                withAsterisk
                {...form.getInputProps('password')}
              />
              <Anchor size="sm" href="reset-password">
                Forgot password?
              </Anchor>
              <Button type="submit" mt="md">
                Log In
              </Button>
            </Stack>
          </form>
        </Grid.Col>
      </Grid>
    </Paper>
  </Container>);
};

export default Login;
