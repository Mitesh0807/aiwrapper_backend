import mongoose from "mongoose";
import apiModel from "../schemas/api.schema";
import User from "../schemas/users.schema";
import { Request, Response } from "express";

const modelsList = async (req: Request, res: Response) => {
  try {
    const modelTypes = [
      "gemini-pro",
      "gemini-pro-vision",
      "bison-text",
      "bison-chat",
      "embedding",
      "AQA",
    ];
    const response = await res.send({ modelList: modelTypes });
  } catch (error) {
    res.send({ error: "error in getting models list" });
  }
  return;
};

const createUser = async (req: Request, res: Response) => {
  try {
    const { apiKey, apiName } = req.body;
    const response = await User.create({ name: "semil" });

    const apiKeyAdd = await apiModel.create({
      apiKey: apiKey,
      apiName: apiName,
    });
    const id = mongoose.isValidObjectId(response._id) ? response._id : false;
    if (!id) {
      res.status(400).send("ID not valid");
      return;
    }
    const addingKey = await User.findByIdAndUpdate(
      id,
      {
        apiId: [apiKeyAdd._id],
      },
      {
        new: true,
      }
    ).populate("apiId");
    res.status(200).json(addingKey);
    return;
  } catch (error) {
    console.log(error);
    res.send({ response: "Error in sending data " });
  }
  return;
};

const addApiId = async (req: any, res: any) => {
  try {
    const { id, apiKey, apiName } = req.body;

    if (!id) {
      res.send("ewa");
      return;
    }

    const isvalidid = mongoose.isValidObjectId(id);

    if (!isvalidid) {
      res.send("Not a valid id");
    }

    const findUser = await User.findById(id);

    if (findUser) {
      const addData = await apiModel.create({ apiKey, apiName });
      const apiIds = findUser.apiId;
      const upatedIds = [...apiIds, addData._id];

      const updateUserData = await User.findByIdAndUpdate(
        id,
        {
          apiId: upatedIds,
        },
        { new: true }
      ).populate("apiId");
      res.send(updateUserData);
      return;
    }
    res.send(id);
  } catch (error) {
    console.log(error);
  }
  return;
};

const deleteApiID = async (req: any, res: any) => {
  const { id, userId } = req.body;
  console.log("delete id ", id);
  console.log("userId ", userId);

  const deletedaPI = await apiModel.findOneAndDelete(id);

  const updatedUser = await User.findById(userId);
  if (!updatedUser) {
    res.status(400).send("no user registered ");
    return;
  }
  const apiIds = updatedUser.apiId;
  const updtedApiIds = apiIds.filter((a) => a.toString() !== id);
  const update = await User.findByIdAndUpdate(
    userId,
    {
      apiId: updtedApiIds.map((a) => new mongoose.Types.ObjectId(a)),
    },
    {
      new: true,
    }
  );
  res.status(200).send(update);
  return;
};

const deleteAllApi = async (req: any, res: any) => {
  const { userId } = req.body;

  try {
    const updatedUser = await User.findById(userId);

    if (!updatedUser) {
      return res.status(400).send("No user found");
    }

    const apiIds = updatedUser.apiId;

    const deleteResult = await apiModel.deleteMany({ _id: { $in: apiIds } });

    if (deleteResult.deletedCount === 0) {
      return res.status(400).send("No records were deleted");
    }

    const newUserData = await User.findByIdAndUpdate(
      userId,
      {
        apiId: [],
      },
      {
        new: true,
      }
    );

    // updatedUser.apiId = [];

    // const updatedUserResult = await updatedUser.save();

    res.status(200).send(newUserData);
    return;
  } catch (error) {
    console.error("Error occurred:", error);
    res.status(500).send("Internal Server Error");
  }
};

const getAllApi = async (req: Request, res: Response) => {
  const { userId } = req.body;

  try {
    const searchUser = await User.findById(userId);
    if (!searchUser) {
      res.send("No user found");
    }
    console.log(searchUser);
    res.send(searchUser);
  } catch (error) {
    res.status(400).send("Internal Server Error");
  }
  return;
};

export default {
  modelsList,
  createUser,
  addApiId,
  deleteApiID,
  deleteAllApi,
  getAllApi,
};
