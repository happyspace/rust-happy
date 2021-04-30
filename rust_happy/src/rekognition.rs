#[allow(unused_imports)]
use lambda_runtime::{handler_fn, Context, Error};
#[allow(unused_imports)]
use log::LevelFilter;
#[allow(unused_imports)]
use serde::{Deserialize, Serialize};
#[allow(unused_imports)]
use serde_json::{json, Value};
#[allow(unused_imports)]
use simple_logger::SimpleLogger;

#[allow(unused_imports)]
use rusoto_core::Region;
#[allow(unused_imports)]
use rusoto_s3::{S3, S3Client, ListObjectsRequest};
#[allow(unused_imports)]
use lazy_static::lazy_static;
#[allow(unused_imports)]
use std::env;

pub struct S3ClientContext<'a> {
  pub client: &'a S3Client,
  pub bucket_name: String,
}


/// We do our work here... 
pub async fn rekognition_function(_event: &Value, s3_client_ctx: S3ClientContext<'_>) -> Result<Value, Error>
{
    
    let _list_obj_req = ListObjectsRequest{
        bucket: s3_client_ctx.bucket_name,
        ..Default::default()
    };

    match s3_client_ctx.client.list_objects(_list_obj_req).await {
        Err(e) => log::info!("Error listing buckets: {}", e),
        Ok(buckets) => log::info!("Buckets found: {:?}", buckets),
    };
    
    return Ok(json!("{}"));

}