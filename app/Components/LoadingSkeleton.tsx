import { Container } from "./Container";

export const LoadingSkeleton = () => {
  return (
    <Container>
      <div className="flex items-center justify-center w-full h-full">
        <div className="my-12 py-8 w-[1600px] h-[800px] dark:bg-gray-700 bg-gray-300 rounded-lg animate-pulse"></div>
      </div>
    </Container>
  );
};
