const elastic = require('./elasticClient')

const map = async function (indexName, mappingType, mappingData) {

    return await elastic.indices.putMapping({
        index: indexName,
        type: mappingType,
        body: mappingData,
        includeTypeName: true
    })

}

module.exports = map