import { all } from "redux-saga/effects";
import * as authHandler from "./auth";

export default function* root() {
  yield all([
    authHandler.checkUserLoginWatcher(),
  ]);
}
