import { Output } from '../Configuration';
import BaseExporter from './BaseExporter';
import JSONExporter from './JSONExporter';
import YAMLExporter from './YAMLExporter';
import POExporter from './POExporter';
import LocalizableStrings from './LocalizableStringsExporter';
import AndroidXmlExporter from './AndroidXmlExporter'

type MethodsMap = {
  [key: string]: new (...args: any[]) => BaseExporter;
};

const METHODS = {
  json: JSONExporter,
  yaml: YAMLExporter,
  po: POExporter,
  strings: LocalizableStrings,
  android: AndroidXmlExporter
} as unknown as MethodsMap;

export default function buildExporter(output: Output): BaseExporter {
  const lowerCasedMethod = output.method.toLowerCase();

  const ExporterClass = METHODS[lowerCasedMethod];
  if (ExporterClass) {
    return new ExporterClass(output);
  }

  throw new Error('unsupported output method ' + output);
}
