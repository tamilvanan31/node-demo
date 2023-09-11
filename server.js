const express = require("express");
const path = require("path");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const { logger } = require("./middleware/logEvents");
const errorHandler = require("./middleware/errorHandler");

const app = express();
const PORT = process.env.PORT || 3500;

/**
 * There are three types of middleware
 * 1. Built-in
 * 2. Custom
 * 3. Third party
 */

/**
 * custom middleware logger
 */
app.use(logger);

/**
 * cors, Cross Origin Resource Sharing
 */

app.use(cors(corsOptions));

/**
 * use() is applied for all routes
 * form-data:
 *  "content-type": application/x-www-form-urlencoded
 */

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/", require("./routes/root"));
app.use("/employees", require("./routes/api/employees"));

/**
 * For json
 */

/**
 * For static things like css, images, json etc.,
 */
app.use("/", express.static(path.join(__dirname, "public")));

app.all("*", (req, res) => {
  /**
   * This will not send 404 statuscode by default, so we can chain in the status code
   */
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ error: "404 page not found" });
  } else {
    res.type("text").send("404 not found");
  }
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});
