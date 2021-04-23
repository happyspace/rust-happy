import * as cdk from '@aws-cdk/core';

import * as lambda from "@aws-cdk/aws-lambda";
import { Runtime } from '@aws-cdk/aws-lambda';
import { Duration  } from "@aws-cdk/core";

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

    const rekFun = new lambda.Function(this, 'rekognitionFunction', {
      code: lambda.Code.fromAsset('rust_happy//echo.zip'),
      runtime: Runtime.PROVIDED_AL2,
      handler: 'doesnt.matter',
      timeout: Duration.seconds(30),
      memorySize: 1024,
      environment: {
        "RUST_BACKTRACE": '1',
      },
    });
  }
}