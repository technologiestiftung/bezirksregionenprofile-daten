provider "aws" {
  profile = "${var.profile}"
  region  = "${var.region}"
}

data "aws_s3_bucket" "remote-state" {
  bucket = "${var.remote_state_bucket_name}"
}

terraform {
  required_providers { aws = ">=2.40.0" }
  required_version = ">=0.12.8"
  backend "s3"{
    bucket = "${data.aws_s3_bucket.remote-state.id}"
    key = "bezirksregioneneprofile-daten/terraform.tfstate.d/terraform.tfstate"
  }
}
