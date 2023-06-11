import {useParams} from "react-router-dom";
import {Button, Container, Grid, Group, Paper, Text, Textarea, Title, useMantineTheme} from "@mantine/core";
import React, {useEffect, useRef, useState} from "react";
import {PageTitle} from "../../components/page-title/page-title";

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
  email: "cloudythy@gmail.com",
  phoneNumber: "0394143031",
  address: "Xã Tân Xuân, Huyện Hóc Môn, Thành phố Hồ Chí Minh",
  content: "I am writing to inquire about your epidemic forecast service. I am interested in using your service to help me better understand the likelihood and severity of potential disease outbreaks in my area. Can you provide me with more information about the data sources you use and the accuracy of your forecasts? Additionally, can you tell me more about the range of diseases that your service covers and the methods you use for analyzing and predicting outbreaks?",
  status: "Opening",
}

const mockComment: Comment[] = [
  {
    id: "000",
    isAdmin: true,
    time: "2023-05-06 11:00:00",
    content: "Hi, thanks for your question. Our data on temperature and precipitation is continuously updated from the common data warehouse. About predicting the epidemic situation, we have written an AI program and trained it very carefully, ensuring the highest accuracy for users."
  },
  {
    id: "001",
    isAdmin: false,
    time: "2023-05-06 11:30:00",
    content: "Thanks for fast reply. Can you give me more detail about your AI?"
  },
  {
    id: "002",
    isAdmin: true,
    time: "2023-05-06 19:00:00",
    content: "Sure. It was trained on a large dataset of historical epidemic data, including information on the location, time, and severity of outbreaks. We also included data on the weather conditions in each location at the time of the outbreak. The AI was trained to recognize patterns in the data and to predict the likelihood and severity of outbreaks based on the weather conditions. We have tested the AI on historical data and found that it is able to predict outbreaks with 95% accuracy."
  }
];

const InquiryDetail = () => {
  const [inquiryRequest, setInquiryRequest] = useState<InquiryRequest | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [isCommenting, setIsCommenting] = useState<boolean>(false);
  const commentRef = useRef<HTMLTextAreaElement>(null);

  const {id} = useParams();

  const theme = useMantineTheme();

  useEffect(() => {
    setInquiryRequest(mockData);
    setComments(mockComment);
  }, [id]);

  const confirmComment = () => {
    console.log(commentRef.current?.value);
    setIsCommenting(false);
    if (commentRef.current?.value.length === 0) return;
    const newComment = commentRef.current?.value;
  }

  const cancelComment = () => {
    setIsCommenting(false);
    commentRef.current!.value = "";
  }

  const commentList = comments.map((comment) => {
    return (
      <>
        <Grid>
          <Grid.Col w={"200px"} span={"content"}>
            <Paper p="xs" bg={comment.isAdmin ? "rgb(21, 170, 191)" : theme.colors.gray[3]}
            sx={{borderRadius:"8px 8px 0 0"}}>
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

        <Paper withBorder sx={{borderRadius:"0 8px 8px 8px"}} mb="md">
          <Text size="md" align={"left"} p="md">
            {comment.content}
          </Text>
        </Paper>
      </>
    )
  })

  return (
    <Container>
      <PageTitle title={"Chi tiết yêu cầu hỗ trợ"}/>
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
          {isCommenting ?
            <Textarea
              placeholder="Your comment"
              label="Add new comment"
              mb="md"
              size="md"
              ref={commentRef}
            />
            : ""}
          {inquiryRequest?.status === "Closed" ?
            <Button variant={"light"} size="sm">Reopen</Button>
            :
            isCommenting ?
              <Group>
                <Button variant={"light"} size="sm" onClick={() => confirmComment()}>Comment</Button>
                <Button variant={"light"} size="sm" onClick={() => cancelComment()} color="red">Cancel</Button>
              </Group>
              :
              <Group>
                <Button variant={"light"} size="sm" onClick={() => setIsCommenting(true)}>Add comment</Button>
                <Button variant={"light"} size="sm" color="red">Close inquiry</Button>
              </Group>
          }
        </Paper>
      }
    </Container>
  );
}

export default InquiryDetail;
