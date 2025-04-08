
import Container from "@/components/Container";
import React from "react";
import ProblemView from "./_components/problem-view";

const page = ({ params }: { params: { topic: string } }) => {
  return (
    <Container>
      <ProblemView/>
    </Container>
  );
};

export default page;
