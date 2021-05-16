const elastic = require('./elasticClient')

const index = async function(indexName) { 
    try {

        return await elastic.indices.get({
            index: indexName
        })
        
    } catch (error) {
        
        return await elastic.indices.create({
            index: indexName
        })

    }
}

module.exports = index