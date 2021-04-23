import { expect as expectCDK, matchTemplate, MatchStyle } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import * as DevHappy from '../lib/dev-happy-stack';

test('Empty Stack', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new DevHappy.DevHappyStack(app, 'MyTestStack');
    // THEN
    expectCDK(stack).to(matchTemplate({
      "Resources": {}
    }, MatchStyle.EXACT))
});
