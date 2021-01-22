module.exports = [{"name":"client","mode":"development","devtool":"cheap-module-eval-source-map","optimization":{"runtimeChunk":"single","minimize":false,"splitChunks":{"chunks":"all","automaticNameDelimiter":"/","cacheGroups":{"commons":{"test":"/node_modules[\\\\/](vue|vue-loader|vue-router|vuex|vue-meta|core-js|@babel\\/runtime|axios|webpack|setimmediate|timers-browserify|process|regenerator-runtime|cookie|js-cookie|is-buffer|dotprop|url-polyfill|@nuxt[\\\\/]ufo|ufo|nuxt\\.js)[\\\\/]/","chunks":"all","name":true,"priority":10}}}},"output":{"path":"C:\\Users\\Eared\\Desktop\\dev\\projects\\oxouno\\app\\.nuxt\\dist\\client","filename":"[name].js","futureEmitAssets":true,"chunkFilename":"[name].js","publicPath":"/_nuxt/"},"performance":{"maxEntrypointSize":1024000,"hints":false},"module":{"rules":[{"test":"/\\.vue$/i","loader":"vue-loader","options":{"transformAssetUrls":{"video":"src","source":"src","object":"src","embed":"src"},"productionMode":false}},{"test":"/\\.pug$/i","oneOf":[{"resourceQuery":"/^\\?vue/i","use":[{"loader":"pug-plain-loader","options":{}}]},{"use":["raw-loader",{"loader":"pug-plain-loader","options":{}}]}]},{"test":"/\\.m?jsx?$/i","use":[{"loader":"C:\\Users\\Eared\\Desktop\\dev\\projects\\oxouno\\app\\node_modules\\babel-loader\\lib\\index.js","options":{"configFile":false,"babelrc":false,"cacheDirectory":true,"envName":"client","presets":[["C:\\Users\\Eared\\Desktop\\dev\\projects\\oxouno\\app\\node_modules\\@nuxt\\babel-preset-app\\src\\index.js",{"corejs":{"version":2}}]]}}]},{"test":"/\\.css$/i","oneOf":[{"resourceQuery":"/module/","use":[{"loader":"vue-style-loader","options":{"sourceMap":true}},{"loader":"css-loader","options":{"modules":{"localIdentName":"[local]_[hash:base64:5]"},"sourceMap":true,"importLoaders":2,"onlyLocals":false}},{"loader":"postcss-loader","options":{"sourceMap":true,"plugins":[null,null,null],"order":"presetEnvAndCssnanoLast"}}]},{"use":[{"loader":"vue-style-loader","options":{"sourceMap":true}},{"loader":"css-loader","options":{"sourceMap":true,"importLoaders":2,"onlyLocals":false}},{"loader":"postcss-loader","options":{"sourceMap":true,"plugins":[null,null,null],"order":"presetEnvAndCssnanoLast"}}]}]},{"test":"/\\.p(ost)?css$/i","oneOf":[{"resourceQuery":"/module/","use":[{"loader":"vue-style-loader","options":{"sourceMap":true}},{"loader":"css-loader","options":{"modules":{"localIdentName":"[local]_[hash:base64:5]"},"sourceMap":true,"importLoaders":2,"onlyLocals":false}},{"loader":"postcss-loader","options":{"sourceMap":true,"plugins":[null,null,null],"order":"presetEnvAndCssnanoLast"}}]},{"use":[{"loader":"vue-style-loader","options":{"sourceMap":true}},{"loader":"css-loader","options":{"sourceMap":true,"importLoaders":2,"onlyLocals":false}},{"loader":"postcss-loader","options":{"sourceMap":true,"plugins":[null,null,null],"order":"presetEnvAndCssnanoLast"}}]}]},{"test":"/\\.less$/i","oneOf":[{"resourceQuery":"/module/","use":[{"loader":"vue-style-loader","options":{"sourceMap":true}},{"loader":"css-loader","options":{"modules":{"localIdentName":"[local]_[hash:base64:5]"},"sourceMap":true,"importLoaders":2,"onlyLocals":false}},{"loader":"postcss-loader","options":{"sourceMap":true,"plugins":[null,null,null],"order":"presetEnvAndCssnanoLast"}},{"loader":"less-loader","options":{"sourceMap":true}}]},{"use":[{"loader":"vue-style-loader","options":{"sourceMap":true}},{"loader":"css-loader","options":{"sourceMap":true,"importLoaders":2,"onlyLocals":false}},{"loader":"postcss-loader","options":{"sourceMap":true,"plugins":[null,null,null],"order":"presetEnvAndCssnanoLast"}},{"loader":"less-loader","options":{"sourceMap":true}}]}]},{"test":"/\\.sass$/i","oneOf":[{"resourceQuery":"/module/","use":[{"loader":"vue-style-loader","options":{"sourceMap":true}},{"loader":"css-loader","options":{"modules":{"localIdentName":"[local]_[hash:base64:5]"},"sourceMap":true,"importLoaders":2,"onlyLocals":false}},{"loader":"postcss-loader","options":{"sourceMap":true,"plugins":[null,null,null],"order":"presetEnvAndCssnanoLast"}},{"loader":"sass-loader","options":{"sassOptions":{"indentedSyntax":true},"sourceMap":true}}]},{"use":[{"loader":"vue-style-loader","options":{"sourceMap":true}},{"loader":"css-loader","options":{"sourceMap":true,"importLoaders":2,"onlyLocals":false}},{"loader":"postcss-loader","options":{"sourceMap":true,"plugins":[null,null,null],"order":"presetEnvAndCssnanoLast"}},{"loader":"sass-loader","options":{"sassOptions":{"indentedSyntax":true},"sourceMap":true}}]}]},{"test":"/\\.scss$/i","oneOf":[{"resourceQuery":"/module/","use":[{"loader":"vue-style-loader","options":{"sourceMap":true}},{"loader":"css-loader","options":{"modules":{"localIdentName":"[local]_[hash:base64:5]"},"sourceMap":true,"importLoaders":2,"onlyLocals":false}},{"loader":"postcss-loader","options":{"sourceMap":true,"plugins":[null,null,null],"order":"presetEnvAndCssnanoLast"}},{"loader":"sass-loader","options":{"sourceMap":true}}]},{"use":[{"loader":"vue-style-loader","options":{"sourceMap":true}},{"loader":"css-loader","options":{"sourceMap":true,"importLoaders":2,"onlyLocals":false}},{"loader":"postcss-loader","options":{"sourceMap":true,"plugins":[null,null,null],"order":"presetEnvAndCssnanoLast"}},{"loader":"sass-loader","options":{"sourceMap":true}}]}]},{"test":"/\\.styl(us)?$/i","oneOf":[{"resourceQuery":"/module/","use":[{"loader":"vue-style-loader","options":{"sourceMap":true}},{"loader":"css-loader","options":{"modules":{"localIdentName":"[local]_[hash:base64:5]"},"sourceMap":true,"importLoaders":2,"onlyLocals":false}},{"loader":"postcss-loader","options":{"sourceMap":true,"plugins":[null,null,null],"order":"presetEnvAndCssnanoLast"}},{"loader":"stylus-loader","options":{"sourceMap":true}}]},{"use":[{"loader":"vue-style-loader","options":{"sourceMap":true}},{"loader":"css-loader","options":{"sourceMap":true,"importLoaders":2,"onlyLocals":false}},{"loader":"postcss-loader","options":{"sourceMap":true,"plugins":[null,null,null],"order":"presetEnvAndCssnanoLast"}},{"loader":"stylus-loader","options":{"sourceMap":true}}]}]},{"test":"/\\.(png|jpe?g|gif|svg|webp|avif)$/i","use":[{"loader":"url-loader","options":{"limit":1000,"name":"[path][name].[ext]"}}]},{"test":"/\\.(woff2?|eot|ttf|otf)(\\?.*)?$/i","use":[{"loader":"url-loader","options":{"limit":1000,"name":"[path][name].[ext]"}}]},{"test":"/\\.(webm|mp4|ogv)$/i","use":[{"loader":"file-loader","options":{"name":"[path][name].[ext]"}}]}]},"plugins":[{"watchOffset":11000,"_className":"TimeFixPlugin"},{"_className":"VueLoaderPlugin"},{"_className":"WarningIgnorePlugin"},{"profile":false,"modulesCount":500,"showEntries":false,"showModules":true,"showActiveModules":true,"options":{"name":"client","color":"green","reporters":["basic","fancy","profile","stats"],"reporter":{},"basic":false,"fancy":true,"profile":false,"stats":false},"reporters":[{"_className":"FancyReporter"},{}],"_className":"WebpackBarPlugin"},{"options":{"template":"C:\\Users\\Eared\\Desktop\\dev\\projects\\oxouno\\app\\app.html","templateContent":false,"filename":"../server/index.spa.html","publicPath":"auto","hash":false,"inject":true,"scriptLoading":"blocking","compile":true,"favicon":false,"minify":{"collapseBooleanAttributes":true,"decodeEntities":true,"minifyCSS":true,"minifyJS":true,"processConditionalComments":true,"removeEmptyAttributes":true,"removeRedundantAttributes":true,"trimCustomFragments":true,"useShortDoctype":true},"cache":true,"showErrors":true,"chunks":"all","excludeChunks":[],"chunksSortMode":"auto","meta":{},"base":false,"title":"Webpack App","xhtml":false},"version":4,"_className":"HtmlWebpackPlugin"},{"options":{"filename":"../server/client.manifest.json"},"_className":"VueSSRClientPlugin"},{"definitions":{"process.env.NODE_ENV":"\"development\"","process.mode":"\"development\"","process.dev":true,"process.static":false,"process.target":"\"server\"","process.env.API_BASE_URL":"\"https://ta.sartoria.uno/oxouno_api_tst/hs/api/\"","process.env.WS_BASE_URL":"\"ws://domain.com\"","process.env.VUE_ENV":"\"client\"","process.browser":true,"process.client":true,"process.server":false,"process.modern":false},"_className":"DefinePlugin"},{"options":{},"fullBuildTimeout":200,"requestTimeout":10000,"_className":"HotModuleReplacementPlugin"},{"compilationSuccessInfo":{},"shouldClearConsole":false,"logLevel":1,"formatters":[null,null,null],"transformers":[null,null,null],"previousEndTimes":{},"reporter":{"enabled":true,"consola":{"_reporters":[{"options":{"dateFormat":"HH:mm:ss","formatOptions":{"date":true,"colors":true,"compact":false},"secondaryColor":"grey"},"_className":"Vu"},{}],"_types":{"silent":{"level":-1},"fatal":{"level":0},"error":{"level":0},"warn":{"level":1},"log":{"level":2},"info":{"level":3},"success":{"level":3},"debug":{"level":4},"trace":{"level":5},"verbose":{"level":5},"ready":{"level":3},"start":{"level":3}},"level":3,"_defaults":{"tag":"friendly-errors"},"_throttle":1000,"_throttleMin":5,"_lastLogCount":0,"_className":"_"},"_className":"ConsolaReporter"},"_className":"FriendlyErrorsWebpackPlugin"}],"resolve":{"extensions":[".wasm",".mjs",".js",".json",".vue",".jsx"],"alias":{"~~":"C:\\Users\\Eared\\Desktop\\dev\\projects\\oxouno\\app","@@":"C:\\Users\\Eared\\Desktop\\dev\\projects\\oxouno\\app","~":"C:\\Users\\Eared\\Desktop\\dev\\projects\\oxouno\\app","@":"C:\\Users\\Eared\\Desktop\\dev\\projects\\oxouno\\app","assets":"C:\\Users\\Eared\\Desktop\\dev\\projects\\oxouno\\app\\assets","static":"C:\\Users\\Eared\\Desktop\\dev\\projects\\oxouno\\app\\static","vue-meta":"C:\\Users\\Eared\\Desktop\\dev\\projects\\oxouno\\app\\node_modules\\vue-meta\\dist\\vue-meta.esm.browser.js","nuxt_plugin_axios_02ae6862":".\\\\axios.js","nuxt_plugin_index_0c69654a":"..\\\\plugins\\\\index.js","nuxt_plugin_veevalidate_1a0c1998":"..\\\\plugins\\\\vee-validate.js","nuxt_plugin_globalfilters_7552a3d0":"..\\\\plugins\\\\global-filters.js","nuxt_plugin_normalizeheight_2a37ad7a":"..\\\\plugins\\\\normalize-height.js"},"modules":["node_modules","C:\\Users\\Eared\\Desktop\\dev\\projects\\oxouno\\app\\node_modules\\nuxt\\bin\\node_modules","C:\\Users\\Eared\\Desktop\\dev\\projects\\oxouno\\app\\node_modules\\nuxt\\node_modules","C:\\Users\\Eared\\Desktop\\dev\\projects\\oxouno\\app\\node_modules","C:\\Users\\Eared\\Desktop\\dev\\projects\\oxouno\\node_modules","C:\\Users\\Eared\\Desktop\\dev\\projects\\node_modules","C:\\Users\\Eared\\Desktop\\dev\\node_modules","C:\\Users\\Eared\\Desktop\\node_modules","C:\\Users\\Eared\\node_modules","C:\\Users\\node_modules","C:\\node_modules"]},"resolveLoader":{"modules":["C:\\Users\\Eared\\Desktop\\dev\\projects\\oxouno\\app\\node_modules\\@nuxt\\webpack\\node_modules","node_modules","C:\\Users\\Eared\\Desktop\\dev\\projects\\oxouno\\app\\node_modules\\nuxt\\bin\\node_modules","C:\\Users\\Eared\\Desktop\\dev\\projects\\oxouno\\app\\node_modules\\nuxt\\node_modules","C:\\Users\\Eared\\Desktop\\dev\\projects\\oxouno\\app\\node_modules","C:\\Users\\Eared\\Desktop\\dev\\projects\\oxouno\\node_modules","C:\\Users\\Eared\\Desktop\\dev\\projects\\node_modules","C:\\Users\\Eared\\Desktop\\dev\\node_modules","C:\\Users\\Eared\\Desktop\\node_modules","C:\\Users\\Eared\\node_modules","C:\\Users\\node_modules","C:\\node_modules"]},"entry":{"app":["eventsource-polyfill","webpack-hot-middleware/client?reload=true&timeout=30000&ansiColors=&overlayStyles=&path=%2F__webpack_hmr%2Fclient&name=client","C:\\Users\\Eared\\Desktop\\dev\\projects\\oxouno\\app\\.nuxt\\client.js"]}}]