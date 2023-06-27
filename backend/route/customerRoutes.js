import express from "express";
import {
  createCustomer,
  deleteCustomer,
  getAllCustomers,
  getCustomerById,
  getCustomerExcel,
  updateCustomer,
} from "../controller/customerController.js";

const router = express.Router();

router.route("/").post(createCustomer).get(getAllCustomers);
router
  .route("/:id")
  .get(getCustomerById)
  .put(updateCustomer)
  .delete(deleteCustomer);
router.route("/excel/getCustomerExcel").get(getCustomerExcel);
export default router;
