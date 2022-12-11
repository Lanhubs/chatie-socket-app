import { atom } from "recoil";

const userInfo = atom({ key: "userInfo", default: {} });
const searchContact = atom({key: "contacts", default: []})

export {userInfo, searchContact}
