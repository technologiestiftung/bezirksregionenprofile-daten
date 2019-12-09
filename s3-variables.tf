variable "region" {
  default = "eu-central-1"
}
variable "profile" {
}
variable "name" {
  default = "data"
}
variable "allowed_origins" {

}

variable "remote_state_bucket_name"{
  description = "The bucket where we store this remote state"
}
variable "prefix" {
  description = "prefix for names"
  default     = "bezirksregionenprofile"
}

variable "env" {
  default = "dev"
}
