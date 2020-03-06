module.exports = {
    "parser": "babel-eslint",
    "extends":"airbnb-base",
    "env": {
        "browser": true,
        "node": true
    },
    "rules":{
        "indent": ["error", 4],
        "import/no-extraneous-dependencies":["error",{
            "devDependencies": true
        }],
    }
}