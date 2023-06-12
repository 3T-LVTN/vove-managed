import {useParams} from "react-router-dom";
import {Button, Container, Grid, Group, Paper, Text, Textarea, Title, useMantineTheme} from "@mantine/core";
import React, {useEffect, useRef, useState} from "react";
import {PageTitle} from "../../components/page-title/page-title";
import {InquiryViewModel} from "@front-end/interface-adapters/view-models/inquiry";
import {CommentEntity, Status} from "@front-end/domain/entities/inquiry";
import {InquiryApi} from "@front-end/frameworks-and-drivers/app-sync/inquiry";
import {InquiryRepository} from "@front-end/application/repositories/inquiry";
import {InquiryUsecases} from "@front-end/application/usecases/inquiry";
import {InquiryInteractors} from "@front-end/application/interactors/inquiry";
import {InquiryControllers} from "@front-end/interface-adapters/controllers/inquiry";

const InquiryDetail = () => {
  const [inquiryRequest, setInquiryRequest] = useState<InquiryViewModel>();
  const [isCommenting, setIsCommenting] = useState<boolean>(false);
  const commentRef = useRef<HTMLTextAreaElement>(null);

  const inquiryRepository: InquiryRepository = new InquiryApi();
  const inquiryUseCase: InquiryUsecases = new InquiryInteractors(inquiryRepository);
  const inquiryController: InquiryControllers = new InquiryControllers(inquiryUseCase);

  const {id} = useParams();

  const theme = useMantineTheme();

  const fetchInquiry = async () => {
    const inquiry = await inquiryController.getInquiryById(id!);
    setInquiryRequest(inquiry);
  }

  const openInquiry = async () => {
    await inquiryController.changeStatus(id!, Status.OPENING);
    fetchInquiry();
  }

  const closeInquiry = async () => {
    await inquiryController.changeStatus(id!, Status.CLOSED);
    fetchInquiry();
  }

  useEffect(() => {
    fetchInquiry();
  }, [id]);

  const confirmComment = async () => {
    setIsCommenting(false);
    if (commentRef.current?.value.length === 0) return;
    const newComment: CommentEntity = {
      isAdmin: true,
      message: commentRef.current?.value ?? ""
    }
    await inquiryController.postComment(id!, newComment);
    fetchInquiry();
  }

  const cancelComment = () => {
    setIsCommenting(false);
    commentRef.current!.value = "";
  }

  const commentList = inquiryRequest?.comments?.map((comment) => {
    return (
      <>
        <Grid>
          <Grid.Col w={"200px"} span={"content"}>
            <Paper p="xs" bg={comment.isAdmin ? "rgb(21, 170, 191)" : theme.colors.gray[3]}
                   sx={{borderRadius: "8px 8px 0 0"}}>
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

        <Paper withBorder sx={{borderRadius: "0 8px 8px 8px"}} mb="md">
          <Text size="md" align={"left"} p="md">
            {comment.message}
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
        <Text mb="xs"><b>Số điện thoại:</b> {inquiryRequest?.phone}</Text>
        <Text mb="xs"><b>Địa chỉ:</b> {inquiryRequest?.address ?? ""}</Text>
        <Text mb="xs"><b>Nội dung:</b> {inquiryRequest?.message}</Text>
        {inquiryRequest?.status === Status.WAITING ?
          <Button variant={"light"} size="sm" onClick={() => openInquiry()}>Xử lý yêu cầu này</Button> : ""}
      </Paper>
      {inquiryRequest?.status === Status.WAITING ? "" :
        <Paper withBorder p="md" radius="md" mt="md">
          <Title order={2} mb="lg">Phản hồi</Title>
          {commentList}
          {isCommenting ?
            <Textarea
              placeholder="Phản hồi của bạn"
              label="Thêm phản hồi"
              mb="md"
              size="md"
              ref={commentRef}
            />
            : ""}
          {inquiryRequest?.status === Status.CLOSED ?
            <Button variant={"light"} size="sm" onClick={() => openInquiry()}>Mở lại yêu cầu</Button>
            :
            isCommenting ?
              <Group>
                <Button variant={"light"} size="sm" onClick={() => confirmComment()}>Gửi phản hồi</Button>
                <Button variant={"light"} size="sm" onClick={() => cancelComment()} color="red">Huỷ</Button>
              </Group>
              :
              <Group>
                <Button variant={"light"} size="sm" onClick={() => setIsCommenting(true)}>Thêm bình luận</Button>
                <Button variant={"light"} size="sm" color="red" onClick={() => closeInquiry()}>Đóng yêu cầu</Button>
              </Group>
          }
        </Paper>
      }
    </Container>
  );
}

export default InquiryDetail;
