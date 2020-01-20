module.exports = {
  presets: [
    // '@vue/cli-plugin-babel/preset'
    process.env.BABEL_ENV === 'node' ? '@babel/preset-env' : '@vue/app'
  ]
}
