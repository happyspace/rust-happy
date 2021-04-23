#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { DevHappyStack } from '../lib/dev-happy-stack';
import { RustExampleErrorStack} from '../lib/rust-example-error';

const app = new cdk.App();
new DevHappyStack(app, 'DevHappyStack');

new RustExampleErrorStack(app, 'RustExampleErrorStack');
