import {
  Anchor,
  Button,
  Container,
  Paper,
  Stack,
  TextInput,
  Title,
} from "@mantine/core";
import {useForm} from "@mantine/form";
import {notifications} from "@mantine/notifications";
import {environment} from "../../environments/environment";
import {validateEmail} from "@front-end/shared/utils";
import {AuthFirebase} from "@front-end/frameworks-and-drivers/firebase-auth";
import {UserInteractor} from "@front-end/application/interactors/user";
import {UserController} from "@front-end/interface-adapters/controllers/user";

export const ResetPassword = () => {
  const authRepository = new AuthFirebase();
  const userUseCase = new UserInteractor(authRepository);
  const userController = new UserController(userUseCase);

  const form = useForm({
    initialValues: {
      email: ''
    },
    validate: {
      email: (value) => validateEmail(value)
    },
  });

  const showSuccessResetPasswordEmailNotification = () => {
    console.info("Reset password email has been sent");
    notifications.show({
      title: "Reset password email has been sent",
      message: 'Please check your mailbox to reset password',
      color: 'blue',
    })
  };

  const showErrorResetPasswordEmailNotification = () => {
    console.error("Cannot send reset password email");
    notifications.show({
      title: "Cannot send reset password email",
      message: 'Please check your email again',
      color: 'red',
    })
  };

  return (
    <Container size="xs" my="5%">
      <Paper shadow="xs" p="xl" radius="xl">
        <form onSubmit={
          form.onSubmit(() => {
              userController.resetPassword(form.values.email, environment.homeUrl)
                .then(() => showSuccessResetPasswordEmailNotification())
                .catch(() => showErrorResetPasswordEmailNotification());
            }
          )}>
          <Stack spacing="lg" align="stretch" justify="space-around">
            <Title order={2} align="center">Reset Password</Title>

            <TextInput
              placeholder="Email"
              label="Email"
              withAsterisk
              {...form.getInputProps('email')}
            />

            <Button type="submit">
              Reset
            </Button>

            <Anchor href="login" td="underline">Back to Login</Anchor>
          </Stack>
        </form>
      </Paper>
    </Container>
  );
};

export default ResetPassword;
