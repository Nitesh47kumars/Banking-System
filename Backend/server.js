import "dotenv/config";
import app from "./src/app.js";
import connectToDB from "./src/config/db.js";

connectToDB()
  .then(() => {
    app.listen(process.env.PORT || 3000, () => {
      console.log("Server is Running on PORT:", process.env.PORT);
    });

    app.on("error", (err) => {
      console.log("Server Internal Error");
      console.log("Message:", err);
    });
  })
  .catch((err) => {
    console.log("Server Connection Failed");
    console.log("Message:", err);
  });
