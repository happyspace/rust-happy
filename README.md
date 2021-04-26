# Welcome to Rust Happy "AWS Dev Hour: Building Modern Applications" with the backend Lambda function implemented in Rust

The following project follows [AWS Dev Hour: Building Modern Applications](https://aws.amazon.com/blogs/training-and-certification/new-free-twitch-training-aws-dev-hour-building-modern-applications/)
We build out our cloud application infrastructure using CDK. Our backend code will be implemented in Rust. We include the rust code in this project as a mono-repo to make building and deploying ergonomic. For a real world project we would likely separate these concerns.

## Things We Need to Setup

Follow directions to install the following for your host platform.

* [Instal Docker Desktop](https://www.docker.com/products/docker-desktop)

**Windows Users**

* [build-lambda-zip][gozip]  
  * [Go](https://golang.org/doc/install)

[gozip]: 
```pwsh
go.exe get -u github.com/aws/aws-lambda-go/cmd/build-lambda-zip
```

## Lambdas


### rekognition

### service

## Docker

### Build

Build an image for building our lambdas based on the [official template for Alpine Linux](https://github.com/rust-lang/docker-rust). To this we add build-base, openssl-dev and git.

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
* Our lambda function, in our case compiled into our runtime *bootstrap*

We will package our lambda functions in .zip archives for deployment through AWS CDK.


> **Note to Windows Users**
>
> Our *bootstrap* file must be executable, which will not be preserved
> creating the '.zip' file in Windows. For 
> ```pwsh
> ~\Go\Bin\build-lambda-zip.exe -output echo.zip bootstrap
> ```
> 


```sh

```

## CDK

The `cdk.json` file tells the CDK Toolkit how to execute your app.

### Useful commands

 * `npm run build`   compile typescript to js
 * `npm run watch`   watch for changes and compile
 * `npm run test`    perform the jest unit tests
 * `cdk deploy`      deploy this stack to your default AWS account/region
 * `cdk diff`        compare deployed stack with current state
 * `cdk synth`       emits the synthesized CloudFormation template

## Rust



