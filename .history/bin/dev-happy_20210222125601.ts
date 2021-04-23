#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { DevHappyStack } from '../lib/dev-happy-stack';
import { RustLambdaDevotedStack} from '../lib/rust-lambda-devoted-error';

const app = new cdk.App();
const infStack = new DevHappyStack(app, 'DevHappyStack');

const lambdaStack = new RustLambdaDevotedStack(app, 'RustLambdaDevotedStack');
