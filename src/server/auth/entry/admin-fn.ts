import { bridgeHandler } from "./bridge";
import { handleAdminAction } from "../routes/admin-dispatcher";

export default async function handler(req: any, res: any) {
  return await bridgeHandler(req, res, handleAdminAction);
}
