import {LoadingWrapper} from "./loading-wrapper";
import {render} from "@testing-library/react";
import {Title} from "@mantine/core";

describe("PageTitle", () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <LoadingWrapper
        loading={true}
        children={<Title order={2} color="dark.4">Hello</Title>}
      />
    );
    expect(baseElement).toBeTruthy();
  });
})
