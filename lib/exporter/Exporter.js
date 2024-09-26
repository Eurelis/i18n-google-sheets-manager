"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = buildExporter;
const JSONExporter_1 = __importDefault(require("./JSONExporter"));
const YAMLExporter_1 = __importDefault(require("./YAMLExporter"));
const POExporter_1 = __importDefault(require("./POExporter"));
const LocalizableStringsExporter_1 = __importDefault(require("./LocalizableStringsExporter"));
const AndroidXmlExporter_1 = __importDefault(require("./AndroidXmlExporter"));
const METHODS = {
    json: JSONExporter_1.default,
    yaml: YAMLExporter_1.default,
    po: POExporter_1.default,
    strings: LocalizableStringsExporter_1.default,
    android: AndroidXmlExporter_1.default
};
function buildExporter(output) {
    const lowerCasedMethod = output.method.toLowerCase();
    const ExporterClass = METHODS[lowerCasedMethod];
    if (ExporterClass) {
        return new ExporterClass(output);
    }
    throw new Error('unsupported output method ' + output);
}
