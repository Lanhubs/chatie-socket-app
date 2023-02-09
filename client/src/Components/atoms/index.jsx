import { useRecoilState, atom } from "recoil";

const userState = atom({
  key: "user state",
  default: null,
});
const notificationState = atom({ key: "notifications", default: null });
const chatsState = atom({ key: "chatstate", default: null });
const searchState = atom({key: "search user", default: null})
export { userState, notificationState, chatsState, searchState };
