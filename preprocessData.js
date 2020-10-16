//@ts-check
const fs = require('fs');
const topojson = require('topojson');
const toUrl = require('./lib/tourl.js');

function main() {
  try {
    const mapData = JSON.parse(
      fs.readFileSync('data/map-borders-simplified.json', 'utf8'),
    );
    const bz = topojson.feature(mapData, mapData.objects.bezirksgrenzen);

    // --------------------------------------------------------------------
    // geojson Bezirke
    // console.log('\nCreate geojson bezirke');
    fs.writeFileSync(
      'data/generated/geojson/geojson_bezirke.json',
      JSON.stringify(bz),
    );

    // --------------------------------------------------------------------
    // eine FeatureCollection für jeden Bezirk mit allen Regionen
    // console.log('\nCreate bzr FeatureCollection for every bz');
    // @ts-ignore
    for (let i = 0; i < bz.features.length; i++) {
      // @ts-ignore
      const name = bz.features[i].properties.Gemeinde_name;

      const t = {
        type: 'FeatureCollection',
        features: [],
      };

      for (
        let j = 0;
        j < mapData.objects.lor_bezirksregionen.geometries.length;
        j++
      ) {
        const item = mapData.objects.lor_bezirksregionen.geometries[j];
        if (item.properties.BEZNAME == name) {
          t.features.push(topojson.feature(mapData, item));
        }
      }
      fs.writeFileSync(
        'data/generated/geojson/geojson_' + toUrl(name) + '_bzr.json',
        JSON.stringify(t),
      );
    }

    // --------------------------------------------------------------------
    // eine FeatureCollection für jeden Bezirk mit allen Planungsräumen
    // console.log('\nCreate pr FeatureCollection for every bz');

    // @ts-ignore
    for (let i = 0; i < bz.features.length; i++) {
      // @ts-ignore
      const name = bz.features[i].properties.Gemeinde_name;

      const t = {
        type: 'FeatureCollection',
        features: [],
      };

      for (
        let j = 0;
        j < mapData.objects.lor_planungsraeume.geometries.length;
        j++
      ) {
        const item = mapData.objects.lor_planungsraeume.geometries[j];
        if (item.properties.BEZNAME == name) {
          t.features.push(topojson.feature(mapData, item));
        }
      }
      fs.writeFileSync(
        'data/generated/geojson/geojson_' + toUrl(name) + '_pr.json',
        JSON.stringify(t),
      );
    }

    // --------------------------------------------------------------------
    // hierarchisches json mit alles Bezirken, Regionen und Planungsräumen
    // console.log('\nCreate br-bzr-pr.json');
    const bzBzrPr = {};
    // @ts-ignore
    for (let i = 0; i < bz.features.length; i++) {
      // @ts-ignore
      const name = bz.features[i].properties.Gemeinde_name;
      // @ts-ignore
      const schluessel = bz.features[i].properties.Gemeinde_schluessel;
      bzBzrPr[toUrl(name)] = {
        name,
        schluessel,
        url: toUrl(name),
        bzr: {},
      };
    }

    const bezirksregionen = topojson.feature(
      mapData,
      mapData.objects.lor_bezirksregionen,
    );
    // @ts-ignore
    for (let i = 0; i < bezirksregionen.features.length; i++) {
      // @ts-ignore
      const name = bezirksregionen.features[i].properties.BZR_NAME;
      // @ts-ignore
      const bzName = bezirksregionen.features[i].properties.BEZNAME;
      // @ts-ignore
      const schluessel = bezirksregionen.features[i].properties.spatial_name;

      bzBzrPr[toUrl(bzName)].bzr[toUrl(name)] = {
        name,
        schluessel,
        url: toUrl(name),
        pr: {},
      };
    }
    const planungsraeume = topojson.feature(
      mapData,
      mapData.objects.lor_planungsraeume,
    );
    // @ts-ignore
    for (let i = 0; i < planungsraeume.features.length; i++) {
      // @ts-ignore
      const name = planungsraeume.features[i].properties.PLRNAME;
      // @ts-ignore
      const bzName = planungsraeume.features[i].properties.BEZNAME;
      // @ts-ignore
      const bzrName = planungsraeume.features[i].properties.BZRNAME;
      // @ts-ignore
      const schluessel = planungsraeume.features[i].properties.spatial_name;

      bzBzrPr[toUrl(bzName)].bzr[toUrl(bzrName)].pr[toUrl(name)] = {
        name,
        schluessel,
      };
    }

    fs.writeFileSync('data/generated/bz-bzr-pr.json', JSON.stringify(bzBzrPr));

    // --------------------------------------------------------------------
    // routes erzeugen
    // console.log('\nCreate routes.json');
    const routes = [];
    Object.keys(bzBzrPr).forEach(function (key1) {
      routes.push(key1);
      Object.keys(bzBzrPr[key1].bzr).forEach(function (key2) {
        routes.push(key1 + '/' + key2);
      });
    });
    fs.writeFileSync('data/generated/routes.json', JSON.stringify(routes));
  } catch (error) {
    console.error(error);
    process.exit(1);
  } finally {
    console.log('processing done');
  }
}

main();
