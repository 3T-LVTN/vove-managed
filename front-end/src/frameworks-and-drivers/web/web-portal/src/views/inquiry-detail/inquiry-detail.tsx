import {useParams} from "react-router-dom";
import {Button, Container, Grid, Group, Paper, Text, Textarea, Title, useMantineTheme} from "@mantine/core";
import React, {useEffect, useRef, useState} from "react";
import {PageTitle} from "../../components/page-title/page-title";

interface InquiryRequest {
  id: string;
  title: string;
  time: string;
  author: string;
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
  title: "Cần thêm thông tin về nguồn dữ liệu và độ chính xác",
  time: "2023-05-06 10:30:00",
  author: "Mai Thy",
  phoneNumber: "0394143031",
  address: "Vinalink Logistics, Đường Nguyễn Tất Thành, Phường 13, Quận 4, Thành phố Hồ Chí Minh, 854020, Việt Nam",
  content: "Tôi viết thư này để hỏi về dịch vụ dự báo dịch bệnh của bạn. Tôi muốn sử dụng dịch vụ của bạn để giúp tôi hiểu rõ hơn về khả năng và mức độ nghiêm trọng của các đợt bùng phát dịch bệnh tiềm ẩn trong khu vực của tôi. Bạn có thể cung cấp cho tôi thêm thông tin về các nguồn dữ liệu mà bạn sử dụng và độ chính xác của các dự báo của bạn? Ngoài ra, bạn có thể cho tôi biết thêm về phạm vi bệnh mà dịch vụ của bạn bao gồm và các phương pháp bạn sử dụng để phân tích và dự đoán các đợt bùng phát không?",
  status: "Opening",
}

const mockComment: Comment[] = [
  {
    id: "000",
    isAdmin: true,
    time: "2023-05-06 11:00:00",
    content: "Chào bạn, cảm ơn bạn đã đặt câu hỏi. Dữ liệu về nhiệt độ và lượng mưa được chúng tôi cập nhật liên tục từ kho dữ liệu chung. Về dự đoán tình hình dịch bệnh, chúng tôi đã viết chương trình AI và huấn luyện rất kỹ, đảm bảo độ chính xác cao nhất cho người dùng."
  },
  {
    id: "001",
    isAdmin: false,
    time: "2023-05-06 11:30:00",
    content: "Cảm ơn đã trả lời nhanh chóng. Bạn có thể cho tôi biết thêm chi tiết về mô hình dự đoán của bạn?"
  },
  {
    id: "002",
    isAdmin: true,
    time: "2023-05-06 19:00:00",
    content: "Chúng tôi sử dụng model GLMM."
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
        <Text mb="xs"><b>Thời gian:</b> {inquiryRequest?.time}</Text>
        <Text mb="xs"><b>Người gửi:</b> {inquiryRequest?.author}</Text>
        <Text mb="xs"><b>Số điện thoại:</b> {inquiryRequest?.phoneNumber}</Text>
        <Text mb="xs"><b>Địa chỉ:</b> {inquiryRequest?.address}</Text>
        <Text mb="xs"><b>Nội dung:</b> {inquiryRequest?.content}</Text>
        {inquiryRequest?.status === "Waiting" ?
          <Button variant={"light"} size="sm">Xử lý yêu cầu này</Button> : ""}
      </Paper>
      {inquiryRequest?.status === "Waiting" ? "" :
        <Paper withBorder p="md" radius="md" mt="md">
          <Title order={2} mb="lg">Bình luận</Title>
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
            <Button variant={"light"} size="sm">Mở lại yêu cầu</Button>
            :
            isCommenting ?
              <Group>
                <Button variant={"light"} size="sm" onClick={() => confirmComment()}>Bình luận</Button>
                <Button variant={"light"} size="sm" onClick={() => cancelComment()} color="red">Huỷ</Button>
              </Group>
              :
              <Group>
                <Button variant={"light"} size="sm" onClick={() => setIsCommenting(true)}>Thêm bình luận</Button>
                <Button variant={"light"} size="sm" color="red">Đóng yêu cầu</Button>
              </Group>
          }
        </Paper>
      }
    </Container>
  );
}

export default InquiryDetail;
