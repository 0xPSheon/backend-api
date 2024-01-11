import "dotenv/config";
import axios from "axios";

import { API_KEY, WHITELIST } from "./constant";

const main = async () => {
  for (const [phase, listToAdd] of Object.entries(WHITELIST)) {
    for (const address of listToAdd) {
      await axios({
        method: "POST",
        url: `http://127.0.0.1:${process.env.PORT}/api/whitelist/add`,
        headers: {
          Authorization: `Bearer ${API_KEY}`,
        },
        data: {
          phase,
          address,
          description: "Provided by local add-whitelist script",
        },
      });

      console.log(`Whitelist #${phase} > ${address} added!`);
    }
  }
};
main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
