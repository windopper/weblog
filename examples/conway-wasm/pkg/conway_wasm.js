import * as wasm from "./conway_wasm_bg.wasm";
export * from "./conway_wasm_bg.js";
import { __wbg_set_wasm } from "./conway_wasm_bg.js";
__wbg_set_wasm(wasm);
wasm.__wbindgen_start();
