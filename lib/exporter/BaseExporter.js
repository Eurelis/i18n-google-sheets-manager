"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const promises_1 = __importDefault(require("fs/promises"));
const path_1 = __importDefault(require("path"));
const mustache_1 = __importDefault(require("mustache"));
class BaseExporter {
    constructor(output) {
        this.output = output;
    }
    static keyPathExtractor(map, separator) {
        if (separator === false) {
            return map;
        }
        const extractedMap = {};
        Object.keys(map).forEach((key) => {
            const splittedKeys = key.split(separator);
            const finalPath = splittedKeys.pop();
            if (!finalPath) {
                return;
            }
            const wrapperObject = splittedKeys.reduce((acc, subKey) => {
                let subObject = acc[subKey];
                if (!subObject) {
                    subObject = {};
                    acc[subKey] = subObject;
                }
                return subObject;
            }, extractedMap);
            wrapperObject[finalPath] = map[key];
        });
        return extractedMap;
    }
    process(map) {
        return promises_1.default
            .mkdir(path_1.default.resolve(this.output.outputDir), { recursive: true })
            .then(() => {
            const promises = Object.keys(map).map((locale) => {
                return this.processLocale(locale, map[locale]);
            });
            return Promise.all(promises).then(() => {
                // nothing to do
            });
        });
    }
    extractValues(_values) {
        throw new Error('unimplemented method extractValues');
    }
    defaultFileName(_locale) {
        throw new Error('unimplemented method extractValues');
    }
    processLocale(locale, values) {
        const fileName = this.output.fileName
            ? mustache_1.default.render(this.output.fileName, { locale })
            : this.defaultFileName(locale);
        const outputPath = path_1.default.resolve(this.output.outputDir, fileName);
        return promises_1.default
            .mkdir(path_1.default.dirname(outputPath), { recursive: true })
            .then(() => {
            return promises_1.default.writeFile(outputPath, this.extractValues(values));
        });
    }
}
exports.default = BaseExporter;
