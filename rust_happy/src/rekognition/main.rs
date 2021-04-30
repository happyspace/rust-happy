use lambda_runtime::{handler_fn, Context, Error};
use log::LevelFilter;
#[allow(unused_imports)]
use serde::{Deserialize, Serialize};
#[allow(unused_imports)]
use serde_json::{json, Value};
use simple_logger::SimpleLogger;

#[allow(unused_imports)]
use rusoto_core::Region;
#[allow(unused_imports)]
use rusoto_s3::{S3, S3Client, ListObjectsRequest};
#[allow(unused_imports)]
use lazy_static::lazy_static;
#[allow(unused_imports)]
use std::env;

use rust_happy::rekognition::{S3ClientContext, rekognition_function};

// use crate::moo::S3ClientContext;
// use moo::rekognition_function;


lazy_static! {
     static ref S3_CLIENT: S3Client = {
          // Default uses "AWS_Region" environment variable or Region::UsEast1
          // let region = env::var("AWS_Region").unwrap();
          // let region = region.parse().unwrap();
        
         let s3 : S3Client = S3Client::new(Region::default()); 
         s3
    };
}

#[tokio::main]
async fn main() -> Result<(), Error> {
    println!("Rust Happy!!");

    // The runtime logging can be enabled here by initializing `log` with `simple_logger`
    // or another compatible crate. The runtime is using `tracing` internally.
    // You can comment out the `simple_logger` init line and uncomment the following block to
    // use `tracing` in the handler function.
    //
    SimpleLogger::new().with_level(LevelFilter::Info).init().unwrap();
    /*
    tracing_subscriber::fmt()
        .with_max_level(tracing::Level::INFO)
        // this needs to be set to false, otherwise ANSI color codes will
        // show up in a confusing manner in CloudWatch logs.
        .with_ansi(false)
        // disabling time is handy because CloudWatch will add the ingestion time.
        .without_time()
        .init();
    */


    // call the actual handler of the request
    let func = handler_fn(my_handler_function);
    lambda_runtime::run(func).await?;

    Ok(())
}

/// The actual handler of the Lambda request.
pub(crate) async fn my_handler_function(_event: Value, _ctx: Context) -> Result<Value, Error>
{
    log::info!("event: {}", serde_json::json!(_event));

    let bucket_name = env::var("BUCKET").unwrap();
    //let s3c:S3Client = S3_CLIENT;
    
    let client_ctx  = S3ClientContext { 
        client: &*S3_CLIENT, 
        bucket_name: bucket_name};

    return rekognition_function(&_event, client_ctx).await;// let _client_Ctx: rust_happy::S3ClientContext = {}
    
}