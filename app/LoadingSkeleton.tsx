import { Container } from "./Container";

export const LoadingSkeleton = () => {
  return (
    <Container>
      <div className="flex items-center justify-center w-full h-full">
        <div className="my-12 py-8 w-[1600px] h-[383px] bg-gray-900 rounded-lg animate-pulse"></div>
      </div>
    </Container>
  );
};
