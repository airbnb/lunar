import Fuse from 'fuse.js';

export default async function fuseLoader(
  list: any[],
  options?: Fuse.FuseOptions<any>,
): Promise<Fuse<any>> {
  const { default: FuseClass } = await import(/* webpackChunkName: "fuse.js" */ 'fuse.js');

  return new FuseClass(list, options);
}
