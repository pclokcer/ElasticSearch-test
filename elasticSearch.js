const elastic = require('./elasticClient')

const search = async function (indexName, mappingType, searchQuery) {
    return await elastic.search({
        index: indexName,
        type: mappingType,
        body: searchQuery
    });
}
 
module.exports = search;