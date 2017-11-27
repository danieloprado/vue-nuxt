module.exports = function(options, next) {
  this.extendBuild(config => {
    config.resolve.extensions = ['.ts', '.tsx', '.js', '.json', '.vue'];

    config.module.rules.push(
      {
        test: /\.ts$/,
        loader: 'ts-loader'
      },
      {
        test: /\.tsx$/,
        loader: 'babel-loader!ts-loader'
      }
    );

    const rule = config.module.rules.find(r => r.loader === 'vue-loader');
    rule.options.loaders.ts = 'ts-loader?{"appendTsSuffixTo":["\\\\.vue$"]}';
    rule.options.loaders.tsx = 'babel-loader!ts-loader?{"appendTsxSuffixTo":["\\\\.vue$"]}';
  });

  next();
};
