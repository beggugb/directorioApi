import { Router } from "express";
import KeyToken from "./keyToken";
import ClienteController from "../controllers/ClienteController";

const router = Router();


/** Mobil */
router.get('/data/:page/:num/:prop/:orden', ClienteController.getData);
router.get('/datas/:page/:num/:prop/:orden', ClienteController.getDatas);
router.get('/:id', ClienteController.getItem);
router.post('/search/lista',ClienteController.getSearch);
router.put('/:tipo', ClienteController.setUpdate);
router.get('/detalle/item/:id', ClienteController.getDetalle);
router.get("/items/lista/:prop/:orden", ClienteController.getServicios);
/*router.get("/lista/emergencias", ClienteController.getEmergencias);
router.get("/lista/comidas", ClienteController.getComidas);
router.get("/lista/cajeros", ClienteController.getCajeros);*/

export default router;
