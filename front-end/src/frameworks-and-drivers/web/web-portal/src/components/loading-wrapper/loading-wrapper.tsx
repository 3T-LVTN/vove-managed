import {Skeleton} from "@mantine/core";
import {ReactElement} from "react";

export interface LoadingWrapperProps {
  readonly loading : boolean;
  readonly view_height : string;
  children: ReactElement;
}

export function LoadingWrapper(props: LoadingWrapperProps) {
  return props.loading ? (
    <Skeleton height={props.view_height} radius="md" animate={true} />
  ) : (
    props.children
  )
}
