import { Container } from "./Container";
import { Infobar } from "./Infobar";
import { Mainbar } from "./Mainbar";

export const Navbar = () => {
  return (
    <header className="bg-gray-50 dark:bg-gray-900 shadow-sm">
      <Container>
        {/* @ts-expect-error Server Component */}
        <Infobar />
        <Mainbar />
      </Container>
    </header>
  );
};
