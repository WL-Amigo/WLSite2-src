import { defineConfig } from "astro/config";
import solidJs from "@astrojs/solid-js";
import tailwind from "@astrojs/tailwind";
import Icons from "unplugin-icons/vite";
import Yaml from "@modyfi/vite-plugin-yaml";

// https://astro.build/config
export default defineConfig({
  site: "https://white-luck-bringers.netlify.app",
  integrations: [
    solidJs(),
    tailwind({
      applyBaseStyles: false,
    }),
  ],
  vite: {
    plugins: [Icons({ compiler: "solid", defaultClass: "h-6 w-6" }), Yaml()],
  },
});
