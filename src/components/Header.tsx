import {
  Avatar,
  Box,
  Button,
  HStack,
  IconButton,
  LightMode,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  useColorMode,
  useColorModeValue,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useQueryClient } from "@tanstack/react-query";
import { FaAirbnb, FaMoon, FaSun } from "react-icons/fa";
import { Link } from "react-router-dom";
import { logOut } from "../api";
import useUser from "../lib/useUser";
import LoginModal from "./LoginModal";
import SignUpModal from "./SignUpModal";

export default function Header() {
  const { userLoading, isLoggedIn, user } = useUser(); // 만들어진 hook 사용
  const {
    isOpen: isLoginOpen,
    onClose: onLoginClose,
    onOpen: onLoginOpen,
  } = useDisclosure();
  const {
    isOpen: isSignUpOpen,
    onClose: onSignUpClose,
    onOpen: onSignUpOpen,
  } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();
  const logoColor = useColorModeValue("red.500", "red.200");
  const toast = useToast();
  const queryClinet = useQueryClient(); // index.tsx에 있는 QueryClient에 접근하기 위한 hook
  const onLogOut = async () => {
    await logOut();
    queryClinet.refetchQueries(["me"]); // queryClient가 me라는query를 다시 fetch하도록
    const toastId = toast({
      title: "Login out...",
      description: "See you later",
      status: "loading",
      position: "bottom-right",
    });
    setTimeout(() => {
      toast.update(toastId, {
        status: "success",
        title: "Done!",
        description: "see you later!",
      });
    }, 5000);
  };
  return (
    <Stack
      justifyContent={"space-between"}
      align="center"
      py={10}
      px={20}
      direction={{
        sm: "column",
        md: "row",
      }}
      spacing={{ sm: 4, md: 0 }}
      borderBottomWidth={1}
    >
      <Box color={logoColor}>
        <Link to={"/"}>
          <FaAirbnb size={"48"} />
        </Link>
      </Box>
      <HStack spacing={2}>
        <IconButton
          onClick={toggleColorMode}
          variant={"ghost"}
          aria-label="Toogle dark made"
          icon={colorMode === "light" ? <FaMoon /> : <FaSun />}
        />
        {!userLoading ? (
          !isLoggedIn ? (
            <>
              <Button onClick={onLoginOpen}>Log in</Button>
              <LightMode>
                <Button onClick={onSignUpOpen} colorScheme={"red"}>
                  Sign up
                </Button>
              </LightMode>
            </>
          ) : (
            <Menu>
              <MenuButton>
                <Avatar name={user.name} src={user.avator} size={"md"} />
              </MenuButton>
              <MenuList>
                <MenuItem onClick={onLogOut}>Log out</MenuItem>
              </MenuList>
            </Menu>
          )
        ) : null}
      </HStack>
      <LoginModal isOpen={isLoginOpen} onClose={onLoginClose} />
      <SignUpModal isOpen={isSignUpOpen} onClose={onSignUpClose} />
    </Stack>
  );
}
