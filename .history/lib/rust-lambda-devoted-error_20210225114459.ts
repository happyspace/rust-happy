
import * as cdk from '@aws-cdk/core';
import * as s3  from '@aws-cdk/aws-s3';
import * as lambda from "@aws-cdk/aws-lambda";
import * as dynamodb from "@aws-cdk/aws-dynamodb";
import { Runtime } from '@aws-cdk/aws-lambda';
import { Duration  } from "@aws-cdk/core";
import * as iam from "@aws-cdk/aws-iam";
import * as event_sources from "@aws-cdk/aws-lambda-event-sources";


export interface RustLambdaDevotedStackProps extends cdk.StackProps {
  bucket: s3.Bucket;
  table: dynamodb.Table;
}

const imageBucketName = "cdk-rekn-imagebucket"

export class RustLambdaDevotedStack extends cdk.Stack {

  public readonly bucketImage: s3.Bucket;
  public readonly tableImage: dynamodb.Table;
  constructor(scope: cdk.Construct, id: string, props?: RustLambdaDevotedStackProps) {
    super(scope, id, props);


    // =====================================================================================
    // Image Bucket
    // =====================================================================================
    this.bucketImage = new s3.Bucket(this, imageBucketName, {
      removalPolicy: cdk.RemovalPolicy.DESTROY
    });
    new cdk.CfnOutput(this, 'imageBucket', { value: this.bucketImage.bucketName });


    // =====================================================================================
    // Amazon DynamoDB table for storing image labels
    // =====================================================================================
    this.tableImage = new dynamodb.Table(this, 'ImageLabels', {
      partitionKey: { name: 'image', type: dynamodb.AttributeType.STRING },
      removalPolicy: cdk.RemovalPolicy.DESTROY
    });
    new cdk.CfnOutput(this, 'ddbTable', { value: this.tableImage.tableName });

  }


    const rekFun = new lambda.Function(this, 'rekognitionFunction', {
      code: lambda.Code.fromAsset('rust_happy//echo.zip'),
      runtime: Runtime.PROVIDED_AL2,
      handler: 'doesnt.matter',
      timeout: Duration.seconds(30),
      memorySize: 1024,
      environment: {
//        "TABLE": props.table.tableName,
//        "BUCKET": props.bucket.bucketName,
        "RUST_BACKTRACE": '1',
      },
    });

    // rekFun.addEventSource(new event_sources.S3EventSource(bucket, { events: [ s3.EventType.OBJECT_CREATED ]}));

    bucket.grantRead(rekFun);
    table.grantWriteData(rekFun);

    rekFun.addToRolePolicy(new iam.PolicyStatement({
      effect: iam.Effect.ALLOW,
      actions: ['rekognition:DetectLabels'],
      resources: ['*']
    }));
  }
}