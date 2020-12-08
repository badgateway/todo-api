import app from './app';
import awsHandler from '@curveball/aws-lambda';

// eslint-disable-next-line @typescript-eslint/no-var-requires
console.log('⚾ Curveball v%s', require('@curveball/core/package.json').version);

export const handler = awsHandler(app);
