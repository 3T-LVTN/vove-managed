import {Badge, Card, createStyles, Stack, Text} from "@mantine/core";
import {useNavigate} from "react-router-dom";

const useStyles = createStyles((theme) => ({
  card: {
    '&:hover': {
      background: theme.colors.gray[0], transform: 'scale(1.01)', boxShadow: theme.shadows.md, cursor: "pointer"
    },
  },
}));

export const inquirySummary = () => {
  const navigator = useNavigate();
  const {classes} = useStyles();

  return (<Stack w="100%" h="72%" justify="stretch" spacing={10}>
      <Card
        withBorder
        radius="md"
        w="100%"
        className={classes.card}
        onClick={() => navigator(`/users`)}
      >
        <div style={{display:"flex", justifyContent: "space-between"}}>
          <Text fz="xs" tt="uppercase" fw={400} c="dimmed">
            Nguyen Mai Thy - 03/05/2023 15:15
          </Text>
          <Badge variant={"light"} size={"xs"}>Opening</Badge>
        </div>
        <Text fz="lg" fw={500} c={"dark.4"}>
          The predict results at my living area is incorrect
        </Text>
      </Card>

      <Card
        withBorder
        radius="md"
        w="100%"
        className={classes.card}
        onClick={() => navigator(`/users`)}
      >
        <div style={{display:"flex", justifyContent: "space-between"}}>
          <Text fz="xs" tt="uppercase" fw={400} c="dimmed">
            Le Tran Hoang Thinh - 03/05/2023 15:15
          </Text>
          <Badge variant={"light"} size={"xs"} color={"red"}>Closed</Badge>
        </div>
        <Text fz="lg" fw={500} c={"dark.4"}>
          I can't find my place on your map
        </Text>
      </Card>

      {/*<Card*/}
      {/*  withBorder*/}
      {/*  radius="md"*/}
      {/*  w="100%"*/}
      {/*  className={classes.card}*/}
      {/*  onClick={() => navigator(`/users`)}*/}
      {/*>*/}
      {/*  <Text fz="xs" tt="uppercase" fw={400} c="dimmed">*/}
      {/*    Le Tran Hoang Thinh - 09/04/2023 16:32*/}
      {/*  </Text>*/}
      {/*  <Text fz="lg" fw={500}>*/}
      {/*    I can't find my place on your map*/}
      {/*  </Text>*/}
      {/*</Card>*/}

    </Stack>

  )
}

export default inquirySummary;
