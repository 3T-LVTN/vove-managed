import {useParams} from "react-router-dom";
import {Button, Container, Grid, Group, Paper, Text, Title, useMantineTheme} from "@mantine/core";
import React, {useEffect, useState} from "react";

interface InquiryRequest {
  id: string;
  title: string;
  time: string;
  author: string;
  email: string;
  phoneNumber: string;
  address: string;
  content: string;
  status: "Waiting" | "Opening" | "Closed";
}

interface Comment {
  id: string;
  isAdmin: boolean;
  time: string;
  content: string;
}

const mockData: InquiryRequest = {
  id: "001",
  title: "Need more information about data sources and accuracy",
  time: "2023-05-06 10:30:00",
  author: "Nguyễn Mai Thy",
  email: "thy@gmail.com",
  phoneNumber: "0394143031",
  address: "Xã Tân Xuân, Huyện Hóc Môn, Thành phố Hồ Chí Minh",
  content: "I am writing to inquire about your epidemic forecast service. I am interested in using your service to help me better understand the likelihood and severity of potential disease outbreaks in my area. Can you provide me with more information about the data sources you use and the accuracy of your forecasts? Additionally, can you tell me more about the range of diseases that your service covers and the methods you use for analyzing and predicting outbreaks?",
  status: "Closed",
}

const mockComment: Comment[] = [
  {
    id: "001",
    isAdmin: false,
    time: "2023-05-06 11:30:00",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ut consectetur nisi. Integer pellentesque varius metus, at interdum diam maximus nec. Ut finibus dui varius dui auctor, nec ultrices neque porttitor. Vestibulum pretium est enim, non pretium neque fermentum eu. In a rutrum mi, non ornare libero."
  },
  {
    id: "002",
    isAdmin: true,
    time: "2023-05-06 19:00:00",
    content: "Fusce congue, tellus non consequat semper, turpis tellus tristique elit, eu mollis quam enim in mi. Nam consectetur libero vitae eros fringilla sagittis. Morbi interdum rhoncus lectus, et facilisis ligula sodales pharetra. Aenean ultrices eu lectus id fringilla. Praesent in massa lacinia, fringilla elit ac, pulvinar velit. Vestibulum imperdiet ultrices lacus, convallis semper tellus ullamcorper in. Aenean vulputate orci eget bibendum porttitor. Donec vehicula sit amet ligula eget venenatis. Duis at dui laoreet, gravida augue vel, mollis velit. Donec sed dapibus erat, at rhoncus leo. Curabitur tempor laoreet lectus a porttitor."
  }
];

const InquiryDetail = () => {
  const [inquiryRequest, setInquiryRequest] = useState<InquiryRequest | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);

  const {id} = useParams();

  const theme = useMantineTheme();

  useEffect(() => {
    setInquiryRequest(mockData);
    setComments(mockComment);
  }, [id]);

  const commentList = comments.map((comment) => {
    return (<div>
        <Grid>
          <Grid.Col w={"200px"} span={"content"}>
            <Paper p="xs" bg={comment.isAdmin ? "rgb(21, 170, 191)" : theme.colors.gray[3]}>
              <Text size="md" weight={500} color={comment.isAdmin ? "#FFF" : ""}>
                {comment.isAdmin ? "Admin" : inquiryRequest?.author}
              </Text>
            </Paper>
          </Grid.Col>
          <Grid.Col span={"auto"} px={0}>
            <Text size="md" py="xs" color={theme.colors.gray[7]}>
              {comment.time}
            </Text>
          </Grid.Col>
        </Grid>

        <Paper withBorder radius="md" mb="md">
          <Text size="md" align={"left"} p="md">
            {comment.content}
          </Text>
        </Paper>
      </div>
    )
  })

  return (
    <Container fluid>
      <Paper withBorder p="md" radius="md">
        <Title order={1} mb="xs">{inquiryRequest?.title}</Title>
        <Text mb="xs"><b>Time:</b> {inquiryRequest?.time}</Text>
        <Text mb="xs"><b>Author:</b> {inquiryRequest?.author}</Text>
        <Text mb="xs"><b>Email:</b> {inquiryRequest?.email}</Text>
        <Text mb="xs"><b>Phone:</b> {inquiryRequest?.phoneNumber}</Text>
        <Text mb="xs"><b>Address:</b> {inquiryRequest?.address}</Text>
        <Text mb="xs"><b>Content:</b> {inquiryRequest?.content}</Text>
        {inquiryRequest?.status === "Waiting" ?
          <Button variant={"light"} size="sm">Accept this Inquiry</Button> : ""}
      </Paper>
      {inquiryRequest?.status === "Waiting" ? "" :
        <Paper withBorder p="md" radius="md" mt="md">
          <Title order={2} mb="lg">Comments</Title>
          {commentList}
          {inquiryRequest?.status === "Closed" ?
            <Button variant={"light"} size="sm">Reopen</Button>
            :
            <Group>
              <Button variant={"light"} size="sm" >Add comment</Button>
              <Button variant={"light"} size="sm" color="red">Close inquiry</Button>
            </Group>
          }
        </Paper>
      }
    </Container>
  )
    ;
}

export default InquiryDetail;
