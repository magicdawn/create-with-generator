import debugFactory from 'debug'
import path, { join } from 'path'
import readPkgUp from 'read-pkg-up'
import resolveFrom from 'resolve-from'
import yeoman from 'yeoman-environment'

const debug = debugFactory('create-with-metadata:index')

export default runGenerator
export { runGenerator }

export type RunGeneratorOptions = {
  name?: string
  subname?: string
  __dirname?: string
}

async function runGenerator(options?: RunGeneratorOptions) {
  try {
    await runGeneratorInternal(options)
  } catch (e) {
    console.error(e.stack || e)
  }
}

/**
 * name can be `__dirname` or a specific name
 */

async function runGeneratorInternal({
  name,
  subname,
  __dirname: dirname,
}: RunGeneratorOptions = {}) {
  debug('options: %O', { name, dirname })
  const env = yeoman.createEnv()

  let readPkgResult: Awaited<ReturnType<typeof readPkgUp>> | undefined

  // who is depending on this
  if (!dirname) {
    readPkgResult = await readPkgUp({
      cwd: join(__dirname, '../../'),
    })
    dirname = readPkgResult?.path
  }
  if (!dirname) {
    console.error(
      'can not locate `__dirname` automatically, MUST explicit specify in `runGenerator({ __dirname })`'
    )
  }

  // if explicit specify __dirname
  if (!readPkgResult) {
    readPkgResult = await readPkgUp({ cwd: dirname })
  }

  const pkg = readPkgResult?.packageJson
  const pkgPath = readPkgResult?.path
  if (!pkg || !pkgPath) return

  // decide name
  // fallback:
  //  1. package.json create-with-generator field
  //  2. dependcies `generator-*` or `@scope/generator-*`
  if (!name) {
    // TODO implement this logic
    throw new Error('not implement')
  }

  const { bareName, pkgName } = normalizeName(name)
  debug('normalized: %o', { bareName, pkgName })

  // Then, we’ll want to register our generator-npm so it can be used later. You have two options here:
  // Here we register a generator based on its path.
  // Providing the namespace is optional.
  // env.register(require.resolve('generator-npm'), 'npm:app')
  env.register(resolveFrom(path.dirname(pkgPath), pkgName))

  const metadata = env.getGeneratorsMeta()
  debug('yeoman env metadata: %O', metadata)

  // TODO: make a select
  const keys = Object.keys(metadata)
  if (!keys.length) {
    throw new Error('unexpected: no generators found')
  }

  let runName = ''
  if (keys.length === 1) {
    runName = keys[0]
  } else {
    if (subname) {
      runName = `${bareName}:${subname}`
    }
    // TODO: make a select
    // current just pass bareName to use `:app`
    else {
      runName = bareName
    }
  }

  debug('running env.run(%o)', runName)
  return await env.run(runName)
}

function normalizeName(name: string) {
  const bareName = name.replace(/generator-/g, '')

  const pkgName = bareName.includes('@')
    ? `${bareName.split('/')[1]}/generator-${bareName.split('/')[1]}`
    : `generator-${bareName}`

  return {
    bareName,
    pkgName,
  }
}
