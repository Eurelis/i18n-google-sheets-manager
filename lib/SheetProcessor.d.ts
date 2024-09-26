import { GoogleSpreadsheetWorksheet } from 'google-spreadsheet';
export type I18nKey = {
    [key: string]: string;
};
export type I18nMap = {
    [key: string]: I18nKey;
};
export default class SheetProcessor {
    sheet: GoogleSpreadsheetWorksheet;
    keyRow: number;
    rowCount: number;
    constructor(sheet: GoogleSpreadsheetWorksheet);
    process(): Promise<I18nMap>;
}
