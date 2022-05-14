var express = require("express");
var router = express.Router();
const { StatusCodes } = require("http-status-codes");
const models = require("../models");

/* Get categories listing. */
router.get("/all", async function (req, res, next) {
  try {
    const categories = await models.Category.findAll();

    res.status(StatusCodes.OK).json({
      data: categories,
    });
  } catch (error) {
    next(error);
  }
});

/* Add a new category. */
router.post("/", async (req, res, next) => {
  const { user_id, name } = req.body;

  try {
    const data = await models.Category.findOne({ where: { user_id, name } });

    if (data) {
      // category already exists
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: "Category with this name already exists" });
    } else {
      // adds a new category

      try {
        const data = await models.Category.create(req.body);
        res
          .status(StatusCodes.ACCEPTED)
          .json({ success: "Category created successfully.", data });
      } catch (err) {
        next(err);
      }
    }
  } catch (err) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Something went wrong.", err });
  }
});

/* Update a category */
router.put("/:category_id", async (req, res, next) => {
  const { category_id } = req.params;

  const { user_id, name } = req.body;

  try {
    const data = await models.Category.findOne({ where: { id: category_id } });

    if (!data) {
      // category doesn't exists
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: "Category doesn't exist" });
    } else {
      // updates category

      try {
        const data = await models.Category.update(req.body, {
          where: { id: category_id, user_id },
        });
        res
          .status(StatusCodes.ACCEPTED)
          .json({ success: "Category updated successfully.", data });
      } catch (err) {
        next(err);
      }
    }
  } catch (err) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Something went wrong.", err });
  }
});

/* Delete a category */
router.delete("/:category_id", async (req, res, next) => {
  const { category_id } = req.params;

  try {
    // check if category exists
    const data = await models.Category.findOne({ where: { id: category_id } });

    if (!data) {
      // if category doesn't exist
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: "Category doesn't exists" });
    } else {
      // it exists, delete category
      try {
        const data = await models.Category.destroy({
          where: { id: category_id },
        });
        res
          .status(StatusCodes.ACCEPTED)
          .json({ success: "Category deleted successfully.", data });
      } catch (err) {
        res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .json({ error: "Something went wrong.", err });
      }
    }
  } catch (err) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Something went wrong.", err });
  }
});

module.exports = router;
