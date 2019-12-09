provider "aws" {
  profile = "${var.profile}"
  region  = "${var.region}"
}

terraform {
  required_providers { aws = ">=2.40.0" }
  required_version = ">=0.12.8"
  backend "s3" {
    bucket = "tsb-terraform-remote-state-prod"
    key    = "bezirksregioneneprofile-daten/terraform.tfstate.d/terraform.tfstate"
        region = "eu-central-1"
  }
}
