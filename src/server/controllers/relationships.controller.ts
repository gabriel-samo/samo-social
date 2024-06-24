import { Query } from "./../db/pool";
import { type Request, type Response } from "express";

export const getRelationship = async (req: Request, res: Response) => {
  try {
    const getRelationshipsQuery = `SELECT followerUserId FROM relationships WHERE followedUserId = ?;`;
    const result = await Query(getRelationshipsQuery, [
      req.query.followedUserId
    ]);
    return res.status(200).json(result.map((item: any) => item.followerUserId));
  } catch (error: any) {
    return res
      .status(500)
      .json({ msg: `Something went wrong!,\n${error.message}` });
  }
};

export const addRelationship = async (req: Request, res: Response) => {
  try {
    const { userInfo } = req;
    const checkRelationshipQuery =
      "SELECT id FROM relationships WHERE followerUserId = ? AND followedUserId = ?";
    const foundRelationship = await Query(checkRelationshipQuery, [
      userInfo.id,
      req.body.userId
    ]);
    if (foundRelationship.length > 0) {
      const deleteRelationshipQuery = "DELETE FROM relationships WHERE id = ?";
      await Query(deleteRelationshipQuery, [foundRelationship[0].id]);
      return res.status(200).json({ msg: "The relationship was deleted" });
    } else {
      const addRelationshipQuery = "INSERT INTO relationships SET ?;";
      const values = {
        followerUserId: userInfo.id,
        followedUserId: req.body.userId
      };
      const result = await Query(addRelationshipQuery, values);
      const getAddedRelationshipQuery = `SELECT followerUserId, followedUserId FROM relationships WHERE id = ?;`;
      const addedRelationship = await Query(getAddedRelationshipQuery, [
        result.insertId
      ]);
      return res.status(200).json({
        msg: "Relationship has been added!",
        addedRelationship: addedRelationship[0]
      });
    }
  } catch (error: any) {
    // console.log(error);
    return res
      .status(500)
      .json({ msg: `Something went wrong!,\n${error.message}` });
  }
};
