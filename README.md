# Welcome to Rust Happy "AWS Dev Hour: Building Modern Applications" with the backend Lambda function implemented in Rust

The following project follows [AWS Dev Hour: Building Modern Applications](https://aws.amazon.com/blogs/training-and-certification/new-free-twitch-training-aws-dev-hour-building-modern-applications/)
We build out our cloud application infrastructure using CDK. Our backend code will be implemented in Rust. We include the rust code in this project as a mono-repo to make building and deploying ergonomic. For a real world project we would likely separate these concerns.

## Things We Need to Setup

Follow directions to install the following for your host platform.

* [Docker Desktop](https://www.docker.com/products/docker-desktop)
* [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html)
  * [aws configure](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-quickstart.html#cli-configure-quickstart-config)
* [AWS CDK](https://docs.aws.amazon.com/cdk/latest/guide/getting_started.html)
  * [Follow 'Prerequisites' to setup the CDK](https://github.com/aws-samples/aws-dev-hour-backend#prerequisites)

### Windows Users

If we would like to package our lambdas on the Windows side, use this utility to create the zip file correctly.

* [build-lambda-zip](#get-build-lambda-zip)  
  * [Go](https://golang.org/doc/install)

#### Get build-lambda-zip

```pwsh
go.exe get -u github.com/aws/aws-lambda-go/cmd/build-lambda-zip
```

#### Building nativity on Windows

TODO: install OpenSSL and build the Rust OpenSSL crate.

#### Visual Studio Code -- Standard Rust Container

TODO: Explore using Visual Studio Code Standard Rust Container

## Docker

### Build

Build an image for building our lambdas based on the [official Rust template for Alpine Linux](https://github.com/rust-lang/docker-rust). To this we add build-base, openssl-dev, git and zip.

```pwsh

docker build -t happyspace/rust-happy .

```

### Run

```pwsh
docker run --rm -it -v "$(pwd):/usr/src/app" happyspace/rust-happy

```

### Build lambda code interactively in the container

```sh
cargo build --bin rekognition --release --target x86_64-unknown-linux-musl

```

### Package lambda code for deployment

For custom AWS lambda runtimes, we follow the convention [described in the docs](https://docs.aws.amazon.com/lambda/latest/dg/runtimes-custom.html):

* Include a runtime 'in the form of an executable file named *bootstrap*'
* A lambda function, in our case compiled into our runtime *bootstrap*

We will package our lambda functions in .zip archives for deployment through AWS CDK.

#### Package lambda interactively in our container

```sh
cp ./target/x86_64-unknown-linux-musl/release/rekognition ./bootstrap && zip rekognition.zip bootstrap && rm bootstrap && mv -f rekognition.zip ./lambda/


```

> #### Note to Windows Users
>
> Our *bootstrap* file must be executable, which will not be preserved
> creating the '.zip' file in Windows context. Use the 'build-lambda-zip utility to create a zip file that does preserved the executable status of our *bootstrap* file.
>
> ```pwsh
> cp ./target/x86_64-unknown-linux-musl/release/rekognition ./bootstrap
> ~\Go\Bin\build-lambda-zip.exe -output rekognition.zip bootstrap
> mv -force rekognition.zip ./lambda/ && rm bootstrap
> ```
>

```sh

```

## CDK: how we will manage our lambda code

Once we have created our build context in Docker, built and packaged our lambda functions: we are ready to deploy the code through AWS CDK.



```pwsh
cdk synth
cdk deploy

```

## AWS Rust Happy Stack




The `cdk.json` file tells the CDK Toolkit how to execute your app.

### Useful commands

* `npm run build`   compile typescript to js
* `npm run watch`   watch for changes and compile
* `npm run test`    perform the jest unit tests
* `cdk deploy`      deploy this stack to your default AWS account/region
* `cdk diff`        compare deployed stack with current state
* `cdk synth`       emits the synthesized CloudFormation template

## Rust



