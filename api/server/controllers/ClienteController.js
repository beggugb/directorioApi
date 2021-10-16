import ClienteService from "../services/ClienteService";
import ModuloService from "../services/ModuloService";
import ProcesoService from "../services/ProcesoService";
import EmpresaService from "../services/EmpresaService";
import SucursalService from "../services/SucursalService";
import HorarioService from "../services/HorarioService"
import MailController from "./MailController";
import PaqueteService from "../services/PaqueteService"
import ContratoService from "../services/ContratoService"
import NotaService from "../services/NotaService"
import PlanService from "../services/PlanService"
import FavoritoService from "../services/FavoritoService"
import fFecha from "../utils/fFecha"

import jwt from "jsonwebtoken";
import moment from 'moment'

const bcrypt = require("bcrypt-nodejs");

import pdfInformacion from '../../public/documents/item'
const path = require('path');
const pdf = require('html-pdf');
const hostname = '192.168.0.100'
const port = 4000

var options = { 
    "format": "Letter", 
    "orientation":"portrait"    
   };


const createPdf = (item,sucursales) => {    
  let img = `http://${hostname}:${port}/api/static/images/clientes/md/`;  
   pdf.create(pdfInformacion(img,item,sucursales), options).toFile(`${process.cwd()}/api/public/documents/InformacionDetalle${item.id}.pdf`, (err) => {
     if(err) { res.send(Promise.reject());}
         return 0	 
  }   
)      
} 

class ClienteController {

  static getServicios(req, res) {    
    let iok = req.params.prop
    Promise.all([ClienteService.getMapas(iok),SucursalService.getMapas(iok)])
      .then(([clientes, sucursales]) => {
        const data = refactorizar(clientes, sucursales)
        res.status(200).send({ message: "lista", result: data });
      })
      .catch((reason) => {
        res.status(400).send({ message: reason });
      });
  }

  static getDetalle(req, res) {        
    if (req.params.id) {
      ClienteService.item(req.params.id)
        .then((cliente) => {                              		              
            SucursalService.getAlls(cliente.id)
              .then((sucursales) => {    
                Promise.all([createPdf(cliente,sucursales)])          
                .then(([pdf]) => {                            
                  res.status(200).send({ message: "cliente", cliente:  cliente, sucursales: sucursales });
                })
                .catch((reason) => {
                  console.log(reason)
                  res.status(400).send({ message: reason });
                });
            })    
        })
        .catch((reason) => {
          res.status(400).send({ message: reason });
        });
    } else {
      res.status(400).send({ message: "datos faltantes" });
    }
  }


  static login(req, res) {
    const { username, password } = req.body;
    Promise.all([ClienteService.login(username, password)]).then(
      ([cliente]) => {
        if (cliente.user) {
          Promise.all([
            ModuloService.getRol(cliente.user.rolId),
            ProcesoService.add("Ingreso al sistema", cliente.user.id),
          ]).then(([modulos]) => {
            res.status(200).json({ cliente, modulos });
          });
        } else {
          res.status(400).send({ success: false, message: cliente.message });
        }
      }
    );
  }

  static getItems(req, res) {           
    ClienteService.data(req.params.page,req.params.num,req.params.prop)
      .then((clientes) => {                 
          res.status(200).send({ message: "lista", result: clientes });
      })
      .catch((reason) => {		
          res.status(400).send({ message: reason });
      });
  }

  static getData(req, res) {           
    ClienteService.data(req.params.page,req.params.num,req.params.prop)
      .then((clientes) => {                 
          res.status(200).send({ message: "lista", result: clientes });
      })
      .catch((reason) => {		
          res.status(400).send({ message: reason });
      });
  }

  static getDatas(req, res) {           
    ClienteService.datas(req.params.page,req.params.num,req.params.prop)
      .then((clientes) => {                 
          res.status(200).send({ message: "lista", result: clientes });
      })
      .catch((reason) => {		
          res.status(400).send({ message: reason });
      });
  }

  static getItem(req, res) {        
    if (req.params.id) {
      ClienteService.item(req.params.id)
        .then((cliente) => {                              		              
            SucursalService.getAlls(cliente.id)
              .then((sucursales) => {                                
                 res.status(200).send({ message: "cliente", cliente:  cliente, sucursales: sucursales });
                })
        })
        .catch((reason) => {
          res.status(400).send({ message: reason });
        });
    } else {
      res.status(400).send({ message: "datos faltantes" });
    }
  }  
  
  static getSearch(req, res) {    
    const { nombres } = req.body            
    ClienteService.search(1, 12, nombres)
      .then((clientes) => {            
        res.status(200).send({ message: "lista", result: clientes });
      })
      .catch((reason) => {
        res.status(400).send({ message: reason });
      });
  }

  static setUpdate(req, res) {       
    if(req.params.tipo === 'lista')
    {
      ClienteService.update(req.body,req.params.id)
        .then((row) => {
           ClienteService.data(1,12,'nombres','ASC',0)
             .then((rows) => {               
                res.status(200).send({result: rows, message: 'Cliente actualizado' });                        
             })
        })                        
        .catch((reason) => {              
          res.status(400).send({ message: reason.parent.detail });
        });
    } else{
      ClienteService.update(req.body,req.params.id)
        .then((row) => {                      
            ClienteService.item(req.params.id)
                .then((row) => {                      
                  res.status(200).send({result: row, message: 'Cliente actualizado' });                        
            })                     
        })                   
        .catch((reason) => {              
          res.status(400).send({ message: reason.parent.detail });
        });
    }  
  }

    }
      function refactorizar(data1, data2){
        const newData = []
        data1.map((item)=>{
          let tem = {}
          tem.key = item.id,
          tem.title = item.nombres,
          tem.description = item.descripcion,
          tem.tipo = item.tipo,    
			tem.filename = item.filename,
          tem.icon = item.icon,
          tem.telefono = item.telefono,
          tem.celular = item.celular,
          tem.longitude = parseFloat(item.longitude),
          tem.latitude = parseFloat(item.latitude)
          newData.push(tem)
        })
        data2.map((item)=>{
          let tem = {}
          tem.key = item.id,
          tem.title = item.nombre,    
          tem.tipo = item.tipo,    
          tem.icon = item.icon,
	  tem.filename = item.filename,		
          tem.description = "",
          tem.telefono = item.telefono,
          tem.celular = item.celular,
          tem.longitude = parseFloat(item.longitude),
          tem.latitude = parseFloat(item.latitude)
          newData.push(tem)
        })
        return newData
      
      }
    function unir(data1, data2){
        const newData = []        
        data1.map((item) =>{
          let tem = {}
          tem.id = item.id
          tem.nombres = item.nombres
          tem.filename = item.filename
          tem.direccion = item.direccion
          tem.descripcion = item.descripcion		
          tem.paqueteId  = item.paqueteId
          tem.celular = item.celular
          tem.hinicio = item.Horarios.hinicio
          tem.hfin = item.Horarios.hfin
	  tem.views = item.views
	  tem.likes = item.likes	
          data2.map((ite) =>{
          /* console.log(ite.clienteId)
           console.log(item.id)		  */
            if(item.id === ite.clienteId)
            {
             		    
              tem.selectable = true
	      tem.fid = ite.id	    
            }else{
             /* tem.selectable = false*/
            }            
            /*newData.push(tem)		  */
          })
          newData.push(tem)
        })   
        return newData      
      }
      


export default ClienteController;
