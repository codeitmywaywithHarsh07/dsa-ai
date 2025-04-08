import Container from "@/components/Container";
import React from "react";
import ProblemView from "./_components/problem-view";


const Page = async ({ params }: { params: Promise<{ topic: string }> }) => {
  // const data = await fetchSomething(params.topic); if needed
  const {topic} = await params

  console.log(`Fetching data for topic: ${topic}`);
  return (
    <Container>
      <ProblemView topic={topic} />
    </Container>
  );
};

export default Page;
