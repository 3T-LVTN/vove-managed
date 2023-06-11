import {Badge, Card, createStyles, Stack, Text} from "@mantine/core";
import {useNavigate} from "react-router-dom";
import {InquiryViewModel} from "@front-end/interface-adapters/view-models/inquiry";
import {Status} from "@front-end/domain/entities/inquiry";

export interface InquirySummaryProps {
  inquiries: InquiryViewModel[];
}

const useStyles = createStyles((theme) => ({
  card: {
    '&:hover': {
      background: theme.colors.gray[0], transform: 'scale(1.01)', boxShadow: theme.shadows.md, cursor: "pointer"
    },
  },
}));

export const InquirySummary = (props: InquirySummaryProps) => {
  const navigator = useNavigate();
  const {classes} = useStyles();

  const inquiryList = props.inquiries.map((inquiry) => {

    return (
      <Card
        key={inquiry.id}
        withBorder
        radius="md"
        w="100%"
        className={classes.card}
        onClick={() => navigator(`/inquiries/${inquiry.id}`)}
      >
        <div style={{display: "flex", justifyContent: "space-between"}}>
          <Text fz="xs" tt="uppercase" fw={400} c="dimmed">
            {/*{inquiry.author} - {inquiry.time}*/}
            PHẠM HOÀNG VŨ - {inquiry.time}

          </Text>
          {inquiry.status === Status.CLOSED ?
            <Badge variant={"light"} size={"xs"} color={"gray"}>Đã đóng</Badge>
            :
            (inquiry.status === Status.OPENING ?
                <Badge variant={"light"} size={"xs"}>Đang mở</Badge>
                :
                <Badge variant={"light"} size={"xs"} color={"yellow"}>Đang chờ</Badge>
            )}
        </div>
        <Text fz="lg" fw={500} c={"dark.4"}>
          {inquiry.title}
        </Text>
      </Card>
    )
  })
  return (
    <Stack w="100%" h="72%" justify="stretch" spacing={10}>
      {inquiryList}
    </Stack>
  )
}

export default InquirySummary;
