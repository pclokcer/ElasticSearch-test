const elastic = require('./elasticClient')

const documant = async function (indexName, _id, mappingType, data) {

    return await elastic.index({
        index: indexName,
        type: mappingType,
        id: _id,
        body: data
    })

}

module.exports = documant