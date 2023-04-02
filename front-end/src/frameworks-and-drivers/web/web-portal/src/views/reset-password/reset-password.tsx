import {
  Anchor,
  Button,
  Container,
  Paper,
  Stack,
  TextInput,
  Title,
} from "@front-end/shared/ui";
import {useForm} from "@mantine/form";
import {notifications} from "@mantine/notifications";
import "firebaseui/dist/firebaseui.css";
import {resetPassword} from "@front-end/frameworks-and-drivers/firebase-auth";
import {environment} from "../../environments/environment";
import {validateEmail} from "@front-end/shared/utils";

export const ResetPassword = () => {
  const form = useForm({
    initialValues: {
      email: ''
    },

    validate: {
      email: (value) => validateEmail(value)
    },
  });

  const showResetPasswordEmailNotification = () =>
    notifications.show({
      autoClose: 5000,
      title: "Reset password email has been sent",
      message: 'Please check your mailbox to reset password',
      color: 'blue',
    });

  return (
    <Container size="xs" my="5%">
      <Paper shadow="xs" p="xl" radius="xl">
        <form onSubmit={
          form.onSubmit(() => {
              resetPassword(form.values.email, environment.homeUrl)
                .then(()=>showResetPasswordEmailNotification());
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
