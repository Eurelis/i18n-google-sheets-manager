import { I18nKey } from '../SheetProcessor';
import BaseExporter from './BaseExporter';

export default class LocalizableStringsExporter extends BaseExporter {
  extractValues(values: I18nKey): string {
    const extractedValues = BaseExporter.keyPathExtractor(
      values,
      false
    );

    const asList = []
    for (const key in extractedValues) {
        const value = extractedValues[key]

        asList.push({key, value})
    }

    asList.sort((a, b) => a.key.localeCompare(b.key));

    return asList.reduce((acc, translation) => {
        acc += `${JSON.stringify(translation.key)} = ${JSON.stringify(translation.value)};\n`;
        return acc
    }, "");
  }

  defaultFileName(locale: string): string {
    return `${locale}.lproj/Localizable.strings`;
  }
}
