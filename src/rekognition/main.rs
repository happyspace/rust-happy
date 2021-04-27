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
pub(crate) async fn my_handler_function(event: Value, _ctx: Context) -> Result<Value, Error>
{
    log::info!("event: {}", serde_json::json!(event));

    match S3_CLIENT.list_buckets().await {
        Err(e) => log::info!("Error listing buckets: {}", e),
        Ok(buckets) => log::info!("Buckets found: {:?}", buckets),
    };
    
    return Ok(event);
}