import {
  Anchor, Box,
  Button,
  Container,
  Grid,
  Image,
  LoadingOverlay,
  Paper,
  PasswordInput,
  Stack,
  TextInput,
  Title
} from "@mantine/core";
import {useForm} from "@mantine/form";
import {validateEmail, validatePassword} from "@front-end/shared/utils";
import {notifications} from "@mantine/notifications";
import {AuthFirebase} from "@front-end/frameworks-and-drivers/firebase-auth";
import {UserInteractor} from "@front-end/application/interactors/user";
import {UserController} from "@front-end/interface-adapters/controllers/user";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";

export const Login = () => {
  const authRepository = new AuthFirebase();
  const userUseCase = new UserInteractor(authRepository);
  const userController = new UserController(userUseCase);

  const navigate = useNavigate();

  const [isNotAuthenticated, setIsNotAuthenticated] = useState(false);

  useEffect(() => {
    userController.getUser()
      .then(() => navigate("/"))
      .catch(() => setIsNotAuthenticated(true));
  }, []);

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

  const renderLogin = () => (
    <Container size="lg" my="10%">
      <Paper shadow="md" p={50} mt={30} radius="md" withBorder>
        <Grid gutter={50} align="center">
          <Grid.Col sm={7} xs={12}>
            <Image mx="auto" src={"https://lvtn-s3-vove-web.s3.ap-southeast-1.amazonaws.com/Vove.png"}
                   alt="Signin image"/>
          </Grid.Col>
          <Grid.Col sm={5} xs={12}>
            <form onSubmit={form.onSubmit(() => {
              userController.signIn(form.values.email, form.values.password)
                .then(() => navigate('/'))
                .catch(() => showWrongInfoNotification())
            })}>
              <Stack align="stretch" justify="space-around">
                <Title
                  align="center"
                  color="dark.4"
                  sx={(theme) => ({fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontWeight: 900})}
                >
                  Xin chào!
                </Title>
                <TextInput
                  placeholder="Email"
                  label="Tên đăng nhập"
                  withAsterisk
                  {...form.getInputProps('email')}
                />
                <PasswordInput
                  placeholder="Mật khẩu"
                  label="Password"
                  withAsterisk
                  {...form.getInputProps('password')}
                />
                <Anchor size="sm" href="reset-password">
                  Quên mật khẩu?
                </Anchor>
                <Button type="submit" mt="md">
                  Đăng nhập
                </Button>
              </Stack>
            </form>
          </Grid.Col>
        </Grid>
      </Paper>
    </Container>
  );

  return isNotAuthenticated ? renderLogin() : null;
};

export default Login;
