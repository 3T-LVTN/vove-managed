import {
  Anchor,
  Button,
  Container,
  Paper,
  Stack,
  TextInput,
  Title,
  Text
} from "@front-end/shared/ui";
import {useForm} from "@mantine/form";
import "firebaseui/dist/firebaseui.css";
import {resetPassword} from "@front-end/frameworks-and-drivers/firebase-auth";

export const ResetPassword = () => {
  const form = useForm({
    initialValues: {
      email: ''
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    },
  });

  return (
    <Container size="xs" my="5%">
      <Paper shadow="xs" p="xl" radius="xl">
        <form onSubmit={
          form.onSubmit(() =>
              resetPassword(form.values.email)
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
