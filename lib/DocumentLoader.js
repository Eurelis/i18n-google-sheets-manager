"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const google_spreadsheet_1 = require("google-spreadsheet");
const google_auth_library_1 = require("google-auth-library");
const Exporter_1 = __importDefault(require("./exporter/Exporter"));
const SheetProcessor_1 = __importDefault(require("./SheetProcessor"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
class DocumentLoader {
    constructor(conf) {
        this.conf = conf;
        let credentials = conf.credentials;
        if (typeof credentials === 'string') {
            const credentialsFile = fs_1.default.readFileSync(path_1.default.resolve(credentials));
            credentials = JSON.parse(credentialsFile.toString());
        }
        const { client_email, private_key } = credentials;
        const jwt = new google_auth_library_1.JWT({ email: client_email, key: private_key, scopes: ['https://www.googleapis.com/auth/spreadsheets'] });
        this.doc = new google_spreadsheet_1.GoogleSpreadsheet(conf.docID, jwt);
        this.docLoading = this.doc.loadInfo();
    }
    process() {
        return this.docLoading.then(() => {
            const promises = this.conf.outputs.map((output) => {
                if (output.sheetIndex !== undefined) {
                    const sheetProcessor = new SheetProcessor_1.default(this.doc.sheetsByIndex[output.sheetIndex]);
                    sheetProcessor.process().then((i18nLocale) => {
                        const exporter = (0, Exporter_1.default)(output);
                        return exporter.process(i18nLocale);
                    });
                }
            });
            return Promise.all(promises).then(() => {
                // nothing to do
            });
        });
    }
}
exports.default = DocumentLoader;
