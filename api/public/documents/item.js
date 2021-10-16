module.exports = (img,item,items) => {
   const today = new Date();   
   
   var sucursales = "<table class='tables-clausulas'>";
   for(var i in items){      
      sucursales += "<tr>";       
      sucursales += "<td width='40%' class='cobe'>"+items[i].nombre+"</td>";      
      sucursales += "<td width='40%' class='cobe'>"+items[i].direccion+"</td>";
      sucursales += "<td width='20%' class='cobe'>"+items[i].telefono+"</td>";
      sucursales += "</tr>";
   }
   sucursales += "</table>";

   return `<html>
     <head>
       <meta charset="utf8">
       <title>Información Empresa</title>
       <style>
         html, body {
           margin: 0;
           padding: 0;
           font-family: 'Sackers Gothic Std';
           font-weight: 500;
            font-size: 11px;
           background: rgb(241,241,241);
           -webkit-print-color-adjust: exact;
           box-sizing: border-box;
         }
   
         .page {
           position: relative;
           height: 100%;
           width: 100%;
           display: block;
           background: white;
           page-break-after: auto;        
           overflow: hidden;
         }
   
         @media print {
           body {
             background: white;
           }
   
           .page {
             margin: 0;
             height: 100%;
             width: 100%;
           }
         }
   
         .contenedor {        
           height: 98%;
           padding: 3px;
         }
   
       
         .cliente {
           border: 1px solid #c1c1c1;
           border-radius: 5px;
           height: 6%;
           padding: 5px;
           width: 98%;
           text-align: center;

         }
         .cotizacion {
           border: 1px solid #c1c1c1;
           border-radius: 5px;
           height: 10%;
           padding: 5px;
         }

         .imagenes {
            border: 1px solid #c1c1c1;
            border-radius: 3px;
            height: 73px;
            width: 15%;
            padding: 2px;
            float:left;
          }

          .detalles {
            border: 1px solid #c1c1c1;
            border-radius: 3px;
            height: 73px;
            width: 81%;
            padding: 2px;
            float:left;
          }
   
   
         .tasas {
           border: 1px solid #c1c1c1;
           border-radius: 5px;
           height: 8%;
           padding: 5px;
           background-color: #ebb18b;
         }
   
         .detalle {
           border: 1px solid #c1c1c1;
           border-radius: 5px;
           height: 72%;
           padding: 5px;
         }
   
         .datos {        
           border-radius: 5px;
           height: 100%;        
           width: 20%;
           float: left;
         }
         .companias {        
           height: 100%;        
           width: 80%;
           float: left;
           padding-left: 3px;              
         }
         .tables-companias {        
           width: 100%;        
           height: 72%;
           border-spacing: 0;
           font-size: 11px;
           margin: 0 !important;
         }
   
         .tables-companias td{
           border: 1px solid #c1c1c1;                 
         }
         .tables-companias-titulos{        
           width: 100%;        
           height: 25%;
           border-spacing: 0;
            font-size: 11px;
         }
         .tables-companias-titulos td{
           border: 1px solid #c1c1c1;                     
           
         }
   
   
         .items {
           border: 1px solid #c1c1c1;  
           height: 100%;        
           width: 100%;
           float: left;
         }
         
   
         .coberturas{          
           background-color: #1b88e4;                
           text-align: center;
           padding: 1px;
           color: #fff;
           font-weight: 600;
         }
         .clausulas{             
           background-color:  #eaeaea;      
           text-align: left;
           padding: 1px;
           color: #4d4d4d;
           
         }
         .tables-clausulas {        
           width: 100%;                 
           border-spacing: 0;           
           background-color: #fff;
         }
   
         .tables-clausulas td{
           border: 1px solid #c1c1c1;    
           text-align: center;               
           
         }
      
         .cobe{
           text-align: left !important; 
           padding-left: 2px;
           font-size: 8px;
         }
         .cob{
           font-size: 9px;
           text-align: center  !important; 
         }
         .cof{
           height: 60px;
           font-size: 9px;
           text-align: center !important;         
         }
         .com{
           height: 20px;
           font-size: 9px;
           text-align: center !important; 
         }
   
         .table-datos{                
           width: 99%;
           border-spacing: 0;
         }
         
   
         .table-datos td{                
           font-size: 8px; 
           border: 1px solid #eaeaea;       
         } 
         h5, h3{
             margin:0;
         }       
       </style>
     </head>
     <body>
       <div class="page">
         <div class="contenedor">        
           <div class="cliente">                   
             <h3><b>${item.nombres}</b></h3>             
             <h5>${item.Categorium.nombre}</h5>             
           </div>
           <div class="cotizacion">
                <div class="imagenes">                                     
                  <img src="${img+item.filename}" border="0" alt="logo" width="88" height="70">
                </div>
                <div class="detalles">                   
                    <table class="table-datos">                        
                        <tr><td width="20%"><b>Dirección :</b></td><td width="80%">${item.direccion}</td></tr>
                        <tr><td width="20%"><b>Teléfono :</b></td><td width="80%">${item.telefono}-${item.celular}</td></tr>
                        <tr><td width="20%"><b>Email :</b></td><td width="80%">${item.email}</td></tr>
                        <tr><td width="20%"><b>Web :</b></td><td width="80%">${item.web}</td></tr>
                        <tr><td width="20%"><b>Descripción :</b></td><td width="80%">${item.descripcion}</td></tr>
                    </table>
                </div>                
           </div>
     
           <div class="detalle">
             <div class="items">
               <div class="clausulas"><h5><b>Sucursales</b><h5></div>
                 ${sucursales}
               </div>          
           </div>       
         </div>  
       </div>    
     </body>
   </html>	`;
   };
   