import { I18nKey } from '../SheetProcessor';
import BaseExporter from './BaseExporter';
import xmlbuilder from 'xmlbuilder';

export default class AndroidXmlExporter extends BaseExporter {
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

    let xml = xmlbuilder.create('resources')

    asList.forEach((translation) => {
        xml.ele('string', {'name': translation.key}, translation.value)
    }, xml);

    return xml.end({pretty: true})
  }

  defaultFileName(locale: string): string {
    return `values-${locale}/strings.xml`;
  }
}
