import { I18nKey } from '../SheetProcessor';
import BaseExporter from './BaseExporter';

export default class JSONExporter extends BaseExporter {
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
        acc += `msgid ${JSON.stringify(translation.key)}\n`;
        acc += `msgstr ${JSON.stringify(translation.value)}\n`;
        acc += "\n";
        return acc
    }, "");
  }

  defaultFileName(locale: string): string {
    return `${locale}/LC_MESSAGES/message.po`;
  }
}
