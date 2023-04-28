import {
  Anchor,
  Button,
  Container,
  Paper,
  Stack,
  TextInput,
  Title,
  Text, rem, createStyles, Group, Center, Box
} from "@mantine/core";
import {useForm} from "@mantine/form";
import {notifications} from "@mantine/notifications";
import {validateEmail} from "@front-end/shared/utils";
import {AuthFirebase} from "@front-end/frameworks-and-drivers/firebase-auth";
import {UserInteractor} from "@front-end/application/interactors/user";
import {UserController} from "@front-end/interface-adapters/controllers/user";
import {IconArrowLeft} from "@tabler/icons-react";

const useStyles = createStyles((theme) => ({
  controls: {
    [theme.fn.smallerThan('xs')]: {
      flexDirection: 'column-reverse',
    },
  },

  control: {
    [theme.fn.smallerThan('xs')]: {
      width: '100%',
      textAlign: 'center',
    },
  },
}));

export const ResetPassword = () => {
  const homeUrl = process.env["NX_HOME_URL"] as string;
  const { classes } = useStyles();

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
    <Container size={460} my="5%">
      <Title fs="26rem" align="center">Reset Password</Title>
      <Text color="dimmed" fz="sm" ta="center">
        Enter your email to get a reset link
      </Text>
      <Paper withBorder shadow="md" p={30} radius="md" mt="xl">
        <form onSubmit={
          form.onSubmit(() => {
              userController.resetPassword(form.values.email, homeUrl)
                .then(() => showSuccessResetPasswordEmailNotification())
                .catch(() => showErrorResetPasswordEmailNotification());
            }
          )}>
          <Stack spacing="lg" align="stretch" justify="space-around">
            <TextInput
              placeholder="Email"
              label="Email"
              withAsterisk
              {...form.getInputProps('email')}
            />
            <Group position="apart" mt="lg" className={classes.controls}>
              <Anchor color="dimmed" size="sm" className={classes.control} href="login">
                <Center inline>
                  <IconArrowLeft size={rem(12)} stroke={1.5}/>
                  <Box ml={5}>Back to the login page</Box>
                </Center>
              </Anchor>
              <Button className={classes.control} type="submit">Reset password</Button>
            </Group>
          </Stack>
        </form>
      </Paper>
    </Container>
  );
};

export default ResetPassword;
