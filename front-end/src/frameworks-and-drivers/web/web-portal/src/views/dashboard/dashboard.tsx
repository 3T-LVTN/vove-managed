import {Grid, Skeleton, Container} from '@mantine/core';
import {PageTitle} from "../../components/page-title/page-title";
import {useState} from "react";

const child = <Skeleton height={350} radius="md" animate={true} />;

export const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  return (
  <Container size="xl" fluid={true}>
    <PageTitle title="Dash Board" />
    <Grid>
        <Grid.Col md={6} lg={8}>{child}</Grid.Col>
        <Grid.Col md={6} lg={4}>{child}</Grid.Col>
        <Grid.Col md={6} lg={4}>{child}</Grid.Col>
        <Grid.Col md={6} lg={4}>{child}</Grid.Col>
        <Grid.Col md={6} lg={4}>{child}</Grid.Col>
      </Grid>
    </Container>
  );
}

export default Dashboard;
