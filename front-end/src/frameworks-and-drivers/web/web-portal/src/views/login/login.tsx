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
} from "@front-end/frameworks-and-drivers/mantine";
import {useForm} from "@mantine/form";
import SigninImage from "../../assets/Login.png"
import "firebaseui/dist/firebaseui.css";
import {signinEmailPassword} from "@front-end/frameworks-and-drivers/firebase-auth";

export const Login = () => {
  const form = useForm({
    initialValues: {
      email: '',
      password: ''
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    },
  });

  return (
    <Container size="md" my="5%">
      <Paper shadow="xs" p="md" radius="xl">
        <Grid gutter={50}>
          <Grid.Col sm={6} xs={12} p="xs">
            <Image mx="auto" src={SigninImage} alt="Signin image"/>
          </Grid.Col>

          <Grid.Col sm={6} xs={12} p="50px">
            <form onSubmit={
              form.onSubmit(() =>
                signinEmailPassword(form.values.email, form.values.password)
              )}>
              <Stack spacing="lg">
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

                <Button type="submit" maw="200px">
                  Log In
                </Button>

                <Text>Forgot password? <Anchor td="underline">Change password</Anchor></Text>
              </Stack>
            </form>
          </Grid.Col>
        </Grid>
      </Paper>
    </Container>
  );
};

export default Login;
