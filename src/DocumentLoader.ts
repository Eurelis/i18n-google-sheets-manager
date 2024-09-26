import { GoogleSpreadsheet } from 'google-spreadsheet';
import { Configuration, Credentials } from './Configuration';
import { JWT } from 'google-auth-library'
import buildExporter from './exporter/Exporter';
import SheetProcessor from './SheetProcessor';
import fs from 'fs';
import path from 'path';

export default class DocumentLoader {
  doc: GoogleSpreadsheet;

  docLoading: Promise<void>;
  conf: Configuration;

  constructor(conf: Configuration) {
    
    this.conf = conf;

    let credentials = conf.credentials;

    if (typeof credentials === 'string') {
      const credentialsFile = fs.readFileSync(path.resolve(credentials));

      credentials = JSON.parse(credentialsFile.toString());
    }

    const { client_email, private_key } = credentials as Credentials;
    const jwt = new JWT({email: client_email, key: private_key, scopes: ['https://www.googleapis.com/auth/spreadsheets'] })

    this.doc = new GoogleSpreadsheet(conf.docID, jwt);

    this.docLoading = this.doc.loadInfo();
  }

  process(): Promise<void> {
    return this.docLoading.then(() => {
      const promises = this.conf.outputs.map((output) => {
        if (output.sheetIndex !== undefined) {
          const sheetProcessor = new SheetProcessor(
            this.doc.sheetsByIndex[output.sheetIndex]
          );

          sheetProcessor.process().then((i18nLocale) => {
            const exporter = buildExporter(output);
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
