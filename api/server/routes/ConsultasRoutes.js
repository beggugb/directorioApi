import { Router } from "express";
import KeyToken from "./keyToken";
import ClienteController from "../controllers/ClienteController";

const router = Router();
/*router.get("/data/:page/:num/:categoria", ClienteController.consulta);
/*router.get("/listas/:page/:num/:letra", ClienteController.consultas);
router.post("/",ClienteController.marcar);
router.delete("/:id",ClienteController.desmarcar);
router.get("/:id", ClienteController.getIte);
router.get("/lista/servicios", ClienteController.getServicios);
router.get("/lista/emergencias", ClienteController.getEmergencias);
router.get("/lista/comidas", ClienteController.getComidas);
router.get("/lista/cajeros", ClienteController.getCajeros);

router.get("/lista/favoritos/:page/:num/:id", ClienteController.getFavoritos);
*/
export default router;