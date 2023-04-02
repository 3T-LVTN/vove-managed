import {Anchor, Button, Container, Image, Space, Stack, Text} from "@front-end/shared/ui"
import PageNotFoundImage from "../../assets/PageNotFound.png"
import { useNavigate } from "react-router-dom";
export const PageNotFound = () => {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  }
  return (
    <Container size="sm" my="5%">
          <Stack  align="center" justify="center">
            <Image mx="auto" src={PageNotFoundImage} alt="Page Not Found"/>
            <Space h="xs" />
            <Text>We can't seem to find the page you're looking for.</Text>
            <Text>Try going back to the previous page or <Anchor>contact us</Anchor> for more information.</Text>
            <Space h="xs" />
            <Button size="lg" radius="xl" onClick={goBack}>Go Back</Button>
            {/*TODO: can send email to dev when clicking on contact*/}
          </Stack>
    </Container>
  )
}

export default PageNotFound;
