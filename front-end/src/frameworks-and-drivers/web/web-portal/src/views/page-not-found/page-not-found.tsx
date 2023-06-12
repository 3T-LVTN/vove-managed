import {
  createStyles,
  Image,
  Container,
  Title,
  Text,
  Button,
  SimpleGrid,
  rem,
} from '@mantine/core';
import {useNavigate} from "react-router-dom";

const useStyles = createStyles((theme) => ({
  root: {
    paddingTop: rem(80),
    paddingBottom: rem(80),
  },

  title: {
    fontWeight: 900,
    fontSize: rem(34),
    marginBottom: theme.spacing.md,
    [theme.fn.smallerThan('sm')]: {
      fontSize: rem(32),
    },
  },

  control: {
    [theme.fn.smallerThan('sm')]: {
      width: '100%',
    },
  },

  mobileImage: {
    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },

  desktopImage: {
    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },
}));

export const PageNotFound = () => {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  }

  const {classes} = useStyles();

  return (
    <Container className={classes.root} style={{display:"flex", alignItems: "center", height: "70vh"}}>
      <SimpleGrid spacing={80} cols={2} breakpoints={[{maxWidth: 'sm', cols: 1, spacing: 40}]}>
        <Image src={"https://lvtn-s3-vove-web.s3.ap-southeast-1.amazonaws.com/PageNotFound.png"} alt="Page Not Found"
               className={classes.mobileImage}/>
        <div>
          <Title className={classes.title} color="dark.4">Có gì đó không đúng...</Title>
          <Text color="dimmed" size="lg">
            Trang bạn đang muốn mở không tồn tại. Bạn có thể đã gõ sai đường dẫn, hoặc trang đó đã được
            chuyển đến một URL khác. Nếu bạn nghĩ đây là một lỗi, hãy liên hệ để được hỗ trợ.
          </Text>
          <Button variant="outline" size="md" mt="xl" className={classes.control} onClick={goBack}>
            Quay lại trang trước
          </Button>
        </div>
        <Image src={"https://lvtn-s3-vove-web.s3.ap-southeast-1.amazonaws.com/Vove.png"} alt="Page Not Found"
               className={classes.desktopImage}/>
      </SimpleGrid>
    </Container>
  )
}
export default PageNotFound;


