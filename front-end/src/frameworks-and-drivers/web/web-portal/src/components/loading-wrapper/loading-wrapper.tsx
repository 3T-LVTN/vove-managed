import {Skeleton} from "@mantine/core";
import {ReactElement} from "react";

export interface LoadingWrapperProps {
  readonly loading : boolean;
  children: ReactElement;
}

export function LoadingWrapper(props: LoadingWrapperProps) {
  return props.loading ? (
    <Skeleton height={350} radius="md" animate={true} />
  ) : (
    props.children
  )
}
