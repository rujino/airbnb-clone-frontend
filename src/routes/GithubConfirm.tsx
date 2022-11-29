import { Heading, VStack, Text, Spinner, useToast, useQuery } from "@chakra-ui/react";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { githubLogIn } from "../api";

export default function GithubConfirm() {
  const { search } = useLocation();
  const toast = useToast()
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const confirmLogin = async () => {
    const params = new URLSearchParams(search);
    const code = params.get("code"); // django backend에 code param 전달해야한다.
    if (code) {
      const status = await githubLogIn(code); // githubLogIn를 통해 code param을 전달
      if (status === 200) {
        toast({
            status:"success",
            title:"welcome!",
            description: "good!"
        });
        queryClient.refetchQueries(["me"]);
        navigate("/");  // redirection
      }
    }
  };
  useEffect(() => {
    confirmLogin();
  }, []);
  return (
    <VStack justifyContent={"center"} mt={40}>
      <Heading>Processing log in</Heading>
      <Text>Don't go anywhere.</Text>
      <Spinner size="lg" />
    </VStack>
  );
}
