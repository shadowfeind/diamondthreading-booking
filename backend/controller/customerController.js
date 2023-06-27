import asyncHandler from "express-async-handler";
import Customer from "../model/customerModel.js";
import Queue from "../model/queueModel.js";
import xlsx from "xlsx";

export const createCustomer = asyncHandler(async (req, res) => {
  const { fullName, email, phone } = req.body;

  if (!fullName || !email || !phone) {
    res.status(400);
    throw new Error("All fields are required");
  }
  const customerExists = await Customer.findOne({ phone }).lean().exec();
  if (customerExists) {
    res.status(400);
    throw new Error("You have already registered");
  }

  const customer = await Customer.create({
    fullName,
    email,
    phone,
  });
  if (customer) {
    const queue = await Queue.create({
      fullName: customer.fullName,
      customerId: customer._id,
    });
    if (queue) {
      res.status(201);
      res.json({
        _id: customer._id,
        fullName,
        email,
        phone,
      });
    } else {
      res.status(401);
      throw new Error("Cannot create queue");
    }
  } else {
    res.status(401);
    throw new Error("Cannot create customer");
  }
});

export const getAllCustomers = asyncHandler(async (req, res) => {
  // const users = await User.find({}).sort({ createdAt: -1 });
  const customer = await Customer.find({}).sort({ createdAt: -1 }).lean();

  // If no customer
  if (!customer?.length) {
    return res.status(400).json({ message: "No customer found" });
  }

  res.json(customer);
});

export const getCustomerById = asyncHandler(async (req, res) => {
  const customer = await Customer.findById(req.params.id);
  if (customer) {
    res.json(customer);
  } else {
    res.status(404);
    throw new Error("Customer not found");
  }
});

export const updateCustomer = asyncHandler(async (req, res) => {
  const customer = await Customer.findById(req.params.id);

  if (customer) {
    customer.name = req.body.fullName || customer.fullName;
    customer.role = req.body.email || customer.email;
    customer.role = req.body.phone || customer.phone;

    const updatedCustomer = await customer.save();
    res.json({
      _id: updatedCustomer._id,
      name: updatedCustomer.name,
      role: updatedCustomer.role,
    });
  } else {
    res.status(401);
    throw new Error("Customer not found");
  }
});

export const deleteCustomer = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // Does the Customer exist to delete?
  const customer = await Customer.findById(id).exec();

  if (!customer) {
    res.status(400);
    throw new Error("Customer not found");
  }

  const result = await customer.deleteOne();

  const reply = `Customer ${result.fullName}  deleted`;

  res.json(reply);
});

export const getCustomerExcel = asyncHandler(async (req, res) => {
  const report = await Customer.find({});

  if (report.length > 0) {
    const transformedData = report.map((item) => ({
      fullName: item?.fullName,
      email: item?.email,
      phone: item?.phone,
    }));

    const worksheet = xlsx.utils.json_to_sheet(transformedData);
    const workbook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(workbook, worksheet, "Report");

    const excelBuffer = xlsx.write(workbook, {
      bookType: "xlsx",
      type: "buffer",
    });

    res.status(200).send(excelBuffer);
  } else {
    throw new Error(`No Customer in database`);
  }
});
