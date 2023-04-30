import {Container, Divider, Space, Title} from "@mantine/core";

export interface PageTitleProps {
  readonly title: string;
}

export function PageTitle(props: PageTitleProps) {
  return (
    <>
      {/*<Space h="sm" />*/}
      <Title order={1} color="dark.4" fw={900}>{props.title}</Title>
      {/*<Divider size="xs" color="dark.4" />*/}
      <Space h="xl" />
    </>
  );
}
