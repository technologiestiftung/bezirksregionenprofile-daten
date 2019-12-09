variable "region" {
  default = "eu-central-1"
}
variable "profile" {
  default = "tsberlin"
}
variable "name" {
  default = "data"
}
variable "allowed_origins" {
}

variable "prefix" {
  description = "prefix for names"
  default     = "bezirksregionenprofile"
}

variable "env" {
  default = "dev"
}
