import React from "react";
import { Flex, WithChildren } from "@dynatrace/strato-components-preview";
import Colors from "@dynatrace/strato-design-tokens/colors";
import Spacings from "@dynatrace/strato-design-tokens/spacings";
import Borders from "@dynatrace/strato-design-tokens/borders";

type MainViewCardProps = WithChildren;

export const MainViewCard = ({ children }: MainViewCardProps) => {
  return (
    <Flex
      style={{
        background: `${Colors.Theme.Background[20]}`,
        borderColor: `${Colors.Border.Neutral.Default}`,
        borderRadius: `${Borders.Radius.Container.Default}`,
        borderWidth: `${Borders.Width.Default}`,
        borderStyle: `${Borders.Style.Default}`,
        padding: `${Spacings.Size12}`,
        marginTop: `${Spacings.Size24}`,
        textDecoration: "none",
      }}
    >
      {children}
    </Flex>
  );
};
