module.exports = {
  entry: {
    'angular2': [
      '@reactivex/rxjs',
      'zone.js',
      'reflect-metadata',
      'angular2/angular2',
      'angular2/core',
      'angular2/router',
      'angular2/http'
    ],
    'app': [
      './ts/app'
    ]
  },
  output: {
    path: '../public/',
    filename: '[name].js',
    sourceMapFilename: '[name].js.map',
    chunkFilename: '[id].chunk.js'
  },

  //devtool: 'source-map',
  devtool:'eval-source-map',
  resolve: {
    extensions: ['', '.ts', '.js', '.json'],
    alias: {
      'rx': '@reactivex/rxjs'
    }
  },
  module: {
    loaders: [{
      test: /\.ts$/,
      loader: 'ts-loader'
    }],
    noParse: [
      /rtts_assert\/src\/rtts_assert/,
      /reflect-metadata/
    ]
  }
}
