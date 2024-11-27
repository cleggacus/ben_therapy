import createClient from "openapi-fetch";

import type { paths } from "./strapi";

const client = createClient<paths>({
    baseUrl: `${process.env.STRAPI_URL}/api`,
    headers: {
        Accept: "application/json",
    },
});

export { client };
