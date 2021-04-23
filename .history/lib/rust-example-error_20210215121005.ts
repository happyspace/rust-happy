import * as cdk from '@aws-cdk/core';

import * as lambda from "@aws-cdk/aws-lambda";

export class RustExampleErrorStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const rekFun = new lambda.Function(this, 'rekognitionFunction', {
      code: lambda.Code.fromAsset('rust_happy//lambda.zip'),
      runtime: Runtime.PROVIDED_AL2,
      handler: 'doesnt.matter',
      timeout: Duration.seconds(30),
      memorySize: 1024,
      environment: {
        "RUST_BACKTRACE": '1',
        "TABLE": table.tableName,
        "BUCKET": imageBucket.bucketName,
      },
    });
  }
}