'use strict';

const { CommandType } = require("wokcommands");
const { searchEndpoint } = require("../alphaVantage");

module.exports = {
    description: "Returns the best-matching symbols and market information based on keywords of your choice.",
    type: CommandType.SLASH,
    minArgs: 1,
    maxArgs: 1,
    expectedArgs: "<keyword>",
    callback: async (interaction) => {
        var quoteCode = interaction.args[0];

        if(!quoteCode.endsWith('.sa'))
            quoteCode += '.sa';
		
        let search = await searchEndpoint(quoteCode);

        if (search.bestMatches[0] === undefined)
            return { content: "no results found", ephemeral: true }

        return {
            content: `${search.bestMatches[0]["2. name"]} - Symbol: ${search.bestMatches[0]["1. symbol"]}`,
            ephemeral: true
        }
    }
}