import * as cdk from '@aws-cdk/core';

import * as s3  from '@aws-cdk/aws-s3';
import * as lambda from "@aws-cdk/aws-lambda";
import * as dynamodb from "@aws-cdk/aws-dynamodb";
import { Duration  } from "@aws-cdk/core";
import * as iam from "@aws-cdk/aws-iam";
import * as event_sources from "@aws-cdk/aws-lambda-event-sources";

const imageBucketName = "cdk-rekn-imagebucket"

export class DevHappyStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here
  }
}
