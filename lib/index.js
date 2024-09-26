#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const commander_1 = require("commander");
const Configuration_1 = require("./Configuration");
const DocumentLoader_1 = __importDefault(require("./DocumentLoader"));
const program = new commander_1.Command();
program
    .version('1.0.0', '-v, --version', 'Output the current version')
    .description('A CLI to manage localization based on google sheets');
program.addOption(new commander_1.Option('-c, --config <config>', 'Configuration file path')
    .default('i18n-gs.json')
    .makeOptionMandatory(true));
program.parse();
const options = program.opts();
const { config } = options;
const configuration = (0, Configuration_1.loadConfiguration)(path_1.default.resolve(config));
if (configuration) {
    const docLoader = new DocumentLoader_1.default(configuration);
    docLoader.process();
}
