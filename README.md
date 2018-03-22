# haiku-tweets
[![Build Status](https://travis-ci.org/pnevares/haiku-tweets.svg?branch=master)](https://travis-ci.org/pnevares/haiku-tweets)

Identify haiku on Twitter and post them

Steps to set up:
1. Refer to ./config.json.template to create your ./config.json
1. Create a Twitter account for your bot
1. Create an app on Twitter to get your API keys
1. Save your api keys and account name in ./config.json

Steps to deploy to AWS Lambda:
1. Set up an S3 bucket for your bot (to store your latest seen tweet's ID)
1. Create access keys for your AWS account
1. Save your access keys and S3 bucket config in ./config.json
1. Run `zip -r haiku-tweets.zip *` in the project root
1. Create a Lambda function, upload the zip from the previous step, using lambda.myHandler as the handler
1. Set up a CloudWatch rule for your bot's update interval

Example accounts using this code:
https://twitter.com/waypointhaiku
https://twitter.com/giantbombhaiku