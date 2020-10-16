variable "region" {
  default = "eu-central-1"
}
variable "profile" {
  default = "default"
}
variable "name" {
  default = "data"
}
variable "allowed_origins" {
  default = ["*"]
}

variable "prefix" {
  description = "prefix for names"
  default     = "bezirksregionenprofile"
}

variable "env" {
  default = "dev"
}
