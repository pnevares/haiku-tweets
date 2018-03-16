/* eslint-disable class-methods-use-this, no-underscore-dangle */

const AWS = jest.genMockFromModule('aws-sdk');

let returnValue;
let throwError;

class S3 {
  getObject() {
    return {
      promise: () => {
        if (throwError) {
          return Promise.reject(throwError);
        }

        return Promise.resolve({
          Body: { toString: () => returnValue },
        });
      },

    };
  }
  putObject() {
    return {
      promise: () => {
        if (throwError) {
          return Promise.reject(throwError);
        }

        return Promise.resolve(returnValue);
      },

    };
  }
}

AWS.__setReturnValue = (value) => {
  returnValue = value;
};

AWS.__throwS3GetObject = (error) => {
  throwError = error;
};

AWS.__throwS3PutObject = (error) => {
  throwError = error;
};

AWS.S3 = S3;

module.exports = AWS;
