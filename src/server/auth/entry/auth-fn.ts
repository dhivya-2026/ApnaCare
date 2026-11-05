import { bridgeHandler } from "./bridge";
import { handleAuthAction } from "../routes/auth-dispatcher";

export default async function handler(req: any, res: any) {
  return await bridgeHandler(req, res, handleAuthAction);
}
