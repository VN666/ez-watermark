import babel from "rollup-plugin-babel";
import resolve from "rollup-plugin-node-resolve";
import json from "rollup-plugin-json";
import { terser } from "rollup-plugin-terser";

export default {
  input: "src/Watermark.js",
  output: [
    {
      file: "dist/esm/ezwatermark.min.js",
      name: "Watermark",
      format: "esm",
      sosourceMapuceMap: false
    },
    {
      file: "dist/umd/ezwatermark.min.js",
      name: "Watermark",
      format: "umd",
      sourceMap: false
    },
    {
      file: "dist/iife/ezwatermark.min.js",
      name: "Watermark",
      format: "iife"
    }
  ],
  plugins: [
    resolve({ browser: true }),
    babel({
      exclude: "node_modules/**"
    }),
    terser({
      compress: {
        drop_console: true
      },
      output: {
        comments: false
      }
		}),
    json()
  ]
};