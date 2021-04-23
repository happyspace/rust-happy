
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


export class RustLambdaDevotedStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: RustLambdaDevotedStackProps) {
    super(scope, id, props);



    

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

    rekFun.addEventSource(new event_sources.S3EventSource(props.bucket, { events: [ s3.EventType.OBJECT_CREATED ]}));
    props.bucket.grantRead(rekFun);
    props.table.grantWriteData(rekFun);

    rekFun.addToRolePolicy(new iam.PolicyStatement({
      effect: iam.Effect.ALLOW,
      actions: ['rekognition:DetectLabels'],
      resources: ['*']
    }));
  }
}