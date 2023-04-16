import {Grid, Container, Title, Paper} from '@mantine/core';
import {PageTitle} from "../../components/page-title/page-title";
import {useEffect, useState} from "react";
import {LoadingWrapper} from "../../components/loading-wrapper/loading-wrapper";

export const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    //TODO: catch loading API state
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer)
    }, [])

  return (
  <Container size="xl" fluid={true}>
    <PageTitle title="Dash Board" />
    <Grid>
        <Grid.Col md={6} lg={8}>
          <LoadingWrapper loading={loading} children={<Paper shadow="xs" p="md" style={{height:350}}></Paper>} />
        </Grid.Col>
        <Grid.Col md={6} lg={4}>
          <LoadingWrapper loading={loading} children={<Paper shadow="xs" p="md" style={{height:350}}></Paper>} />
        </Grid.Col>
        <Grid.Col md={6} lg={4}>
          <LoadingWrapper loading={loading} children={<Paper shadow="xs" p="md" style={{height:350}}></Paper>} />
        </Grid.Col>
        <Grid.Col md={6} lg={4}>
          <LoadingWrapper loading={loading} children={<Paper shadow="xs" p="md" style={{height:350}}></Paper>} />
        </Grid.Col>
        <Grid.Col md={6} lg={4}>
          <LoadingWrapper loading={loading} children={<Paper shadow="xs" p="md" style={{height:350}}></Paper>} />
        </Grid.Col>
      </Grid>
    </Container>
  );
}

export default Dashboard;
