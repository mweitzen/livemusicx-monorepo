export const GetDetailsQuery = (input: { id?: string; slug?: string }) => ({
  id: input.id!,
  slug: input.slug!,
});
