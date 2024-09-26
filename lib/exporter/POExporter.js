"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseExporter_1 = __importDefault(require("./BaseExporter"));
class JSONExporter extends BaseExporter_1.default {
    extractValues(values) {
        const extractedValues = BaseExporter_1.default.keyPathExtractor(values, false);
        const asList = [];
        for (const key in extractedValues) {
            const value = extractedValues[key];
            asList.push({ key, value });
        }
        asList.sort((a, b) => a.key.localeCompare(b.key));
        return asList.reduce((acc, translation) => {
            acc += `msgid ${JSON.stringify(translation.key)}\n`;
            acc += `msgstr ${JSON.stringify(translation.value)}\n`;
            acc += "\n";
            return acc;
        }, "");
    }
    defaultFileName(locale) {
        return `${locale}/LC_MESSAGES/message.po`;
    }
}
exports.default = JSONExporter;
