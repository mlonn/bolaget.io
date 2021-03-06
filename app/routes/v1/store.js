import Store from '../../models/v1/store'

export default async (ctx, next) => {
  const id = ctx.params.id || null

  const store = await Store.getById(id)

  ctx.body = store
}
