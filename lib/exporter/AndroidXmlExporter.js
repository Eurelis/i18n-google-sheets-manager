"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseExporter_1 = __importDefault(require("./BaseExporter"));
const xmlbuilder_1 = __importDefault(require("xmlbuilder"));
class AndroidXmlExporter extends BaseExporter_1.default {
    extractValues(values) {
        const extractedValues = BaseExporter_1.default.keyPathExtractor(values, false);
        const asList = [];
        for (const key in extractedValues) {
            const value = extractedValues[key];
            asList.push({ key, value });
        }
        asList.sort((a, b) => a.key.localeCompare(b.key));
        let xml = xmlbuilder_1.default.create('resources');
        asList.forEach((translation) => {
            xml.ele('string', { 'name': translation.key }, translation.value);
        }, xml);
        return xml.end({ pretty: true });
    }
    defaultFileName(locale) {
        return `values-${locale}/strings.xml`;
    }
}
exports.default = AndroidXmlExporter;
