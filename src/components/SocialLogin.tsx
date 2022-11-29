import { Box, Button, Divider, HStack, Text, VStack } from "@chakra-ui/react";
import { FaComment, FaGithub } from "react-icons/fa";

export default function SocialLogin() {
  return (
    <Box mb={4}>
      <HStack my={8}>
        <Divider />
        <Text
          textTransform={"uppercase"}
          color="gray.500"
          fontSize={"xs"}
          as="b"
        >
          Or
        </Text>
        <Divider />
      </HStack>
      <VStack>
        <Button
          as={"a"}
          href={
            "https://github.com/login/oauth/authorize?client_id=5cbc3af30e1ace4d6563&scope=read:user,user:email"  // 유저를 github app에서 만든 URL로 보낸다.
            // github development settings에 설정되어있음, 인증되면 http://127.0.0.1:3000/social/github이동
          }
          width={"100%"}
          leftIcon={<FaGithub />}
          colorScheme={"blackAlpha"}
        >
          Contiue with Github
        </Button>
        <Button width={"100%"} leftIcon={<FaComment />} colorScheme={"yellow"}>
          Contiue with Kakao
        </Button>
      </VStack>
    </Box>
  );
}
