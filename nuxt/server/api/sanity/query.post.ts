export default defineEventHandler(async (event) => {
  const { query, params = {}, options } = await readBody(event);

  await validateSanityQuery(query);

  const sanity = useSanity();
  return sanity.fetch(query, params, options);
});
