import Container from "@/components/Container";
import React from "react";
import ProblemView from "./_components/problem-view";

interface PageProps {
  params: { topic: string };
}

const Page = async ({ params }: PageProps) => {
  // const data = await fetchSomething(params.topic); if needed
  return (
    <Container>
      <ProblemView topic={params.topic} />
    </Container>
  );
};

export default Page;
