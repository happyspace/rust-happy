// extern crate rust_happy;
use rust_happy::rekognition::{S3ClientContext, rekognition_function};
#[allow(unused_imports)]
use rusoto_s3::{S3, S3Client, ListObjectsRequest};
#[allow(unused_imports)]
use rusoto_core::Region;
#[allow(unused_imports)]
use serde_json::{json, Value};

#[tokio::test]
async fn rekognition(){
  println!("moo");
  
  
  let s3_client = S3Client::new(Region::default());
  
  // our first test message :)
  let event = json!("{}");

  // create our client with an identifier for the bucket we will be 
  let s3_ctx = S3ClientContext {
      client: &s3_client,
      bucket_name: "moomoo".to_owned(),
  };

  let result = rekognition_function(&event, s3_ctx);
}