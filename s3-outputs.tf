output "s3-bucket-name-upload" {
  value = "${aws_s3_bucket.default.bucket_domain_name}"
}
