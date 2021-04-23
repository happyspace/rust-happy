#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { DevHappyStack } from '../lib/dev-happy-stack';
import { RustLambdaDevotedStack} from '../lib/rust-lambda-devoted-error';
import { S3Code } from '@aws-cdk/aws-lambda';

import * as s3  from '@aws-cdk/aws-s3';
import * as lambda from "@aws-cdk/aws-lambda";
import * as dynamodb from "@aws-cdk/aws-dynamodb";

const app = new cdk.App();
const infStack = new DevHappyStack(app, 'DevHappyStack');

export interface RustLambdaDevotedStackProps extends cdk.StackProps {
  bucket: s3.Bucket;
  table: dynamodb.Table;
}

const lambdaStack = new RustLambdaDevotedStack(app, 'RustLambdaDevotedStack', {
  bucket: infStack.imageBucket,
  table: infStack.imageTable,
});
