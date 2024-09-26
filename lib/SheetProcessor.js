"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SheetProcessor {
    constructor(sheet) {
        this.keyRow = 0;
        this.rowCount = 0;
        this.sheet = sheet;
    }
    process() {
        return this.sheet.getRows().then(() => {
            const locales = [];
            const localesIndex = {};
            const i18n = {};
            const headerValues = this.sheet.headerValues;
            this.rowCount = this.sheet.rowCount;
            headerValues.forEach((headerValue, index) => {
                const trimmed = headerValue.trim().toLowerCase();
                if (!trimmed) {
                    return;
                }
                if (trimmed === 'key') {
                    this.keyRow = index;
                    return;
                }
                if (trimmed.charAt(0) === '#') {
                    return;
                }
                locales.push(trimmed);
                localesIndex[trimmed] = index;
            });
            locales.forEach((locale) => {
                i18n[locale] = {};
            });
            return this.sheet.loadCells().then(() => {
                let successiveNullKeys = 0;
                for (let rowIndex = 1; rowIndex < this.rowCount; rowIndex++) {
                    let rowKey = this.sheet.getCell(rowIndex, this.keyRow)
                        .value;
                    if (successiveNullKeys > 5) {
                        break;
                    }
                    if (!rowKey) {
                        successiveNullKeys++;
                        continue;
                    }
                    else {
                        successiveNullKeys = 0;
                    }
                    rowKey = rowKey.trim();
                    if (rowKey.charAt(0) === '#') {
                        continue;
                    }
                    locales.forEach((locale) => {
                        const localeIndex = localesIndex[locale];
                        const value = this.sheet.getCell(rowIndex, localeIndex).value || '';
                        i18n[locale][rowKey] = value === '#key#' ? rowKey : value;
                    });
                }
                return i18n;
            });
        });
    }
}
exports.default = SheetProcessor;
