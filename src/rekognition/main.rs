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


#[tokio::main]
async fn main() -> Result<(), Error> {
    println!("Rust Happy!");

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

    return Ok(event);
}