resource "aws_s3_bucket" "default" {
  bucket        = "${var.prefix}-${var.name}-${var.env}"
  acl           = "public-read"
  force_destroy = true
  versioning {
    enabled = false
  }
  cors_rule {
    allowed_headers = ["*"]
    allowed_methods = ["GET"]
    allowed_origins = "${var.allowed_origins}"
    expose_headers  = ["ETag"]
    max_age_seconds = 6000
  }

  tags = {
    name    = "terraform bucket for bezirksregionen profile data api. See https://github.com/technologiestiftung/bezirksregionenprofile-daten/"
    source  = "https://github.com/technologiestiftung/bezirksregionenprofile-daten/"
    project = "bezirksregionen"
    type    = "api"
  }
}

resource "aws_s3_bucket_object" "default" {
  for_each = fileset(path.module, "data/**/*")
  bucket   = aws_s3_bucket.default.bucket
  key      = each.value
  source   = "${path.module}/${each.value}"
  acl      = "public-read"
}
