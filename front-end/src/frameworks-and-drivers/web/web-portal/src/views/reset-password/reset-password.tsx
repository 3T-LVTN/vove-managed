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
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

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

  const navigate = useNavigate();

  const [isNotAuthenticated, setIsNotAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    userController.getUser()
      .then(() => navigate("/"))
      .catch(() => setIsNotAuthenticated(true));
  }, []);

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

  const renderResetPassword = () => (
    <Container size={460} my="5%">
      <Title color="dark.4" fw={900} fs="26rem" align="center">Đặt lại mật khẩu</Title>
      <Text color="dimmed" fz="sm" ta="center">
        Nhập email để đặt lại mật
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
                  <Box ml={5}>Trở lại trang đăng nhập</Box>
                </Center>
              </Anchor>
              <Button className={classes.control} type="submit">Đặt lại mật khẩu</Button>
            </Group>
          </Stack>
        </form>
      </Paper>
    </Container>
  );

  return isNotAuthenticated ? renderResetPassword() : null;
};

export default ResetPassword;
