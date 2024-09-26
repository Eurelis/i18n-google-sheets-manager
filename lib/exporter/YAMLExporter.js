"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseExporter_1 = __importDefault(require("./BaseExporter"));
const js_yaml_1 = __importDefault(require("js-yaml"));
class YAMLExporter extends BaseExporter_1.default {
    extractValues(values) {
        const extractedValues = BaseExporter_1.default.keyPathExtractor(values, this.output.keyPathSeparator || '.');
        return js_yaml_1.default.dump(extractedValues);
    }
    defaultFileName(locale) {
        return `${locale}.yml`;
    }
}
exports.default = YAMLExporter;
