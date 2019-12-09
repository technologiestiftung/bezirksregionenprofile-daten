# bezirksregionenprofile-daten

Data for [bezirksregionenprofile_2_0
](https://github.com/technologiestiftung/bezirksregionenprofile_2_0) repo. Serves as a prototype API. All files in ```data```folder need to be publicly accessible.

## Setup
```npm install```

## Data preprocessing
### Geodata
Build hierarchical minimal data structure from topojson source file. This will generate all files in ```data/generated```. This only needs to be run when there are changes to geographic data e.g. a new district that needs to be added.

```node run preprocessData.js```

### Images
Gulp task to compress images and create thumbnail files. This generates all files within ```images/optimized``` folder.

```gulp```


## Data API

To setup the data API we use Terraform and a AWS S3 bucket with public-read access.

1. Create the file `terraform.tfvars` from the example below the list and populate it with your values
2. [Install Terraform and make yourself comfortable with it](https://learn.hashicorp.com/terraform)
3. Make sure you have a IAM user with programmatic access to your AWS account and the rights to modify/create S3 objects (is covered in the tutorial).
4. Add his AWS_ACCESS_ID and his AWS_ACCESS_SECRET to your `~/.aws/credentials` file
5. Update the `terraform.tfvars` and `s3-variables.tf` how you like them.
6. Run `terraform validate`
7. Run `terraform plan`
8. Run `terraform apply`


```terraform
region = "eu-central-1"
profile = "YOUR-PROFILE"
allowed_origins =  ["*"]

```

You now should have access over https to your buckets files.
