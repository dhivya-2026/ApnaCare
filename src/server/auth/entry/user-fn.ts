import { bridgeHandler } from "./bridge";
import { handleUserAction } from "../routes/user-dispatcher";

export default async function handler(req: any, res: any) {
  return await bridgeHandler(req, res, handleUserAction);
}
