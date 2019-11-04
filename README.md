# bezirksregionenprofile-daten

Data for [bezirksregionenprofile_2_0
](https://github.com/technologiestiftung/bezirksregionenprofile_2_0) repo. Serves as a prototype API.

## Setup
```npm install```

## Data preprocessing
### Geodata
Build hierarchical minimal data structure from topojson source file. This will generate all files in ```data/generated```. This only needs to be run when there are changes to geographic data e.g. a new district that needs to be added.
```node run preprocessData.js```

### Images
Gulp task to compress images and create thumbnail files. This generates all files within ```images/optimized``` folder.
```gulp```