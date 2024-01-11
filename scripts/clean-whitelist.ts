import "dotenv/config";
import axios from "axios";

import { API_KEY } from "./constant";

const main = async () => {
  await axios({
    method: "POST",
    url: `http://127.0.0.1:${process.env.PORT}/api/whitelist/clean`,
    headers: {
      Authorization: `Bearer ${API_KEY}`,
    },
  }).then(() => {
    console.log("Whitelist cleaned!");
  });
};
main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
