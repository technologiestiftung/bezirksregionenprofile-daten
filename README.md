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

1. [Install Terraform and make yourself comfortable with it](https://learn.hashicorp.com/terraform)
2. Make sure you have a IAM user with programmatic access to your AWS account and the rights to modify/create S3 objects (is covered in the tutorial).
3. Add his AWS_ACCESS_ID and his AWS_ACCESS_SECRET to your `~/.aws/credentials` file
4. Update the `terraform.tfvars` and `s3-variables.tf` how you like them.
5. Run `terraform validate`
6. Run `terraform plan`
7. Run `terraform apply`

You now should have access over https to your buckets files.


## Data input

### Excel sheet
For data input an Excel sheet is used, with the following tabs:
    - **BZR Intro:** Information about the 'Bezirksregion' that appears in the top part of the detail page. Has to transfered manually to the bzr-overview.json
    - **datenblatt:** Hold all the data (titles, texts, table and graph references)
    - arbitrary abount of tabs for tables and graphs

As an example, see *data-input/example-data-input.xlsx*.

### Turn Excel to CSV Files
To turn the Excel sheets into CSV files:
- adapt bzr_input_file_list so that it contains all Excel file names that shall be turned to csv files 
- run the python script 'data-input/create-csv-files.py'.
- Paste csv files into respective data folders or adjust the path in the python script.

### Provide data as comprehensible Excel Sheet for Open Data
The data should be provided as open data via the download section of the 'Bezirk'. The download link should then be provided via the button 'Daten Download' on the detail page of each 'Bezirksregion'.

For provision of Open Data Excel sheets:
- Duplicate input Excel sheet with data
- Create tab "Verzeichnis" where all data input tables are listed (tables, barchart, linechart, map-pr, map-poi)
- Create tab "LOR-ID Übersicht" that lists all LORs with their respective IDs
- change data of tables used for graphs to be readable (without columns for color and axis)

As an example, see *data-input/friedenau-open-data-example.xlsx*.