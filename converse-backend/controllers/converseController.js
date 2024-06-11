"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAudioStreamFromText = void 0;
const audioStream = require("../models/audioModel");
// converseController.ts
const elevenlabs_1 = require("elevenlabs");
const dotenv = __importStar(require("dotenv"));
dotenv.config({ path: "./cred.env" });
const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY;
if (!ELEVENLABS_API_KEY) {
    throw new Error("Missing ELEVENLABS_API_KEY in environment variables");
}
const client = new elevenlabs_1.ElevenLabsClient({
    apiKey: ELEVENLABS_API_KEY,
});
const createAudioStreamFromText = (text) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, e_1, _b, _c;
    const audioStream = yield client.generate({
        voice: "Rachel",
        model_id: "eleven_turbo_v2",
        text,
    });
    const chunks = [];
    try {
        for (var _d = true, audioStream_1 = __asyncValues(audioStream), audioStream_1_1; audioStream_1_1 = yield audioStream_1.next(), _a = audioStream_1_1.done, !_a; _d = true) {
            _c = audioStream_1_1.value;
            _d = false;
            const chunk = _c;
            chunks.push(chunk);
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (!_d && !_a && (_b = audioStream_1.return)) yield _b.call(audioStream_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    const content = Buffer.concat(chunks);
    return content;
});
exports.createAudioStreamFromText = createAudioStreamFromText;
