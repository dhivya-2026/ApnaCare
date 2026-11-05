import { bridgeHandler } from "./bridge";
import { handleSahaAction } from "../routes/saha-dispatcher";

export default async function handler(req: any, res: any) {
  return await bridgeHandler(req, res, handleSahaAction);
}
