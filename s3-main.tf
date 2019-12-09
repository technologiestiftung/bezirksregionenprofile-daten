provider "aws" {
  profile = "${var.profile}"
  region  = "${var.region}"
}
terraform {
  required_providers { aws = ">=2.40.0" }
  required_version = ">=0.12.8"
}
