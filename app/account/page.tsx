"use client"
import { Container } from "../Components/Container";
import { Watchlist } from "./watchlist";
import { UserAuth } from "../context/AuthContext";
import { useRouter } from 'next/navigation';

const Account = () => {
  const {user, logOut} = UserAuth()

  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await logOut()
      router.push("/")
    } catch (e) {
      console.log(e.message)
    }
  }


  return (
    <Container>
      <h1 className="text-2xl mt-10 font-bold">Welcome, {user?.email}</h1>
      <p className="mt-5">Your watchlist:</p>
      <Watchlist />
    </Container>
  );
};

export default Account;
