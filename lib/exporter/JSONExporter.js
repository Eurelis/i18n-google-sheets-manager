"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseExporter_1 = __importDefault(require("./BaseExporter"));
class JSONExporter extends BaseExporter_1.default {
    extractValues(values) {
        const extractedValues = BaseExporter_1.default.keyPathExtractor(values, this.output.keyPathSeparator || '.');
        return JSON.stringify(extractedValues, null, 2);
    }
    defaultFileName(locale) {
        return `${locale}.json`;
    }
}
exports.default = JSONExporter;
