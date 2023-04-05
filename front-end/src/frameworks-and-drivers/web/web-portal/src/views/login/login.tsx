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
} from "@front-end/shared/ui";
import {useForm} from "@mantine/form";
import "firebaseui/dist/firebaseui.css";
import {auth, signinEmailPassword} from "@front-end/frameworks-and-drivers/firebase-auth";
import {validateEmail, validatePassword} from "@front-end/shared/utils";
import {notifications} from "@mantine/notifications";

export const Login = () => {
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
    if (auth.currentUser) return null;
    return notifications.show({
      autoClose: 5000,
      title: "Wrong Email or Password",
      message: 'Please try again',
      color: 'red',
    });
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
                signinEmailPassword(form.values.email, form.values.password)
                  .then(showWrongInfoNotification)
              )}>
              <Stack spacing="lg" align="stretch" justify="space-around">
                <Title order={2} align="center">Log Innnn</Title>

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
