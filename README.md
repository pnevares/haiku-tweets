# haiku-tweets

Identify haiku on Twitter and post them

[![Build Status](https://travis-ci.org/pnevares/haiku-tweets.svg?branch=master)](https://travis-ci.org/pnevares/haiku-tweets)

## Twitter setup:
1. Refer to `./config.json.template` to create your `./config.json`
1. Create a Twitter account for your bot, follow the accounts you're interested in
1. Create an app on Twitter to get your API keys
1. Save your API keys and account name in `./config.json`

## AWS setup:
1. Create an S3 bucket for your bot (this is used to store your last seen tweetId)
1. Create access keys for your AWS account
1. Save your access keys and S3 bucket config in `./config.json`

## Steps to deploy to AWS Lambda:
1. Run `npm run build` in the project root
1. Create a Lambda function, upload `dist.zip` from the previous step, and input `lambda.myHandler` as the handler
1. Set up a CloudWatch rule for your bot's update interval (ex: 10 minutes)

## Deploy to your Lambda from the CLI
1. Run `npm run build` in the project root
1. [Install and configure the AWS Command Line Interface](https://docs.aws.amazon.com/cli/latest/userguide/installing.html)
1. From your project root:
```
aws lambda update-function-code \
  --function-name YOUR_LAMBDA \
  --zip-file fileb://./dist.zip
```

## Common problems:

### My bot is retweeting its own tweets
Your account name in `./config.json` should be preventing this, check for typos.
### Replies sometimes include the parent user's username
A tweet's text will include the parent's username if the parent and child are different users.

## Example accounts using this code:
* https://twitter.com/WaypointHaiku
* https://twitter.com/GiantbombHaiku
* https://twitter.com/McelroyHaiku
* https://twitter.com/PolygonHaiku