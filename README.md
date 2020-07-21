# Bezirksregionenprofile Daten

Data for [bezirksregionenprofile_2_0
](https://github.com/technologiestiftung/bezirksregionenprofile_2_0) repo. Serves as a prototype API. All files in ```data```folder need to be publicly accessible.

## Setup

```bash
npm install
```

## Data preprocessing

### Geodata

Build hierarchical minimal data structure from topojson source file. This will generate all files in ```data/generated```. This only needs to be run when there are changes to geographic data e.g. a new district that needs to be added.

```bash
node preprocessData.js
```

### Images

Gulp task to compress images and create thumbnail files. This generates all files within ```images/optimized``` folder.

```bash
gulp
```


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

### Future optimization

As the system with the CSV files is not optimal, this JSON scheme is recommended for future optimization:

#### Example dataset with all content elements

```json
[
    {
        "ref": "1",
        "type": "titel",
        "content": "Headline Text"
    },
    {
        "ref": "1",
        "type": "text",
        "content": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit."
    },
    {
        "ref": "1",
        "type": "image",
        "datasource": "https://image-url.jpg",
        "content": "Image headline",
        "source": "copyright information / credits",
        "alt": "Alt text"
    },
    {
        "ref": "2",
        "type": "table",
        "content": "Table headline",
        "source": "copyright information / credits",
        "alt": "Alt text for aria-label",
        "data": [
            {
                "filedname1": "value_1_row_1",
                "filedname2": "value_2_row_1",
                "filedname3": "value_3_row_1"
            },
            {
                "filedname1": "value_1_row_2",
                "filedname2": "value_2_row_2",
                "filedname3": "value_3_row_2"
            }
        ]
    },
    {
        "ref": "2",
        "type": "barchart",
        "content": "Chart headline",
        "source": "copyright information / credits",
        "data": {
            "labels": [
                "2013",
                "2014",
                "2015",
                "2016",
                "2017"
            ],
            "datasets": [
                {
                    "data": [
                        "23",
                        "25",
                        "37",
                        "40",
                        "35"
                    ],
                    "label": "Kita 1",
                    "borderColor": "#1E3791",
                    "backgroundColor": "#1E3791",
                    "fill": false
                },
                {
                    "data": [
                        "13",
                        "10",
                        "12",
                        "17",
                        "15"
                    ],
                    "label": "Kita 2",
                    "borderColor": "#04A6F0 ",
                    "backgroundColor": "#04A6F0 ",
                    "fill": false
                }
            ]
        }
    },
    {
        "ref": "2",
        "type": "linechart",
        "content": "Chart headline",
        "source": "copyright information / credits",
        "data": {
            "labels": [
                "2013",
                "2014",
                "2015",
                "2016",
                "2017"
            ],
            "datasets": [
                {
                    "data": [
                        "23",
                        "25",
                        "37",
                        "40",
                        "35"
                    ],
                    "label": "Kita 1",
                    "borderColor": "#1E3791",
                    "backgroundColor": "#1E3791",
                    "fill": false
                },
                {
                    "data": [
                        "13",
                        "10",
                        "12",
                        "17",
                        "15"
                    ],
                    "label": "Kita 2",
                    "borderColor": "#04A6F0 ",
                    "backgroundColor": "#04A6F0 ",
                    "fill": false
                }
            ]
        }
    },
    {
        "ref": "3",
        "type": "map-pr",
        "content": "Map  headline",
        "source": "copyright information / credits",
        "alt": "Alt text for aria-label",
        "data": [
            {
                "id": "7010101",
                "wert": "11.4403",
                "einheit": "GruSI SGB XII 65+ (%)",
                "color": "#E60032"
            },
            {
                "id": "7010102",
                "wert": "21.0592",
                "einheit": "",
                "color": ""
            },
            {
                "id": "7010103",
                "wert": "8.7484",
                "einheit": "",
                "color": ""
            },
            {
                "id": "7010104",
                "wert": "26.9136",
                "einheit": "",
                "color": ""
            }
        ]
    },
    {
        "ref": "2",
        "type": "map-poi",
        "source": "copyright information / credits",
        "content": "Map headline",
        "data": [
            {
                "lng": "13.396395",
                "lat": "52.497542",
                "text": "Spielplatz 1",
                "color": "#1E3791"
            },
            {
                "lng": "13.397543",
                "lat": "52.494634",
                "text": "Spielplatz 2",
                "color": ""
            },
            {
                "lng": "13.404399",
                "lat": "52.495450",
                "text": "Spielplatz 3",
                "color": ""
            }
        ]
    }
]
```
