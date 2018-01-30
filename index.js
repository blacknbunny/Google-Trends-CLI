'use strict';

const googleTrends = require('google-trends-api');
const readlineSync = require('readline-sync');


console.log("(1) : Most Searched Similar Words For Your Keyword\n(2) : Which Country Is Most Using Your Word\n(3) : Most Related Topics For Your Word");

var select = readlineSync.question("Number : ");

console.log("\n\nKeyword : For Searching Most Similar Words In Google Trends\n");
console.log("Resolution : COUNTRY, REGION, CITY, DMA or empty\n");
console.log("Geo :\n\tCountry : US, TR, WORLDWIDE : DEFAULT etc.. https://sites.google.com/site/tomihasa/google-language-codes\n\tRegion  : North America, South America, Europe etc..\n\tCity    : Albany - (New York) Arlington - (Virginia) Arizona etc..\n\tDMA     : https://help.ooyala.com/video-platform/reference/dma_codes.html\n");

var keyword = readlineSync.question("Keyword : ");

if (select == "1") {
  var resolution = readlineSync.question("Resolution : ");
  var geo = readlineSync.question("Geo : ");
  googleTrends.relatedQueries({
    keyword: keyword,
    geo: geo == "" ? "" : geo.toUpperCase(),
    resolution: resolution == "" ? "" : resolution.toUpperCase(),
    category: 0
  }).then((results) => {
    const parsedresults = JSON.parse(results);
    console.log("\nMost Searched Similar Words :\n");
    for (let i = 0; i < parsedresults.default.rankedList.length; i++) {
      for (let x = 0; x < parsedresults.default.rankedList[i].rankedKeyword.length; x++) {
        x != parsedresults.default.rankedList[i].rankedKeyword.length - 1 ? process.stdout.write(parsedresults.default.rankedList[i].rankedKeyword[x].query + ", ") : process.stdout.write(parsedresults.default.rankedList[i].rankedKeyword[x].query + "\n\n")
      }
    }
  }).catch((err) => {
    console.error(err);
  });
} else if (select == "2") {
  var geo = readlineSync.question("Geo : ");
  googleTrends.interestByRegion({
    keyword: keyword,
    geo: geo == "" ? "" : geo.toUpperCase()
  }).then((results) => {
    const parsedresults = JSON.parse(results);
    console.log("\nWhich Country Is Most Using Your Word :\n");
    for (let i = 0; i < parsedresults.default.geoMapData.length; i++) {
      console.log((i + 1) + ".", parsedresults.default.geoMapData[i].geoName.replace(" Province", ""));
    }
  }).catch((err) => {
    console.log(err);
  });
} else if (select == "3") {
  var geo = readlineSync.question("Geo : ");
  googleTrends.relatedTopics({
    keyword: keyword,
    geo: geo
  }).then((results) => {
    const parsedresults = JSON.parse(results);
    console.log("\nMost Related Topics For Your Word :\n");
    for (let i = 0; i < parsedresults.default.rankedList.length; i++) {
      for (let x = 0; x < parsedresults.default.rankedList[i].rankedKeyword.length; x++) {
        console.log(parsedresults.default.rankedList[i].rankedKeyword[x].topic.title);
      }
    }
  }).catch((err) => {
    console.log(err);
  });
} else {
  process.exit(1);
}
