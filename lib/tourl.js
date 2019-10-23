module.exports = function toUrl (str) {
    return str.toLowerCase().replace(/\u00fc/g, "ue").replace(/\u00e4/g, "ae").replace(/\u00f6/g, "oe").replace(/\u00df/g, "ss").replace(/ /g,"").replace(/\W/g, '');
}