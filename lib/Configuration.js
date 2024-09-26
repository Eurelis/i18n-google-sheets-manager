"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadConfiguration = loadConfiguration;
const fs_1 = __importDefault(require("fs"));
function loadConfiguration(path) {
    const jsonContent = fs_1.default.readFileSync(path, { encoding: 'utf-8' });
    const configuration = JSON.parse(jsonContent);
    if (configuration) {
        return configuration;
    }
    return undefined;
}
