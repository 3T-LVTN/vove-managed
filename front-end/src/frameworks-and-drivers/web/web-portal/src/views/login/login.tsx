import {
  Anchor,
  Button,
  Container,
  Image,
  Grid,
  Paper,
  PasswordInput,
  Stack,
  TextInput,
  Title,
  Text
} from "@mantine/core";
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
      email: '',
      password: ''
    },
    validate: {
      email: (value) => validateEmail(value),
      password: (value) => validatePassword(value)
    },
  });

  const showWrongInfoNotification = () => {
    notifications.show({
      title: "Wrong Email or Password",
      message: 'Please try again',
      color: 'red',
    });
  }

  const checkWrongInfo = () => {
    userController.getUser()
      .then((user) => {
        if (!user) showWrongInfoNotification();
        notifications.clean();
        navigate('');
      })
  }

  return (
    <Container size="md" my="5%">
      <Paper shadow="xs" p="md" radius="xl">
        <Grid gutter={50} align="center">
          <Grid.Col sm={6} xs={12} p="xs">
            <Image mx="auto" src={"https://lvtn-s3-vove-web.s3.ap-southeast-1.amazonaws.com/Vove.png"} alt="Signin image"/>
          </Grid.Col>

          <Grid.Col sm={6} xs={12} p="50px">
            <form onSubmit={
              form.onSubmit(() =>
                userController.signIn(form.values.email, form.values.password)
                  .then(()=>checkWrongInfo())
              )}>
              <Stack spacing="lg" align="stretch" justify="space-around">
                <Title order={2} align="center">Log In</Title>

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

                <Button type="submit">
                  Log In
                </Button>

                <Text>Forgot password? <Anchor href="reset-password" td="underline">Change password</Anchor></Text>
              </Stack>
            </form>
          </Grid.Col>
        </Grid>
      </Paper>
    </Container>
  );
};

export default Login;
