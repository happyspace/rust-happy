import * as cdk from '@aws-cdk/core';
import * as s3  from '@aws-cdk/aws-s3';
import * as lambda from "@aws-cdk/aws-lambda";
import * as dynamodb from "@aws-cdk/aws-dynamodb";
import { Runtime } from '@aws-cdk/aws-lambda';
import { Duration  } from "@aws-cdk/core";
import * as iam from "@aws-cdk/aws-iam";
import * as event_sources from "@aws-cdk/aws-lambda-event-sources";


const imageBucketName = "cdk-rekn-imagebucket"

export class RustExampleErrorStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // =====================================================================================
    // Image Bucket
    // =====================================================================================
    const imageBucket = new s3.Bucket(this, imageBucketName, {
      removalPolicy: cdk.RemovalPolicy.DESTROY
    });
    new cdk.CfnOutput(this, 'imageBucket', { value: imageBucket.bucketName });

    // =====================================================================================
    // Amazon DynamoDB table for storing image labels
    // =====================================================================================
    const table = new dynamodb.Table(this, 'ImageLabels', {
      partitionKey: { name: 'image', type: dynamodb.AttributeType.STRING },
      removalPolicy: cdk.RemovalPolicy.DESTROY
    });
    new cdk.CfnOutput(this, 'ddbTable', { value: table.tableName });

    const rekFun = new lambda.Function(this, 'rekognitionFunction', {
      code: lambda.Code.fromAsset('rust_happy//echo.zip'),
      runtime: Runtime.PROVIDED_AL2,
      handler: 'doesnt.matter',
      timeout: Duration.seconds(30),
      memorySize: 1024,
      environment: {
        "TABLE": table.tableName,
        "BUCKET": imageBucket.bucketName,
        "RUST_BACKTRACE": '1',
      },
    });

    rekFun.addEventSource(new event_sources.S3EventSource(imageBucket, { events: [ s3.EventType.OBJECT_CREATED ]}));
    imageBucket.grantRead(rekFun);
    table.grantWriteData(rekFun);

    rekFun.addToRolePolicy(new iam.PolicyStatement({
      effect: iam.Effect.ALLOW,
      actions: ['rekognition:DetectLabels'],
      resources: ['*']
    }));
  }
}