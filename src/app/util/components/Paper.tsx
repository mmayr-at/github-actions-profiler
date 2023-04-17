import React, { ReactElement, ReactNode } from "react";
import Colors from "@dynatrace/strato-design-tokens/colors";
import Borders from "@dynatrace/strato-design-tokens/borders";
import Spacings from "@dynatrace/strato-design-tokens/spacings";
import BoxShadows from "@dynatrace/strato-design-tokens/box-shadows";

interface PaperProps {
  children: ReactNode;
}

export default function Paper({ children }: PaperProps): ReactElement {
  return (
    <div
      style={{
        background: `${Colors.Theme.Background["20"]}`,
        borderColor: `${Colors.Border.Neutral.Default}`,
        borderRadius: `${Borders.Radius.Container.Default}`,
        boxShadow: `${BoxShadows.Surface.Raised.Rest}`,
        padding: `${Spacings.Size12}`,
      }}
    >
      {children}
    </div>
  );
}
