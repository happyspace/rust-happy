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

    // image store 
    const imageBucket = new s3.Bucket(this, imageBucketName);
    new cdk.CfnOutput(this, 'imageBucket', {value: imageBucket.bucketName});

    // dynamodb image table
    const table = new dynamodb.Table(this, 'ImageLabels', { 
      partitionKey: { name: 'image', type: dynamodb.AttributeType.STRING } 
    });
    new cdk.CfnOutput(this, 'ddbTable', { value: table.tableName });


  }
}
