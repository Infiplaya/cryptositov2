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
      <h1 className="text-3xl mt-10 font-bold">Welcome, {user?.email}</h1>
      <button className="px-4 py-2 bg-blue-500 font-medium rounded-lg" onClick={handleSignOut}>Sign out</button>
      <p>Your watchlist:</p>
      <Watchlist />
    </Container>
  );
};

export default Account;
