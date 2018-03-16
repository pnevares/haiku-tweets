/* eslint-disable class-methods-use-this, no-underscore-dangle */

const AWS = jest.genMockFromModule('aws-sdk');

let returnValue;
let throwError;

AWS.S3 = class {
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
};

AWS.__setReturnValue = (value) => {
  returnValue = value;
};

AWS.__throwS3GetObject = (error) => {
  throwError = error;
};

module.exports = AWS;
