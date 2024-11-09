import { Router } from "express";
const router = Router();
import { AdminController } from "../controllers";


const adminController = new AdminController();


router.get("/admin/users", (req, res) => {
    adminController.getAllUsers(req, res);
});

// router.post("/admin/addservice",upload,(req, res) => {
   
//     serviceController.addService(req, res);

// });
// router.get("/admin/services",(req, res) => {
//    serviceController.getAllServices(req, res);
// });

// router.put("/admin/editservices/:id",upload, (req, res) => {
//     serviceController.editService(req, res);
// });
 
 
// router.delete("/admin/deleteservices/:id", (req, res) => {
//    serviceController.deleteService(req, res);
//  });
 

 


export default router;