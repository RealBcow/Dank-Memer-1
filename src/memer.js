const config = require('./config.json')

const Sharder = require('eris-sharder').Master
const snek = require('snekfetch')
const r = require('rethinkdbdash')()

const master = new Sharder(config.token, '/mainClass.js', {
  name: 'Dank Memer',
  stats: true,
  webhooks: config.webhooks,
  clientOptions: config.clientOptions,
  shards: 80
})

const botlists = new Map([
  ['https://bots.discord.pw/api/bots/270904126974590976/stats', config.pwtoken],
  ['https://www.carbonitex.net/discord/data/botdata.php', config.carbon]
])

master.on('stats', res => {
  r.table('stats')
    .insert({ id: 1, stats: res }, { conflict: 'update' })
    .run()

  botlists.forEach(async (token, url) => {
    return
    snek
      .post(url)
      .set('Authorization', token)
      .send({
        [`server${url.includes('carbonitex') ? '' : '_'}count`]: res.guilds, // matt plz
        key: token
      })
      .end()
  })
})
