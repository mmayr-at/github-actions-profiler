import React from "react";
import CreateNotificationWorkflowButton from "../workflows/CreateNotificationWorkflowButton";
import { Flex } from "@dynatrace/strato-components-preview";
import LinkIngesterActionButton from "../workflows/LinkIngesterActionButton";
import { MainViewCard } from "../util/components/MainViewCard";
import styled from "styled-components";

const OptionDiv = styled.div`
  flex: 1;
`;

export default function CallToActionsCard() {
  return (
    <MainViewCard>
      <Flex gap={16}>
        <OptionDiv>
          <LinkIngesterActionButton />
        </OptionDiv>
        <OptionDiv>
          <CreateNotificationWorkflowButton />
        </OptionDiv>
      </Flex>
    </MainViewCard>
  );
}
