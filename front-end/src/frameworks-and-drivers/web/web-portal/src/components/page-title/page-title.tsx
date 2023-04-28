import {Container, Divider, Space, Title} from "@mantine/core";

export interface PageTitleProps {
  readonly title: string;
}

export function PageTitle(props: PageTitleProps) {
  return (
    <>
      <Title order={2} color="dark.4">{props.title}</Title>
      <Space h="sm" />
      <Divider size="xs" color="dark.4" />
      <Space h="xl" />
    </>
  );
}
