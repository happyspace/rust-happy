#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { RustHappyStack, RustHappyStackProps } from '../lib/rust-happy-stack';
import { S3Code } from '@aws-cdk/aws-lambda';

import * as s3  from '@aws-cdk/aws-s3';
import * as lambda from "@aws-cdk/aws-lambda";
import * as dynamodb from "@aws-cdk/aws-dynamodb";

const app = new cdk.App();

const rustHappyStack = new RustHappyStack(app, 'RustHappyStack');


