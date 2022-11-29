import { useQuery } from "@tanstack/react-query";
import { getMe } from "../api";

// useUser Hook 만들기
export default function useUser() {
  const { isLoading, data, isError } = useQuery(["me"], getMe, {
    retry: false, // login에 실패하면 그대로 멈추게(react query는 불러오기 실패시 계속 재시도를 하게 설계되어있음)
  }); // isError는 boolean을 반환
  return {
    userLoading: isLoading,
    user: data,
    isLoggedIn: !isError,
  };
}
